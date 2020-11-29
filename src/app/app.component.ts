import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  filterUserCtrl = new FormControl();

  expandUserInfo = {};
  modalContext = {};
  activeModal: TemplateRef<any>;

  filteredUsers: User[] = [];

  sortAge = 'desc';

  userList = [{
    id: 1,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=15',
    firstname: 'Deborah',
    lastname: 'Miller',
    age: 25
  }, {
    id: 2,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=18',
    firstname: 'Johannes',
    lastname: 'Myles',
    age: 34
  }, {
    id: 3,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=345',
    firstname: 'Britta',
    lastname: 'Rhudinbergh',
    age: 43
  }, {
    id: 4,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=44',
    firstname: 'Olivia',
    lastname: 'Brown',
    age: 44
  }, {
    id: 5,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=657',
    firstname: 'Daniel',
    lastname: 'Rudin',
    age: 32
  }, {
    id: 6,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=89',
    firstname: 'Teressa',
    lastname: 'Sandhurst',
    age: 35
  }, {
    id: 7,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=877',
    firstname: 'Dina',
    lastname: 'Sokolowski',
    age: 28
  }, {
    id: 8,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=81',
    firstname: 'André',
    lastname: 'Szillagy',
    age: 23
  }, {
    id: 9,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=33',
    firstname: 'Fabian',
    lastname: 'Stocker',
    age: 45
  }, {
    id: 10,
    img: 'https://source.unsplash.com/collection/8669816/100x100?sig=21',
    firstname: 'Christian',
    lastname: 'Williams',
    age: 41
  }];

  ngOnInit() {
    this.filterUserCtrl.valueChanges.pipe(
      startWith<string>(''),
      debounceTime(300)
    ).subscribe((searchUser: string) => {
      const users = [...this.userList];
      if (searchUser.length > 3) {
        this.filteredUsers = users.filter(user => user.firstname.toLowerCase().indexOf(searchUser.toLowerCase()) > -1);
      } else if (searchUser.length === 0) {
        this.filteredUsers = users;
      }
    });
  }

  ageSorting() {
    this.sortAge = this.sortAge === 'asc' ? 'desc' : 'asc';

    this.sortAge === 'asc' ? this.filteredUsers.sort((a, b) => a.age - b.age) : this.filteredUsers.sort((a, b) => b.age - a.age);
    this.filteredUsers = this.filteredUsers;
  }

  openModal(modal: TemplateRef<any>, context?: any) {
    this.activeModal = modal;
    this.modalContext = context;
  }

  closeModal() {
    this.activeModal = null;
  }

  expandCollapse(userId: number) {
    this.expandUserInfo[userId] = !this.expandUserInfo[userId];
  }
}
