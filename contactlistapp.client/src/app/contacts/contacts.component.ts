import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  loggedIn: boolean | undefined;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadContacts(); // Load contacts when component initializes
    this.authService.loggedIn$.subscribe(loggedIn => { // Subscribe to login status changes from AuthService
      this.loggedIn = loggedIn; // Update loggedIn flag
    });
  }

  // Load contacts from backend
  loadContacts(): void {
    this.contactsService.getContacts().subscribe(
      data => this.contacts = data,
      error => console.error('There was an error!', error)
    );
  }

  // Navigate to view a specific contact by id
  viewContact(id: number): void {
    this.router.navigate(['/contacts', id]);
  }

  // Navigate to add a new contact
  addContact(): void {
    this.router.navigate(['/contacts', 'add']);
  }

  // Navigate to edit a contact by id
  editContact(id: number): void {
    this.router.navigate(['/contacts', 'edit', id]);
  }

  // Delete a contact by id
  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }
}
