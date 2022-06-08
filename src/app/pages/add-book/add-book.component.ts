import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  formGroup: FormGroup;
  isSubmitted = false;
  imageSrc: string;
  accept = 'image/png, image/jpeg';

  constructor() {
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(3)]),
      author: new FormControl('', [Validators.required,Validators.maxLength(64), Validators.minLength(3)]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200),  Validators.minLength(3)]),
      count: new FormControl(undefined, [Validators.required,Validators.max(20),  Validators.min(1)]),
      type: new FormControl('', [Validators.required, Validators.maxLength(21),  Validators.minLength(1)]),
      edition: new FormControl(undefined, [Validators.required, Validators.max(2022),  Validators.min(1990)])
    });
  }

  onSubmit() {
    console.log(this.formGroup)
    if(this.formGroup.valid) {
      console.log(this.formGroup)
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
