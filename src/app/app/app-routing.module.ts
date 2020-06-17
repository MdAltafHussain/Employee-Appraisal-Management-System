import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-Employee/add-Employee.component';
import { EditEmployeeComponent } from './components/edit-Employee/edit-Employee.component';
import { EmployeesListComponent } from './components/Employees-list/Employees-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-Employee' },
  { path: 'add-Employee', component: AddEmployeeComponent },
  { path: 'edit-Employee/:id', component: EditEmployeeComponent },
  { path: 'Employees-list', component: EmployeesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }