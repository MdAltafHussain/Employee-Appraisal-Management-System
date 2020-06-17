import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-Employee',
  templateUrl: './add-Employee.component.html',
  styleUrls: ['./add-Employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetEmployeeForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  EmployeeForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['Junior Developer', 'Senior Developer', 'Tester', 'Manager', 'Other'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private EmployeeApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.EmployeeForm = this.fb.group({
      Employee_name: ['', [Validators.required]],
      Employee_email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.EmployeeForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.EmployeeForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitEmployeeForm() {
    if (this.EmployeeForm.valid) {
      this.EmployeeApi.AddEmployee(this.EmployeeForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Employees-list'))
      });
    }
  }

}