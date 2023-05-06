import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './products/item-list/item-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ItemDetailsComponent } from './products/item-details/item-details.component';

const routes: Routes = [
  {path: 'products', component: ItemListComponent},
  {path: 'products/:id', component: ItemDetailsComponent},
  {path: '', component: WelcomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
