import axios from "axios";
import { RoutePaths } from "@/core/general/RoutePaths";

export default {
  async login(email:string, password:string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}loginUser.php`, null, {
        params: {
          email: email,
          password: password,
        },
      })
    return res;
  },
};
