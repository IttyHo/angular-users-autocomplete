import { inject } from '@angular/core';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterOutlet } from '@angular/router';
import { User } from '../../Models/User';
import { UserService } from '../../Services/user-service';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet], 
  imports: [ReactiveFormsModule, CommonModule],

  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public userService = inject(UserService);
  header = 'Study_tset_healthMinstry';
  protected readonly title = signal('Study_tset_healthMinstry');
  users = toSignal(this.userService.filteredUsers$, { initialValue: [] });

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit() {
    this.userService.getUsers().subscribe();
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(filters => {
        this.userService.applyFilters(filters);
      });
  }
}

// searchUserViaEmailOrName(name:string|null, email:string|null) {

//   alert("App:searchUserViaEmailOrName called with name="+name+" email="+email);}
//