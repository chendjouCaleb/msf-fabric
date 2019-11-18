import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {ColorTheme} from "../helpers/theme";
import {ContextualMenuLinker} from "./contextual-menu-linker";

@Component({
  templateUrl: "contextual-menu-item.component.html",
  selector: "[MsfContextualMenuItem], MsfContextualMenuItem",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsfContextualMenuItemComponent implements OnInit, AfterViewInit{
  @Input()
  Icon: string;

  @Input()
  SecondaryIcon: string;

  @Input()
  SecondaryText: string;

  @Input()
   set Theme(color: string){
    this.host.classList.add(`msf_ContextMenuItem-${color}`)
  }

  @Input()
  disabled: boolean;

  @Input()
  Disabled: boolean;

  @ViewChild("msfContextualMenuItemLabel", {static: false})
  labelElement: ElementRef<HTMLElement>;

  maxLabelWidth: number;

  hasIcon: boolean = false;

  constructor(public linker: ContextualMenuLinker, public detector: ChangeDetectorRef,
              private _elementRef: ElementRef<HTMLElement>) {this.detector.detach();


  }

  ngOnInit(): void {
    this.host.classList.add("msf_ContextMenuItem");
  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get labelWidth(): number {
    if(this.labelElement == null){
      return 0;
    }
    return this.labelElement.nativeElement.getBoundingClientRect().width;
  }

  ngAfterViewInit(): void {
    this.detector.detectChanges();
    this.linker.onMaxLabelWidthChange.subscribe(() => {
      this.labelElement.nativeElement.style.width = this.linker.maxItemLabelWidth + "px";
    });

    this.linker.addItem(this);
  }
}
