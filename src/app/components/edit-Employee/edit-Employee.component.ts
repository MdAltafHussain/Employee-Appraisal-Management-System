import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-Employee',
  templateUrl: './edit-Employee.component.html',
  styleUrls: ['./edit-Employee.component.css']
})

export class EditEmployeeComponent implements OnInit {
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
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private EmployeeApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.EmployeeApi.GetEmployee(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.EmployeeForm = this.fb.group({
        Employee_name: [data.Employee_name, [Validators.required]],
        Employee_email: [data.Employee_email, [Validators.required]],
        section: [data.section, [Validators.required]],
        subjects: [data.subjects],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
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

  /* Update book */
  updateEmployeeForm() {
    console.log(this.EmployeeForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.EmployeeApi.UpdateEmployee(id, this.EmployeeForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/Employees-list'))
      });
    }
  }
  
}
