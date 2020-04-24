/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Throws an exception for the case when menu trigger doesn't have a valid MsfMenu instance
 * @docs-private
 */
export function throwMsfMenuMissingError() {
  throw Error(`MsfMenuTriggerFor: must pass in an MsfMenu instance.

    Example:
      <MsfMenu #menu="MsfMenu"></MsfMenu>
      <button [MsfMenuTrigger]="menu"></button>`);
}

/**
 * Throws an exception for the case when menu's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export function throwMsfMenuInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: 
      <MsfMenu #menu="MsfMenu"></MsfMenu>
      <button [MsfMenuTrigger]="menu" xPosition="before" ></button>`);
}

/**
 * Throws an exception for the case when menu's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwMsfMenuInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: 
      <MsfMenu #menu="MsfMenu"></MsfMenu>
      <button [MsfMenuTrigger]="menu" yPosition="above" ></button>`);
}
