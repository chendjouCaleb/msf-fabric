import {Component} from '@angular/core';

@Component({
  selector: 'MsfTableCell',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'msf-table-cell'
  }
})
export class MsfTableCell { }
