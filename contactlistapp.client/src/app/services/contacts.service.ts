import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Category } from '../interfaces/category';
import { Subcategory } from '../interfaces/subcategory';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsUrl = 'api/contacts'; // API endpoint for contacts
  private categoriesUrl = 'api/categories'; // API endpoint for categories
  private subcategoriesUrl = 'api/subcategories'; // API endpoint for subcategories

  constructor(private http: HttpClient) { }

  // Retrieve all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl, { withCredentials: true });
  }

  // Retrieve a single contact by id
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactsUrl}/${id}`, { withCredentials: true });
  }

  // Add a new contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, { withCredentials: true });
  }

  // Update an existing contact
  updateContact(contact: Contact): Observable<void> {
    return this.http.put<void>(`${this.contactsUrl}/${contact.id}`, contact, { withCredentials: true });
  }

  // Delete a contact by id
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.contactsUrl}/${id}`, { withCredentials: true });
  }

  // Retrieve all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  // Retrieve a single category by id
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesUrl}/${id}`, { withCredentials: true });
  }

  // Retrieve a single subcategory by id
  getSubcategory(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.subcategoriesUrl}/${id}`, { withCredentials: true });
  }

  // Retrieve subcategories related to a category based on category id
  getSubcategoriesByCategoryId(categoryId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.subcategoriesUrl}/category/${categoryId}`);
  }

  // Add a new subcategory
  addSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.subcategoriesUrl, subcategory);
  }
}
