import { UserManager } from '@/core/funnel/user/index';
class AppController {
  private readonly _userManager = new UserManager();

  //#region GETTERS
  get userManager() {
    return this._userManager;
  }
  //#endregion
  public async initialize() {
    //TODO: Remove when core logic implemented
  }
}

export const appController = new AppController();
