import { Store } from '@/core/definitions/Store';

export interface State extends Record<string, unknown> {
  isLogged: boolean;
  user: string;
}

export class UserStore extends Store<State> {
  //#region STATE INITIALIZATION
  protected data(): State {
    return {
      isLogged: false,
      user: '',
    };
  }
  //#endregion STATE INITIALIZATION

  constructor() {
    super();
    this.checkSession();
  }

  //#region ACTIONS
  public async checkSession() {
    const user = localStorage.getItem('userLogged');
    if (user != null) {
      this._state.isLogged = true;
      this._state.user = JSON.parse(user);
    } else {
      this._state.isLogged = false;
    }
  }
  //#endregion
}
