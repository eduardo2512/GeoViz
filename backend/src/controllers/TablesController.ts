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
        table_schema = 'geodata' and table_name in ('estado', 'ferrovia_br', 'barragem_rejeito') ORDER BY table_name;`
      );

      client.end();

      const tablesName = tables.map(table => table.name);

      tablesName.push("cobertura_vacinal_febre_amarela");
      tablesName.push("cobertura_vacinal_bcg");
      tablesName.push("eleicoes_presidente_haddadlula");
      tablesName.push("eleicoes_presidente_bolsonaro");

      return response.json(tablesName);
    } catch (error) {
      if (client) {
        client.end();
      }

      return response.status(400).json((error as Error).message);
    }
  }
}
