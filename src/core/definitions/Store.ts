import { reactive, readonly, watch } from 'vue';
export abstract class Store<T extends Record<string, unknown>> {
  protected readonly _state: T;
  constructor() {
    const data = this.data();
    this._state = reactive(data) as T;
  }
  /**
   * Hold data definition. Any item contained, will be treated as reactive.
   */
  protected abstract data(): T;
  /**
   * Returns a `readonly` *_data_*'s object reference
   */
  public state(): T {
    return readonly(this._state) as T;
  }
}
export abstract class PersistentStore<T extends Record<string, unknown>> extends Store<T> {
  protected readonly storeName: string;
  constructor(storeName: string) {
    super();
    if (storeName.length === 0) {
      console.error('Store name cannot be empty');
    }
    this.storeName = storeName;
    const values = this.loadItems();
    if (values) {
      Object.assign(this._state, values);
    }
    // Save change whenever state change
    watch(
      () => this._state,
      (value) => this.saveItems(value),
      { deep: true }
    );
  }
  /**
   * Load an entity from browser's `SessionStorage`
   * @return Promise value Can be any dictionary/object
   */
  private loadItems(): T | null {
    const values = window.sessionStorage.getItem(this.storeName);
    if (values) {
      try {
        return JSON.parse(values);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  }
  /**
   * Saves an entity into browser's `SessionStorage` during the next stack cycle
   * @param value Can be any dictionary/object
   */
  private async saveItems(value: T) {
    window.sessionStorage.setItem(this.storeName, JSON.stringify(value));
  }
}
