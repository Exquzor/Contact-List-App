// Contact model
export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  categoryId: number;
  subcategoryId: number;
  phoneNumber: string;
  birthDate: Date;

  constructor(
    id: number = 0,
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    categoryId: number = 0,
    subcategoryId: number = 0,
    phoneNumber: string = '',
    birthDate: Date = new Date()
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
  }
}
