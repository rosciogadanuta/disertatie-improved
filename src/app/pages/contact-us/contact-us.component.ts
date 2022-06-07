import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formGroup:FormGroup;

  constructor() {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      email:new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
      message:new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
      }
    )
  }

  onSumbit(){
    console.log(this.formGroup)
  }
}
