import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomersComponent} from './pages/customers/customers.component';
import {CustomerFormComponent} from './pages/customer-form/customer-form.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'customer-form', component: CustomerFormComponent},
  {path: 'customer-form/:id', component: CustomerFormComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
