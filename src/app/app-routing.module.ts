import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { ItemDetailsComponent } from './products/item-details/item-details.component';
import { ItemShellComponent } from './products/item-shell/item-shell.component';
import { ItemUpdateComponent } from './products/item-update/item-update.component';

const routes: Routes = [
  {path: 'products', component: ItemShellComponent},
  {path: 'products/edit/:id', component: ItemUpdateComponent},
  {path: 'products/:id', component: ItemDetailsComponent},
  {path: '', component: WelcomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
