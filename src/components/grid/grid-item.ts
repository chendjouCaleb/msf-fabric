import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Optional,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {ElementRect} from "../helpers/position";
import {AbstractGridItem} from "../abstract-grid/abstract-grid-item";
import {MsfGrid} from "./grid";
import {MsfCheckbox} from "../checkbox/checkbox";

let uniqueId = 0;


