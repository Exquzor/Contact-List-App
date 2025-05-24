import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

// Define application routes
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login component
  { path: 'contacts', component: ContactsComponent }, // Route for contacts list component
  { path: 'contacts/edit/:id', component: EditContactComponent, canActivate: [AuthGuard] }, // Route for editing a contact with ID parameter, guarded by AuthGuard
  { path: 'contacts/add', component: AddContactComponent, canActivate: [AuthGuard] }, // Route for adding a new contact, guarded by AuthGuard
  { path: 'contacts/:id', component: ContactDetailComponent }, // Route for displaying contact details with ID parameter
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }, // Redirect to contacts component if the path is empty
  { path: '**', redirectTo: '/contacts' } // Redirect to contacts component for any other unknown route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
