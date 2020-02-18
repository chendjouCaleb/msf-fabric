/** Injection token that can be used to access the data that was passed in to a dialog. */
import {Inject, Injectable, InjectionToken, Injector, Optional, TemplateRef} from "@angular/core";
import {MsfDialogOptions} from "./dialog-options";
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  ScrollStrategy
} from "@angular/cdk/overlay";
import {MsfDialogRef} from "./dialog-ref";
import {Subject} from "rxjs";
import {List} from "@positon/collections";
import {ComponentPortal, PortalInjector, TemplatePortal} from "@angular/cdk/portal";
import {MsfDialogContainer} from "./dialog-container";
import {MSF_DIALOG_SCROLL_STRATEGY} from "./dialog-scrool";

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const MSF_DIALOG_DATA = new InjectionToken<any>('msf-dialog-data');

/** Injection token that can be used to specify default dialog options. */
export const MSF_DIALOG_DEFAULT_OPTIONS = new InjectionToken<MsfDialogOptions>('msf-dialog-default-options');



@Injectable()
export class MsfDialog {
  private _openDialogs = new List<MsfDialogRef<any>>();

  private _scrollStrategy: () => ScrollStrategy;

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): List<MsfDialogRef<any>> {
   return this._openDialogs;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<MsfDialogRef<any>> {
    throw new Error("Not implemented method");
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Subject<void> = new Subject<void>();


  constructor(private _overlay: Overlay,
              private _overlayContainer: OverlayContainer,
              private _injector: Injector,

              @Optional() @Inject(MSF_DIALOG_DEFAULT_OPTIONS) private _defaultOptions: MsfDialogOptions,
              @Inject(MSF_DIALOG_SCROLL_STRATEGY) scrollStrategy: any
  ) {
    this._scrollStrategy = scrollStrategy;
  }


  /**
   * Opens a modal dialog containing the given component.
   * @param targetRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param options Extra configuration options.
   *
   * @typeparam T the type of the target component or templateRef.
   * @typeparam D The type of data passed into the dialog injector.
   * @typeparam R The type of data returned by the dialog closing result.
   *
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(targetRef: ComponentType<T> | TemplateRef<T>, options?: MsfDialogOptions): MsfDialogRef<T, R> {
    options = _applyDefaultOptions(options, this._defaultOptions);

    if (options.id && this.getDialogById(options.id)) {
      throw Error(`Dialog with id "${options.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef = this._createOverlay(options);

    const dialogContainer = this._attachDialogContainer(overlayRef, options);

    const dialogRef = this._attachDialogContent<T, R>(targetRef, dialogContainer, overlayRef, options);

    this._attachDialogContent(targetRef, dialogContainer, overlayRef, options);

    return null;
  }

    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param options The dialog options.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
  private _createOverlay(options: MsfDialogOptions): OverlayRef {
      const overlayOptions = this._getOverlayOptions(options);
      return this._overlay.create(overlayOptions);
    }

    /**
     * Creates an overlay options from a dialog options.
     * @param dialogOptions The dialog options.
     * @returns The overlay options.
     */
  private _getOverlayOptions(dialogOptions: MsfDialogOptions): OverlayConfig
    {
      const state = new OverlayConfig({
        positionStrategy: this._overlay.position().global(),
        scrollStrategy: dialogOptions.scrollStrategy || this._scrollStrategy(),
        panelClass: dialogOptions.panelClass,
        hasBackdrop: dialogOptions.hasBackdrop,
        direction: dialogOptions.direction,
        minWidth: dialogOptions.minWidth,
        minHeight: dialogOptions.minHeight,
        maxWidth: dialogOptions.maxWidth,
        maxHeight: dialogOptions.maxHeight,
        disposeOnNavigation: dialogOptions.closeOnNavigation
      });

      if (dialogOptions.backdropClass) {
        state.backdropClass = dialogOptions.backdropClass;
      }

      return state;
    }


  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): MsfDialogRef<any> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
  }

  private _attachDialogContainer(overlayRef: OverlayRef, options: MsfDialogOptions<any>) {
    const injector = new PortalInjector( this._injector, new WeakMap([
      [MsfDialogOptions, options]
    ]));
    const containerPortal =
      new ComponentPortal(MsfDialogContainer, null, injector);
    const containerRef = overlayRef.attach<MsfDialogContainer>(containerPortal);

    return containerRef.instance;
  }



  /**
   * Attaches the user-provided component to the already-created MatDialogContainer.
   * @param targetRef The type of component being loaded into the dialog,
   *     or a TemplateRef to instantiate as the content.
   * @param dialogContainer Reference to the wrapping MatDialogContainer.
   * @param overlayRef Reference to the overlay in which the dialog resides.
   * @param options The dialog configuration.
   *
   * @typeparam T the type of the target component or templateRef.
   * @typeparam D The type of data passed into the dialog injector.
   * @typeparam R The type of data returned by the dialog closing result.
   *
   * @returns A promise resolving to the MatDialogRef that should be returned to the user.
   */
  private _attachDialogContent<T, U>(targetRef: ComponentType<T> | TemplateRef<T>, dialogContainer: MsfDialogContainer, overlayRef: OverlayRef, options: MsfDialogOptions<any>) {

    const dialogRef = new MsfDialogRef<T>(overlayRef, dialogContainer, options.id);
    if(targetRef instanceof TemplateRef) {
      let templatePortal = new TemplatePortal<T>(targetRef, null!, <any>{ $implicit: options.data, dialogRef });
      dialogContainer.attachTemplatePortal(templatePortal);
    }

    else{
      const injector = this._createInjector<T>(options, dialogRef, dialogContainer);
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(targetRef, undefined, injector));
      dialogRef.componentInstance = contentRef.instance;
    }
  }

  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the dialog.
   * @param dialogRef Reference to the dialog.
   * @param container Dialog container element that wraps all of the contents.
   * @returns The custom injector that can be used inside the dialog.
   */
  private _createInjector<T>(
    options: MsfDialogOptions,
    dialogRef: MsfDialogRef<T>,
    dialogContainer: MsfDialogContainer): PortalInjector {

    throw Error("Not implemented method error")
  }
}

/**
 * Applies default options to the dialog options.
 * @param options Options to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new options object.
 */
function _applyDefaultOptions(
  options?: MsfDialogOptions, defaultOptions?: MsfDialogOptions): MsfDialogOptions {
  return {...defaultOptions, ...options};
}
