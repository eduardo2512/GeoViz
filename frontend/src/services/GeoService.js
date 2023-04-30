import axios from "../shared/utils/AxiosInstance";

class GeoService {
  async getOptions() {
    const response = await axios.get("/tables", {});
    if (!response) {
      return;
    }
    return response.data.map(table => table.name);
  }

  async getGeoJson(table) {
    const response = await axios.get("/geojson", {
      params: {
        table
      }
    });
    if (!response) {
      return;
    }
    return response.data;
  }
}

export default new GeoService();
