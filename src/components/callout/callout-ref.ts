import {TemplateRef, Type} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs"
import {OverlayRef} from "@angular/cdk/overlay";
import {MsfCalloutCloseEvent, MsfCalloutCloseEventType} from "./callout-event";
import {MsfCalloutComponent} from "./callout.component";

export type MsfCalloutContent = TemplateRef<any> | Type<any> | string;

export class MsCalloutRef<T = any> {
  onclose = new ReplaySubject<MsfCalloutCloseEvent<T>>();

  constructor(public overlay: OverlayRef, public content: MsfCalloutContent, public data: T) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick', data));
  }

  close(data?: T){
    this._close('close', data);
  }

  private _close(type: MsfCalloutCloseEventType, data?: T) {
    this.overlay.dispose();

    this.onclose.next(new MsfCalloutCloseEvent(type, data));
  }
}

// Counter for unique dialog ids.
let uniqueId = 0;

export class MsfCalloutRef<T = any, R = any> {

  /** The instance of component opened into the dialog. */
  componentInstance: T;

  /** Whether the user is allowed to close the dialog. */
  disableClose: boolean = true;

  /** Subject for notifying the user that the dialog has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the dialog has started closing. */
  private readonly _beforeClosed = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  public readonly id = `msf-callout-${uniqueId++}`;

  constructor(private _overlayRef: OverlayRef, public _containerInstance: MsfCalloutComponent) {}


  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void {}

}

