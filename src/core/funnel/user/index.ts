import { UserStore } from './store';

export class UserManager {
  private readonly _store: UserStore = new UserStore();

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

}

export const userManager = new UserManager();
