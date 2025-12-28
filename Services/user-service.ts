import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
}

)
export class UserService {

  private http = inject(HttpClient);

  private userList: User[] = [];

  private filteredUsersSubject = new BehaviorSubject<User[]>([]);
  filteredUsers$ = this.filteredUsersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(users => {
          this.userList = users;                 // מקור האמת
          this.filteredUsersSubject.next(users); // התחלה = כולם
        })
      );
  }



 applyFilters(value: any): void {
  const name = value?.name?.toLowerCase().trim();
  const email = value?.email?.toLowerCase().trim();

  const filteredUserList = this.userList.filter(user => {
    const matchName =
      name ? user.name.toLowerCase().includes(name) : false;

    const matchEmail =
      email ? user.email.toLowerCase().includes(email) : false;

    // אם אין פילטרים בכלל – מחזירים הכל
    if (!name && !email) {
      return true;
    }

    // מספיק שאחד מהם מתאים
    return matchName || matchEmail;
  });

  this.filteredUsersSubject.next(filteredUserList);
}

}