import axios from "axios";
import { RoutePaths } from "@/core/general/RoutePaths";

export default {
  async login(email: string, password: string, token:string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}loginUser.php`, null, {
      params: {
        email: email,
        password: password,
        token: token
      },
    });
    return res;
  },
  async session(token: string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}getUserRemember.php`, null, {
      params: {
        token: token,
      },
    });
    return res;
  },
  async register(
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}registerUser.php`, null, {
      params: {
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
    });
    
    return res;
  },
  async update(id: string, name: string, email:string, telf:string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}updateUserInfo.php`, null, {
      params: {
        id: id,
        name: name,
        email: email,
        telf: telf
      },
    });
    return res;
  },
  async updatePassword(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}updatePassword.php`, null, {
      params: {
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
    return res;
  },
  
};
