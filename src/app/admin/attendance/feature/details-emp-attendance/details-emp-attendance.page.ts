import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-emp-attendance',
  templateUrl: './details-emp-attendance.page.html',
  styleUrls: ['./details-emp-attendance.page.scss'],
})
export class DetailsEmpAttendancePage implements OnInit {

  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 

  isReadonly=true;
  empForm!:FormGroup;
  tempImageUrl: string | undefined = ''; 
  role: string | undefined = ''; 
  constructor(private modalCtrl:ModalController,private fb: FormBuilder) { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.empForm = this.fb.group({
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      email: [''],
      hire_date: [''],
      dob: [''],
      gender: [''],
      department: [''],
      position: [''],
      role: [''],
      userPhoto: [''],
    });

    if (this.actionType === 'view' && this.dataToUpdate) {
      this.empForm.patchValue({
        first_name: this.dataToUpdate.first_name,
        middle_name: this.dataToUpdate.middle_name,
        last_name: this.dataToUpdate.last_name,
        email: this.dataToUpdate.email,
        hire_date: this.dataToUpdate.hire_date,
        dob: this.dataToUpdate.dob,
        gender: this.dataToUpdate.gender,
        department: this.dataToUpdate.department,
        position: this.dataToUpdate.position,
        userPhoto: this.dataToUpdate.userPhoto,
        role: this.dataToUpdate.role,
      });
    } 
  }

  async closeModal(confirm: boolean){
    this.modalCtrl.dismiss(null, 'cancel');
  }


}
