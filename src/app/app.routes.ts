import { Routes } from "@angular/router";
import { ItemDetailsComponent } from "./products/item-details/item-details.component";
import { ItemShellComponent } from "./products/item-shell/item-shell.component";
import { ItemUpdateComponent } from "./products/item-update/item-update.component";
import { CategoryListComponent } from "./products/pages/category-list/category-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const APP_ROUTES: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'products', component: ItemShellComponent },
  { path: 'products/edit/:id', component: ItemUpdateComponent },
  { path: 'products/:id', component: ItemDetailsComponent },
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
];
