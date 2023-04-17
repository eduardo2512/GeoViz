import _ from "lodash";

class TreeMapChartService {
  obterJsonTreeMap(geoJson, categoria, detalhes, valor) {
    const propertiesGeoJson = geoJson.features.map(feature => feature.properties);

    const teste = _.groupBy(propertiesGeoJson, categoria);
    const teste2 = Object.entries(teste);

    const children = [];
    teste2.forEach(regiao => {
      const retorno = {
        name: regiao[0],
        value: regiao[1].reduce((accumulator, currentValue) => accumulator + currentValue[valor], 0)
      };

      children.push(retorno);
    });

    const treemapJson = {
      children: children
    };

    return treemapJson;
  }
}

export default new TreeMapChartService();
