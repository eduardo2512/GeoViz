class MapChartService {
  obterTooltipMapa(properties) {
    let tooltip = "";
    for (const [key, value] of Object.entries(properties)) {
      tooltip = tooltip + key + " : " + value + "<br>";
    }
    return tooltip;
  }
}

export default new MapChartService();
