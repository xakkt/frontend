import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UsersService } from '../../users.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Users } from '../../users.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  proForm: FormGroup;
  users: Users;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.users.name;
      this.users = data.users;
    } else {
      this.dialogTitle = 'New Professors';
      this.users = new Users({});
    }
    this.proForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.users.id],
      img: [this.users.img],
      first_name: [this.users.first_name],
      last_name: [this.users.last_name],
      email: [
        this.users.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      date: [this.users.dob],
      mobile: [this.users.contact_no],
      status: [this.users.status],
      last_login: [formatDate(this.users.last_login, 'yyyy-MM-dd', 'en'),]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.usersService.addUsers(this.proForm.getRawValue());
  }
}