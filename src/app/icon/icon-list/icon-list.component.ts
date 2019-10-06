import { Component, OnInit } from '@angular/core';
import { iconItems } from '../icon-name';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styles: []
})
export class IconListComponent implements OnInit {
 
  icons = iconItems;
  constructor() {
   
   }

  ngOnInit() {
  }

  filter(event){
    if(!event.target.value){
      this.icons = iconItems;
    }else{
      this.icons = iconItems.filter(i => i.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
    }
  }

  click(event){
    console.log(event.target.innerHTML)
  }
}
