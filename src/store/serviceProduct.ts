import axios from "axios";
import { RoutePaths } from "@/core/general/RoutePaths";

export default {
  async getProductos(): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}getProductos.php`, null, {
      })
    return res;
  },
};
