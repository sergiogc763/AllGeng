import { UserStore } from './store';
import { UserService } from './service';
import { email } from '@vuelidate/validators';

export class UserManager {
  private readonly _store: UserStore = new UserStore();
  private readonly _service: UserService = new UserService();

  get state() {
    return this._store.state();
  }

  public getStatusLogged() {
    return this.state.isLogged;
  }

  public getUser() {
    console.log(this.state.user);
    return this.state.user;
  }

  public setUser(email: string, password: string) {
    this.state.user = this._service.returnUserFromApi(this._service.checkLogin(email, password));
  }
}

export const userManager = new UserManager();
