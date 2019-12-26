import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: "button", loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)},
  {path: "table", loadChildren: () => import('./table/table.module').then(m => m.TableModule)},
  {path: "grid", loadChildren: () => import('./grid/grid.module').then(m => m.GridModule)},
  {path: "menu", loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  {path: "dropdown", loadChildren: () => import('./dropdown/dropdown.module').then(m => m.DropdownModule)},
  {path: "icon", loadChildren: () => import('./icon/icon.module').then(m => m.IconModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
