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
  async session(id: string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}getUserSession.php`, null, {
      params: {
        id: id,
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
  async updateName(id: string, name: string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}updateName.php`, null, {
      params: {
        id: id,
        name: name,
      },
    });
    return res;
  },
  async updateEmail(id: string, email: string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}updateEmail.php`, null, {
      params: {
        id: id,
        email: email,
      },
    });
    return res;
  },
  async updatePhone(id: string, phone: string): Promise<any> {
    const res = await axios.post(`${RoutePaths.API}updatePhone.php`, null, {
      params: {
        id: id,
        phone: phone,
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
