import _ from "lodash";

class TreeMapChartService {
  obterJsonTreeMap(geoJson, categoria, detalhes, valor, calculoValor) {
    const propertiesGeoJson = geoJson.features.map(feature => feature.properties);

    const grupos = _.groupBy(propertiesGeoJson, categoria);

    let total = 0;
    if (detalhes == null || detalhes === "") {
      total = _.mapValues(grupos, produtos => this.calculaValor(produtos, valor, calculoValor));

      return this.transformarObjetoCategoria(total);
    } else {
      const grupoDetalhes = _.mapValues(grupos, produtos => _.groupBy(produtos, detalhes));

      total = _.mapValues(grupoDetalhes, subgrupos =>
        _.mapValues(subgrupos, produtos => this.calculaValor(produtos, valor, calculoValor))
      );
    }

    return this.transformarObjetoDetalhes(total);
  }

  calculaValor(produtos, valor, calculoValor) {
    if (calculoValor === "Contagem") {
      return _.countBy(produtos, valor);
    } else {
      return _.sumBy(produtos, valor);
    }
  }

  transformarObjetoDetalhes(objeto) {
    const entries = Object.entries(objeto);
    const children = entries.map(([name, subObjeto]) => {
      const subEntries = Object.entries(subObjeto);
      const subChildren = subEntries.map(([subName, value]) => ({
        name: subName,
        value
      }));
      return {
        name,
        children: subChildren
      };
    });
    return {
      children
    };
  }

  transformarObjetoCategoria(objeto) {
    const entries = Object.entries(objeto);
    const subChildren = entries.map(([name, value]) => ({
      name,
      value
    }));
    return {
      children: subChildren
    };
  }
}

export default new TreeMapChartService();
