/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ElementRef, HostBinding, HostListener,
} from '@angular/core';
import {MsfModal} from './modal';
import {MsfModalRef} from './modal-ref';

/** Counter used to generate unique IDs for modal elements. */
let modalElementUid = 0;

/**
 * Button that will close the current modal.
 */
@Directive({
  selector: ` [MsfModalClose]`,
  exportAs: 'msfModalClose',
  host: {
    '[attr.aria-label]': 'ariaLabel || null',
    'type': 'button', // Prevents accidental form submits.
  }
})
export class MsfModalClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Modal close input. */
  @Input('MsfModalClose') modalResult: any;

  constructor(
    @Optional() public modalRef: MsfModalRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _modal: MsfModal) {}

  ngOnInit() {
    if (!this.modalRef) {
      // When this directive is included in a modal via TemplateRef (rather than being
      // in a Component), the ModalRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the ModalRef by
      // ID. This must occur in `onInit`, as the ID binding for the modal container won't
      // be resolved at constructor time.
      this.modalRef = getClosestModal(this._elementRef, this._modal.openModals)!;
    }
  }

  @HostListener("click")
  _onClick() {
    if(this.modalRef) {
      this.modalRef.close(this.modalResult);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange = changes['_msfModalClose'] || changes['_msfModalCloseResult'];

    if (proxiedChange) {
      this.modalResult = proxiedChange.currentValue;
    }
  }
}

/**
 * Title of a modal element. Stays fixed to the top of the modal when scrolling.
 */
@Directive({
  selector: '[MsfModalTitle]',
  exportAs: 'msfModalTitle',
  host: {
    'class': 'msf-modal-title',
    '[id]': 'id',
  },
})
export class MsfModalTitle {
  @Input() id = `msf-modal-title-${modalElementUid++}`;

  constructor(
    @Optional() private _modalRef: MsfModalRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _modal: MsfModal) {}


}


/**
 * Scrollable content container of a modal.
 */
@Directive({
  selector: `[MsfModalContent]`,
  host: {'class': 'msf-modal-content'}
})
export class MsfModalContent {}


/**
 * Container for the bottom action buttons in a modal.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[MsfModalActions]`,
  host: {'class': 'msf-modal-actions'}
})
export class MsfModalActions {}


/**
 * Finds the closest MsfModalRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a modal.
 * @param openModals References to the currently-open modals.
 */
function getClosestModal(element: ElementRef<HTMLElement>, openModals: MsfModalRef<any>[]) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('msf-modal-portal')) {
    parent = parent.parentElement;
  }

  return parent ? openModals.find(modal => modal.id === parent!.id) : null;
}
