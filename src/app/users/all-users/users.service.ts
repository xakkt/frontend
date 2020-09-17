import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from './users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class UsersService {
  private readonly API_URL = 'http://localhost:4800/api/v1/user/list';
  dataChange: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): Users[] {
    console.log('here we go',this.dataChange.value)
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<Users[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addUsers(users: Users): void {
    this.dialogData = users;
  }
  updateUsers(users: Users): void {
    this.dialogData = users;
  }
  deleteUsers(id: number): void {
    console.log(id);
  }
}