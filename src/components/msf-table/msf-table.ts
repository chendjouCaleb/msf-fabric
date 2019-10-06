import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MsfTableRowComponent } from './msf-table-row/msf-table-row.component';
import { MsfTableHeadCellComponent } from './public-api';

@Injectable()
export class MsfTable {
    rows: MsfTableRowComponent[] = [];
    headerCells: MsfTableHeadCellComponent[] = [];

    selection: MsfTableRowComponent[] = [];
    selectable: boolean = false;

    onselect = new ReplaySubject<MsfTableRowComponent>();

    onselectionchange = new ReplaySubject<MsfTableRowComponent[]>();

    onunselect = new ReplaySubject<MsfTableRowComponent>();

    addInitialItem(item:any){
        this.rows.push(item);
    }

    selectItem(item: MsfTableRowComponent){
        this.selection.push(item);
        this.onselect.next(item);
        this.onselectionchange.next(this.selection);
    }

    unselectItem(item: MsfTableRowComponent){
        this.selection = this.selection.filter(t => t !== item);       
        this.onselect.next(item);
        this.onselectionchange.next(this.selection);
    }

    selectAll() {
        this.rows.forEach(i => i.select());
    }

    unselectAll() {
        this.selection.forEach(i => i.unselect());
    }

    addRow(item: MsfTableRowComponent){
        item.index = item.flowIndex;
        console.log(item.flowIndex)
        this.rows.push(item);
        for(let i = item.index + 1; i < this.rows.length; i++){
            this.rows[i].index++;
        }
    }

    removeRow(item: MsfTableRowComponent){
        this.rows = this.rows.filter(t => t !== item);   
        item.unselect();
        this.moveAll();
    }

    addHeadCell(item: MsfTableHeadCellComponent){
        this.headerCells.push(item);
    }

    removeHeadCell(item: MsfTableHeadCellComponent){
        this.headerCells = this.headerCells.filter(t => t !== item);   
    }

    sortTable(comparer: (a:MsfTableRowComponent, b:MsfTableRowComponent) => number, sorterCell: MsfTableHeadCellComponent){
        this.rows.sort(comparer);

        for(let i = 0; i < this.rows.length; i++){
            //this.rows[i].lastIndex = this.rows[i].index;
            this.rows[i].index = i;
        }

        this.headerCells.forEach(cell => {
            cell.isCurrentSorter = false;
        });
        sorterCell.isCurrentSorter = true;
        this.moveAll();
    }

    reserveOrder() {
        this.rows.reverse();
        for(let i = 0; i < this.rows.length; i++){
            //this.rows[i].lastIndex = this.rows[i].index;
            this.rows[i].index = i;
        }
        this.moveAll();
    }

    moveAll() {
        for(let i = 0; i < this.rows.length; i++){
            let row = this.rows[i];
            let y = 0;
            if(row.index > row.flowIndex) {
                for(let j = this.rows[i].flowIndex; j < i; j++){
                    y += this.rows[j].rect.height;
                }
            }else if(row.index < row.flowIndex){
                for(let j = row.index; j < row.flowIndex; j++){
                    y -= this.rows[j].rect.height;
                }
            }
            
            //console.log(this.rows[i].value.position + " : " + y)
            this.rows[i].elementRef.nativeElement.style.transform = `translateY(${y}px)`;
        }
    }

    get isSelectedAll() {
        return this.rows.length == this.selection.length;
    }
}