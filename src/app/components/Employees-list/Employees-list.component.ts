import { Employee } from './../../shared/Employee';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Employees-list',
  templateUrl: './Employees-list.component.html',
  styleUrls: ['./Employees-list.component.css']
})

export class EmployeesListComponent implements OnInit {
  EmployeeData: any = [];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'Employee_name', 'Employee_email', 'section', 'action'];

  constructor(private EmployeeApi: ApiService) {
    this.EmployeeApi.GetEmployees().subscribe(data => {
      this.EmployeeData = data;
      this.dataSource = new MatTableDataSource<Employee>(this.EmployeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteEmployee(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.EmployeeApi.DeleteEmployee(e._id).subscribe()
    }
  }

}