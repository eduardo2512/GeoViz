class HomeService {
  obterValoresFiltro(geoJson) {
    if (!geoJson) return [];
    const propertiesGeoJson = geoJson.features[0].properties;
    const keysGeoJson = [];
    for (const [key, value] of Object.entries(propertiesGeoJson)) {
      keysGeoJson.push({ key: key, isCategorical: isNaN(value) });
    }
    return keysGeoJson;
  }
}

export default new HomeService();
