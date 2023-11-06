import { Request, Response } from "express";
import { Client } from "pg";

export default class GeoSqlController {
  public async index(request: Request, response: Response) {
    const client = new Client({
      host: "localhost",
      database: "geosql",
      port: 5433,

      user: "postgres",
      password: "123456"
    });

    try {
      await client.connect();

      const { rows: tables } = await client.query(
        `SELECT DISTINCT table_name as name FROM information_schema.columns WHERE 
        table_schema = 'geodata' and table_name in ('estado', 'ferrovia_br', 'barragem_rejeito', 'eleicoes_presidente_2018_t1', 'eleicoes_presidente_2018_t2', 'eleicoes_presidente_2022_t1', 'eleicoes_presidente_2022_t2', 'cobertura_vacinal_febre_amarela_2010', 'cobertura_vacinal_febre_amarela_2011', 'cobertura_vacinal_febre_amarela_2012', 'cobertura_vacinal_febre_amarela_2013', 'cobertura_vacinal_febre_amarela_2014', 'cobertura_vacinal_febre_amarela_2015', 'cobertura_vacinal_febre_amarela_2016', 'cobertura_vacinal_febre_amarela_2017', 'cobertura_vacinal_febre_amarela_2018', 'cobertura_vacinal_febre_amarela_2019', 'cobertura_vacinal_febre_amarela_2020', 'cobertura_vacinal_febre_amarela_2021') ORDER BY table_name;`
      );

      client.end();

      return response.json(tables.map(table => table.name));
    } catch (error) {
      if (client) {
        client.end();
      }

      return response.status(400).json((error as Error).message);
    }
  }
}
