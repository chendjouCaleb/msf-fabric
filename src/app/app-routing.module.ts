import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: "button", loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: "radio", loadChildren: () => import('./radio/radio.module').then(m => m.RadioModule)},
  {path: "table", loadChildren: () => import('./table/table.module').then(m => m.TableModule)},
  {path: "grid", loadChildren: () => import('./grid/grid.module').then(m => m.GridModule)},
  {path: "menu", loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  {path: "dropdown", loadChildren: () => import('./dropdown/dropdown.module').then(m => m.DropdownModule)},
  {path: "icon", loadChildren: () => import('./icon/icon.module').then(m => m.IconModule)},
  {path: "pivot", loadChildren: () => import('./pivot/pivot.module').then(m => m.PivotModule)},
  {path: "callout", loadChildren: () => import('./callout/callout.module').then(m => m.CalloutModule)},
  {path: "dialog", loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
