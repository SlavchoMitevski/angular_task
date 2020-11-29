import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user-details',
  templateUrl: './add-user-details.component.html',
  styleUrls: ['./add-user-details.component.scss']
})
export class AddUserDetailsComponent implements OnInit {

  @Input() userData: User;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  userForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      address: new FormControl('', Validators.compose([Validators.required])),
      city: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  saveUserData() {
    const address = this.userForm.get('address');
    const city = this.userForm.get('city');
    const country = this.userForm.get('country');

    if (this.userForm.invalid) {
      address.markAsTouched();
      city.markAsTouched();
      country.markAsTouched();
      return;
    } else {
      this.userForm.markAsPristine();
    }

    this.userData.data = {};
    this.userData.data = {
      address: address.value,
      city: city.value,
      country: country.value
    };

    this.closeAddUserModal();
  }

  closeAddUserModal() {
    this.closeModal.emit();
  }

}
