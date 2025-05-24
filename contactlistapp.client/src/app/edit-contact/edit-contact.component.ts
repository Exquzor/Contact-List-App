import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../models/contact.model';
import { Category } from '../interfaces/category';
import { Subcategory } from '../interfaces/subcategory';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})

export class EditContactComponent implements OnInit {
  contact: Contact = new Contact();
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  error: string | undefined;
  subcategoryname: string = '';

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Load contact details and categories when component initializes
  ngOnInit(): void {
    const contactId = +this.route.snapshot.paramMap.get('id')!;
    this.loadContact(contactId);
    this.loadCategories();
  }

  // Load specific contact details
  loadContact(id: number): void {
    this.contactsService.getContact(id).subscribe(
      (contact) => {
        this.contact = contact;
        this.onCategoryChange(this.contact.categoryId);
      },
      (error) => {
        console.error('Error loading contact:', error);
      }
    );
  }

  // Load all available categories
  loadCategories(): void {
    this.contactsService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  // Load subcategories based on selected category
  loadSubcategories(categoryId: number): void {
    this.contactsService.getSubcategoriesByCategoryId(categoryId).subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
      },
      (error) => {
        console.error('Error loading subcategories:', error);
      }
    );
  }

  // Handle category change event
  onCategoryChange(categoryId: number): void {
    if (categoryId == 1) { // 'Business' category
      this.loadSubcategories(categoryId);
      this.contact.subcategoryId = 0; // Reset subcategory selection
    } else if (categoryId == 3) { // 'Other' category
      this.subcategories = []; // Clear subcategories
      this.contact.subcategoryId = 0;
    } else { // 'Private' category
      this.subcategories = [];
      this.contact.subcategoryId = 0;
    }
  }

  // Update contact details
  updateContact(): void {
    if (this.contact.categoryId == 3) {
      // Post new subcategory if "Other" category is selected
      this.contactsService.addSubcategory({ id: 0, name: this.subcategoryname, categoryId: 3 }).subscribe(
        (subcategory) => {
          this.contact.subcategoryId = subcategory.id;
          this.saveContact(); // Proceed with saving contact details
        },
        (error) => { // Display error based on the JSON response from request
          console.error('Error adding subcategory:', error);
          const firstError = this.getFirstError(error.error.errors);
          if (firstError == 'The Name field is required.') {
            this.error = 'Subcategory name is required.';
          } else {
            this.error = 'An unexpected error occurred while adding subcategory.'; // Display generic error message if unknown error occurrs
          }
        }
      );
    } else {
      this.saveContact(); // Save contact without adding new subcategory to the database
    }
  }

  // Update contact in the database
  saveContact(): void {
    this.contactsService.updateContact(this.contact).subscribe(
      () => {
        this.router.navigate(['/contacts']); // Navigate back to contacts list upon successful update
      },
      (error) => { // Display error based on the JSON response from request
        if (error.status === 400 && error.error && error.error.errors) {
          const firstError = this.getFirstError(error.error.errors);
          this.error = firstError;
        } else if (error.status === 400 && error.error && error.error.Email) {
          this.error = error.error.Email[0];
        } else if (error.status === 400 && error.error && error.error.CategoryId) {
          this.error = 'Invalid Category.';
        } else if (error.status === 400 && error.error && error.error.SubcategoryId) {
          this.error = 'Invalid Subcategory.';
        } else {
          this.error = 'An unexpected error occurred.'; // Display generic error message if unknown error occurrs
        }
      }
    );
  }

  // Navigate back to contacts list
  goBack(): void {
    this.router.navigate(['/contacts']);
  }

  // Retrieve the first error message from validation errors from JSON repsonse to a request
  private getFirstError(errors: any): string {
    for (const key of Object.keys(errors)) {
      if (errors[key] && errors[key].length > 0) {
        return errors[key][0];
      }
    }
    return 'Validation error occurred.';
  }
}
