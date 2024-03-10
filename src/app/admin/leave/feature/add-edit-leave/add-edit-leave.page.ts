import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';

@Component({
  selector: 'app-add-edit-leave',
  templateUrl: './add-edit-leave.page.html',
  styleUrls: ['./add-edit-leave.page.scss'],
})
export class AddEditLeavePage implements OnInit {

  leaveRequestForm!: FormGroup;
  loginEmployeeName = '';
  loginEmployeeID = 0;
  start_date: string = '';
  end_date: string = '';
  leaves: any[] = [];
  constructor(private fb:FormBuilder, private leaveRequestService:LeaveService, private toastController: ToastController) { }
  ngOnInit() {
    // this.leaveRequestService.getAllLeaveRequests().subscribe((leaves) => {
    //   this.leaves = leaves;
    //   console.log(leaves);
    // });
    this.leaveRequestForm = this.fb.group({
      employee_id: ['', Validators.required],
      leave_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      created_at: new Date().toISOString().slice(0, 10),
      leave_category:['',Validators.required],
      
    });

    const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       this.loginEmployeeID = user.employee_id;
       this.loginEmployeeName = user.first_name + ' ' + user.last_name;
     }

     this.leaveRequestForm.patchValue({
      employee_id: this.loginEmployeeName
    });
  }
 
  applyLeave(){
    const leaveRequestsData = this.leaveRequestForm.value;
    
    leaveRequestsData.employee_id = this.loginEmployeeID;
    leaveRequestsData.status = 'Requested';
    console.log("Leave data : ",leaveRequestsData.employee_id);
    console.log("Leave data : ",leaveRequestsData.start_date);
    console.log("Leave data : ",leaveRequestsData.end_date);
    console.log("Leave data : ",leaveRequestsData.reason);
    console.log("Leave data : ",leaveRequestsData.status);
    console.log("Leave data : ",leaveRequestsData.created_at);
    console.log("Leave data : ",leaveRequestsData.leave_type);
    console.log("Leave data : ",leaveRequestsData.leave_category);
    // console.log("Leave data : ");
    this.leaveRequestService.createLeaveRequest(
      leaveRequestsData,
      async (message) => {
        console.log("Response: ", message);
        if (message === "LeaveRequest already exists") {
          const toast = await this.toastController.create({
            message: "LeaveRequest already exists",
            duration: 3000, 
            position: 'bottom', 
            color: 'danger', 
          });
          toast.present();
        }
        else{
          const toast = await this.toastController.create({
            message: "LeaveRequest inserted successfully",
            duration: 3000, 
            position: 'bottom', 
            color: 'success', 
          });
          toast.present();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    this.leaveRequestForm.reset();
  }

  
  
  
  

  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); 
  }
  getMinimumStartDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  
  // For the end date input
  getMinimumEndDate(): string {
    // Here, you might want to set a minimum date based on the selected start date
    // Assuming you want the end date to be at least the start date or later
    if (this.start_date) {
      return this.start_date;
    } else {
      // If start date is not selected yet, you might return today's date or any other default
      const today = new Date();
      return today.toISOString().split('T')[0];
    }
  }
}