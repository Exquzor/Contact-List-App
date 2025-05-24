import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';
import { AuthService } from '../services/auth.service';
import { Category } from '../interfaces/category';
import { Subcategory } from '../interfaces/subcategory';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact();
  id: number;
  loggedIn: boolean | undefined;
  category: Category | undefined;
  subcategory: Subcategory | undefined;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
    this.loadContact(this.id); // Load contact details when component initializes
    this.authService.loggedIn$.subscribe(loggedIn => { // Subscribe to login status changes from AuthService
      this.loggedIn = loggedIn; // Update loggedIn flag
    });
  }

  // Load contact details by id
  loadContact(id: number): void {
    this.contactsService.getContact(id).subscribe(
      (contact) => {
        this.contact = contact;
        this.loadCategory(contact.categoryId); // Load category details for the contact
        if (contact.subcategoryId) {
          this.loadSubcategory(contact.subcategoryId); // Load subcategory details if available
        }
      },
      (error) => {
        console.error('Error loading contact:', error);
      }
    );
  }

  // Load category details by id
  loadCategory(categoryId: number): void {
    this.contactsService.getCategory(categoryId).subscribe(
      (category) => {
        this.category = category;
      },
      (error) => {
        console.error('Error loading category:', error);
      }
    );
  }

  // Load subcategory details by ID
  loadSubcategory(subcategoryId: number): void {
    this.contactsService.getSubcategory(subcategoryId).subscribe(
      (subcategory) => {
        this.subcategory = subcategory;
      },
      (error) => {
        console.error('Error loading subcategory:', error);
      }
    );
  }

  // Navigate to edit contact page
  editContact(id: number): void {
    this.router.navigate(['/contacts', 'edit', id]);
  }

  // Delete contact by id
  deleteContact(id: number): void {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }

  // Navigate back to contacts list
  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}
