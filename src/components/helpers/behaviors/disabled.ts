/**
 * @docs-private
 */
import {Constructor} from "./constructor";
import {coerceBooleanProperty} from "../../utils/boolean-property";

export interface CanDisable {
  /** Whether the component is disabled. */
  disabled: boolean;
}


export type CanDisableCtor = Constructor<CanDisable>;


export function mixinDisabled<T extends Constructor<{}>>(base: T): CanDisableCtor & T {
  return class extends base {
    private _disabled: boolean = false;

    get disabled() { return this._disabled; }
    set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

    constructor(...args: any[]) { super(...args); }
  }
}
