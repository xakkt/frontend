import { formatDate } from '@angular/common';

export class Users {
  id: number;
  img: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  ncrStatus: string;
  status: string;
  timezone: string;
  dob: string;
  last_login: string;
  constructor(users) {
    {
      this.id = users._id || this.getRandomID();
      this.first_name = users.first_name || 'assets/images/user/user1.jpg';
      this.last_name = users.last_name || '';
      this.email = users.email || '';
      this.contact_no = users.contact_no || '';
      this.ncrStatus = users.ncrStatus || '';
      this.status = users.status || '';
      this.timezone = users.timezone || '';
      this.dob = users.dob || '';
      this.last_login = users.last_login || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}