import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from "@angular/animations";

const animationBody = [
  state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
  state('enter', style({transform: 'none'})),

  state('enter', style({transform: 'none'})),
  transition('* => enter', animate('150ms cubic-bezier(0, 0, 0.2, 1)',
    style({transform: 'none', opacity: 1}))),
  transition('* => void, * => exit',
    animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0}))),
];

/**
 * Animations used by MsfDialog.
 * @docs-private
 */
export const msfDialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
} = {
  /** Animation that is applied on the dialog container by default. */
  dialogContainer: trigger('dialogContainer', animationBody)
};
