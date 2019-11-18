import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from "@angular/core";
import {ContextualMenuLinker} from "./contextual-menu-linker";

@Component({
  templateUrl: "contextual-menu.component.html",
  selector: "[MsfContextualMenu], MsfContextualMenu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ ContextualMenuLinker ]
})
export class MsfContextualMenuComponent implements OnInit{

  /**
   * Accessible label for the ContextualMenu's root element
   */
  @Input()
  AriaLabel: string;


  constructor(private linker: ContextualMenuLinker, private _elementRef: ElementRef<HTMLElement>) {}


  get host() {
    return this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.host.classList.add("msf_ContextMenu");
    this.host.classList.add("ms-depth-4");
    this.linker.menu = this;
  }





}
