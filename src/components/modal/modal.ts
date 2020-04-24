import {Inject, Injectable, Injector, Optional, SkipSelf, TemplateRef} from "@angular/core";
import {ComponentType, Overlay, OverlayContainer, ScrollStrategy} from "@angular/cdk/overlay";
import {MsfModalRef} from "./modal-ref";
import {MsfModalOptions} from "./modal-options";
import {ComponentPortal, PortalInjector, TemplatePortal} from "@angular/cdk/portal";
import {MsfModalPortal} from "./modal-portal";
import {MSF_MODAL_DEFAULT_OPTIONS} from "./modal-default-options";
import {MSF_MODAL_SCROLL_STRATEGY} from "./modal-scrool-strategy";

@Injectable()
export class MsfModal {

  private _scrollStrategy: () => ScrollStrategy;

  constructor(private _overlay: Overlay,
              private _injector: Injector,
              @Optional() @Inject(MSF_MODAL_DEFAULT_OPTIONS) private _defaultOptions: MsfModalOptions,
              @Inject(MSF_MODAL_SCROLL_STRATEGY) scrollStrategy: any,
              @Optional() @SkipSelf() private _parentModal: MsfModal,
              private _overlayContainer: OverlayContainer) {

    this._scrollStrategy = scrollStrategy;
  }

  /**
   * Opens a modal modal containing the given component.
   * @param targetRef Type of the component to load into the modal,
   *     or a TemplateRef to instantiate as the modal content.
   * @param options Extra configuration options.
   *
   * @typeparam T the type of the target component or templateRef.
   * @typeparam D The type of data passed into the modal injector.
   * @typeparam R The type of data returned by the modal closing result.
   *
   * @returns Reference to the newly-opened modal.
   */
  open<T, D = any, R = any>(targetRef: ComponentType<T> | TemplateRef<T>, options: MsfModalOptions = new MsfModalOptions()): MsfModalRef<T, R> {

    const overlayRef = this._overlay.create(
      {
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this._overlay.position().global()
      });

    const portal = this._createPortal(targetRef);

    const modalPortal = this._createModalPortal(options);

    const portalRef =  overlayRef.attach(modalPortal);

   const result = portalRef.instance.attachComponentPortal(portal as ComponentPortal<T>);



    const modalRef = new MsfModalRef<T, R>(overlayRef);
    modalRef.componentInstance = result.instance;


    modalRef.updatePosition();


    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());

    return modalRef;
  }

  /**
   * Creates a MsfModalPortal to a modal.
   *
   * @param options The modal configuration.
   * @returns A modalPortal.
   */
  private _createModalPortal(options: MsfModalOptions): ComponentPortal<MsfModalPortal>{
    const userInjector = options && options.viewContainerRef && options.viewContainerRef.injector;

    const injector = new PortalInjector(userInjector || this._injector, new WeakMap([[MsfModalOptions, options]]))

    return new ComponentPortal(MsfModalPortal, options.viewContainerRef, injector);
  }

  _createPortal<T>(targetRef: ComponentType<T> | TemplateRef<T>): TemplatePortal<T> | ComponentPortal<T> {
    let portal: TemplatePortal<T> | ComponentPortal<T>;

    if (targetRef instanceof TemplateRef) {
      portal = new TemplatePortal<T>(targetRef, null!);

    } else {
      portal = new ComponentPortal(targetRef, null);
    }
    return portal;
  }
}


/**
 * Applies default options to the modal options.
 * @param options Options to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new options  object.
 */
function _applyOptionsDefaults(
  options?: MsfModalOptions, defaultOptions?: MsfModalOptions): MsfModalOptions {
  return {...defaultOptions, ...options};
}
