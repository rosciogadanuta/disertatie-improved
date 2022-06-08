import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formGroup:FormGroup;
  isSumbitted = false;

  constructor() {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      email:new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
      message:new FormControl('', [Validators.required, Validators.maxLength(200)]),
      }
    )
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log(this.formGroup)
    if(this.formGroup.valid) {
      console.log(this.formGroup);
      formDirective.resetForm();
      this.formGroup.reset();
      this.isSumbitted = true;
      setTimeout(()=> this.isSumbitted = false, 3000);
    }
  }

  private resetForm() {
    this.formGroup.reset({
      'name': '',
      'email': '',
      'message': '',

    });
  }
}
