class MapChartService {
  obterTooltipMapa(properties) {
    let tooltip = "";
    for (const [key, value] of Object.entries(properties)) {
      tooltip = tooltip + key + " : " + value + "<br>";
    }
    return tooltip;
  }

  obterMapaDeCalor(data) {
    if (data.features[0].geometry.type !== "Point") return [];
    return data.features.map(feature => [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
      1
    ]);
  }

  obterTipoMapa(data) {
    return data.features[0].geometry.type;
  }
}

export default new MapChartService();
