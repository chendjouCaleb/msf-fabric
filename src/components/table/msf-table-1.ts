import { Injectable } from '@angular/core';

import { MsfTableHeadCell } from './public-api';

@Injectable()
export class MsfTable1 {
    // rows: MsfTableRow[] = [];
    // headerCells: MsfTableHeadCell[] = [];
    //
    //
    // addRow(item: MsfTableRow){
    //     item.index = item.flowIndex;
    //     console.log(item.flowIndex)
    //     this.rows.push(item);
    //     for(let i = item.index + 1; i < this.rows.length; i++){
    //         this.rows[i].index++;
    //     }
    // }
    //
    // removeRow(item: MsfTableRow){
    //     this.rows = this.rows.filter(t => t !== item);
    //     this.moveAll();
    // }
    //
    // addHeadCell(item: MsfTableHeadCell){
    //     this.headerCells.push(item);
    // }
    //
    // removeHeadCell(item: MsfTableHeadCell){
    //     this.headerCells = this.headerCells.filter(t => t !== item);
    // }
    //
    // sortTable(comparer: (a:MsfTableRow, b:MsfTableRow) => number, sorterCell: MsfTableHeadCell){
    //     this.rows.sort(comparer);
    //
    //     for(let i = 0; i < this.rows.length; i++){
    //         //this.rows[i].lastIndex = this.rows[i].index;
    //         this.rows[i].index = i;
    //     }
    //
    //     this.headerCells.forEach(cell => {
    //         cell.isCurrentSorter = false;
    //     });
    //     sorterCell.isCurrentSorter = true;
    //     this.moveAll();
    // }
    //
    // reserveOrder() {
    //     this.rows.reverse();
    //     for(let i = 0; i < this.rows.length; i++){
    //         //this.rows[i].lastIndex = this.rows[i].index;
    //         this.rows[i].index = i;
    //     }
    //     this.moveAll();
    // }
    //
    // moveAll() {
    //     for(let i = 0; i < this.rows.length; i++){
    //         let row = this.rows[i];
    //         let y = 0;
    //         if(row.index > row.flowIndex) {
    //             for(let j = this.rows[i].flowIndex; j < i; j++){
    //                 y += this.rows[j].rect.height;
    //             }
    //         }else if(row.index < row.flowIndex){
    //             for(let j = row.index; j < row.flowIndex; j++){
    //                 y -= this.rows[j].rect.height;
    //             }
    //         }
    //
    //         //console.log(this.rows[i].value.position + " : " + y)
    //         //this.rows[i].elementRef.nativeElement.style.transform = `translateY(${y}px)`;
    //
    //       this.rows[i].elementRef.nativeElement.animate([{
    //         transform : `none`
    //       }, {transform : `translateY(${y}px)`}], { fill: 'both', duration: 300})
    //
    //     }
    // }

}
