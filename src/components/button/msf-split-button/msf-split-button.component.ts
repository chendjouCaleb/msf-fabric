import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  ContentChild, AfterContentInit, ChangeDetectorRef
} from '@angular/core';
import {ColorTheme} from '../../helpers/theme';
import { MsfButtonBase } from '../button-base';
import { ButtonSize } from '../msf-button/button';

@Component({
  selector: 'MsfSplitButton, [MsfSplitButton]',
  templateUrl: './msf-split-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'msf-split-button'
  }
})
export class MsfSplitButtonComponent implements OnInit, AfterContentInit{

  @ContentChild("LeftButton")
  leftButton: MsfButtonBase;

  @ContentChild("RightButton")
  rightButton: MsfButtonBase;



  @Input()
  theme: ColorTheme;

  @Input()
  Size: ButtonSize = "2x";


  constructor(private _elementRef: ElementRef<HTMLElement>, private change: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if(this.rightButton == null){
      throw new Error("The split button must have a right part. " +
        "Use RightButton attribute to specify a right part")
    }

    if(this.leftButton == null){
      throw new Error("The split button must have a left part. " +
        "Use LeftButton attribute to specify a left part")
    }

    this.leftButton.hostElement.classList.add("msf-split-button-leftPart");
    this.rightButton.hostElement.classList.add("msf-split-button-rightPart");


    if(this.theme != null){
      if(this.rightButton.theme == null){
        this.rightButton.theme = this.theme;
      }

      if(this.leftButton.theme == null){
        this.leftButton.theme = this.theme;
      }
    }
  }

  get Outline() {
    return this._elementRef.nativeElement.hasAttribute("Outline");
  }
}
