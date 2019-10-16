import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';
import {ColorTheme} from '../../utils/theme';
import { MsfButtonBaseComponent } from '../button-base';
import { ButtonSize } from '../msf-button/msf-button.component';

@Component({
  selector: 'MsfSplitButton, [MsfSplitButton]',
  templateUrl: './msf-split-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'msf-split-button'
  }
})
export class MsfSplitButtonComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  @ViewChild("LeftButton", {static: false})
  leftButton: MsfButtonBaseComponent;

  @ViewChild("RightButton", {static: false})
  rightButton: MsfButtonBaseComponent;



  @Input()
  Theme: ColorTheme;

  @Input()
  Size: ButtonSize = "2x";


  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    


  }
}
