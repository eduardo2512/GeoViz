import axios from "../shared/utils/AxiosInstance";

class GeoService {
  async getOptions() {
    const response = await axios.get("/tables", {});
    if (!response) {
      return;
    }
    return response.data;
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
