/** Valid ARIA roles for a dialog element. */
import {ScrollStrategy} from "@angular/cdk/overlay";
import {Direction} from "@angular/cdk/bidi";

export type MsfDialogRole = 'dialog' | 'alertdialog';

/** Possible overrides for a dialog's position. */
export interface MsfDialogPosition {
  /** Override for the dialog's top position. */
  top?: string;

  /** Override for the dialog's bottom position. */
  bottom?: string;

  /** Override for the dialog's left position. */
  left?: string;

  /** Override for the dialog's right position. */
  right?: string;
}


/**
 * Configuration for opening a modal dialog with the MatDialog service.
 */
export class MsfDialogOptions<D = any> {


  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** The ARIA role of the dialog element. */
  role?: MsfDialogRole = 'dialog';


  /** Indicates if the dialog is draggable */
  isDraggable?: boolean = false;

  /** Custom class for the overlay pane. */
  panelClass?: string | string[] = '';

  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Custom class for the backdrop, */
  backdropClass?: string = '';

  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  disableClose?: boolean = false;

  /** Width of the dialog. */
  width?: string = '';

  /** Height of the dialog. */
  height?: string = '';

  /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
  minWidth?: number | string;

  /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
  minHeight?: number | string;

  /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
  maxWidth?: number | string = '80vw';

  /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
  maxHeight?: number | string;

  /** Position overrides. */
  position?: MsfDialogPosition;

  /** Data being injected into the child component. */
  data?: D | null = null;


  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null = null;

  /** ID of the element that labels the dialog. */
  ariaLabelledBy?: string | null = null;

  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null = null;

  /** Whether the dialog should focus the first focusable element on open. */
  autoFocus?: boolean = true;

  /** Layout direction for the dialog's content. */
  direction?: Direction;

  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean = true;

  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;

  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean = true;
}
