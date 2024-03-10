import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowAttendancePageRoutingModule } from './show-attendance-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { ShowAttendancePage } from './show-attendance.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IonicModule } from '@ionic/angular';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ShowAttendancePageRoutingModule,MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    IonicModule
  ],
  declarations: [ShowAttendancePage],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShowAttendancePageModule {
  
}
export interface Employee {
  name: string;
  imageUrl: string;
  // You can add more properties as needed, like 'position', 'department', etc.
}

