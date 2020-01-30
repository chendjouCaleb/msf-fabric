export type MsfCalloutCloseEventType = "backdropClick" | "close"
export class MsfCalloutCloseEvent<T> {
    private readonly _type: MsfCalloutCloseEventType;
    private readonly _data: T;


  constructor(type: MsfCalloutCloseEventType, data: T) {
    this._type = type;
    this._data = data;
  }


  get type(): MsfCalloutCloseEventType {
    return this._type;
  }

  get data(): T {
    return this._data;
  }
}


