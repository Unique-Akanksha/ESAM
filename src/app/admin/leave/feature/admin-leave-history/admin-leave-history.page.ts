import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';
import { ApproveRequestsPage } from '../approve-requests/approve-requests.page';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { Observable, forkJoin, map } from 'rxjs';
// import { AnyARecord } from 'dns';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-leave-history',
  templateUrl: './admin-leave-history.page.html',
  styleUrls: ['./admin-leave-history.page.scss'],
})
export class AdminLeaveHistoryPage implements OnInit {
  loginUser = '';
  first_name : string ='';
  middle_name : string ='';
  // first_name : string ='';
  last_name : string ='';
  dataSource: any;
  filterdata :string= "";
  displayedColumns: string[] = [
    'employee_id',
    'employee_name',
    'leave_category',
    'leave_type',
    'start_date',
    'end_date',
    'reason',
    'status',
    'created_at',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService,private toastController: ToastController,private leaveRequestService: LeaveService, private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
     const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       const userRole = user.role;
       this.loginUser = userRole;
     }
     this.refreshLeaveRequestsList();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshLeaveRequestsList();
      event.target.complete();
    }, 2000);
  }
  refreshLeaveRequestsList() {
    this.leaveRequestService.getAllLeaveRequests().subscribe((data) => {
      data.forEach((item: any) => {
        const employeeId = item.employee_id;
        this.employeeService.getEmpByID(employeeId).subscribe(
          (employees: any[]) => {
            const employee = employees.find(emp => emp.employee_id === employeeId);
            if (employee) {
              item.employee_name = `${employee.first_name} ${employee.last_name}`;
            } else {
              item.employee_name = 'N/A'; // Handle case where employee not found
            }
          },
          (error) => {
            console.error('Error fetching employee details:', error);
          }
        );
      });
  
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    });
  }
  
  getEmployeeDetailsById(employeeId: number) {
    this.employeeService.getEmpByID(employeeId).subscribe(
      (employees: any[]) => {
        const employee = employees.find(emp => emp.employee_id === employeeId); // Finding employee by employeeId
        if (employee) {
          // console.log('Employee Details:', employee);
          this.first_name = employee.first_name;
          this.last_name=employee.last_name;
          console.log(this.first_name,this.last_name);
        } else {
          console.log('No employee found');
        }
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
// ---------------------------------------------------------
//  refreshLeaveRequestsList() {
//     this.leaveRequestService.getAllLeaveRequests().subscribe((data) => {
//       console.log(data);
//     // Assuming 'id' is the key for leave request ID, you can access it this way:
//     data.forEach((item: any) => {
//       const employeeId =item.employee_id; // Replace with the actual employee ID
//        this.getEmployeeDetailsById(employeeId);
//       console.log("Leave Request ID:", item.employee_id);
//     });
//       this.dataSource = new MatTableDataSource<any>(data);
//       this.dataSource.sort = this.sort!;
//       this.dataSource.paginator = this.paginator!;
//     })
//   }
//   // refreshLeaveRequestsList() {
//   //   this.leaveRequestService.getAllLeaveRequests().subscribe((data) => {
//   //     console.log(data);
  
//   //     const observables: Observable<any>[] = [];
  
//   //     data.forEach((item: any) => {
//   //       const employeeId = item.employee_id;
//   //       console.log(employeeId);
//   //       const employeeDetails$ = this.employeeService.getEmpByID(employeeId);
//   //       console.log(employeeDetails$);
//   //       observables.push(employeeDetails$);
//   //       console.log(employeeDetails$);
//   //     });
  
//   //     forkJoin(observables).subscribe((employeesData: any[]) => {
//   //       data.forEach((item: any, index: number) => {
//   //         const employee = employeesData[index];
//   //         if (employee) {
//   //           item.first_name = employee.first_name;
//   //           item.last_name = employee.last_name;
//   //           console.log('Leave Request ID:', item.employee_id);
//   //           console.log('First Name:', item.first_name);
//   //           console.log('Last Name:', item.last_name);
//   //         } else {
//   //           console.log('No complete employee data found');
//   //           // Set default values or handle incomplete data here
//   //           item.first_name = 'N/A';
//   //           item.last_name = 'N/A';
//   //         }
//   //       });
  
//   //       this.dataSource = new MatTableDataSource<any>(data);
//   //       this.dataSource.sort = this.sort!;
//   //       this.dataSource.paginator = this.paginator!;
//   //     });
//   //   });
//   // }
  
//   getEmployeeDetailsById(employeeId: number) {
//     this.employeeService.getEmpByID(employeeId).subscribe(
//       (employees: any[]) => {
//         const employee = employees.find(emp => emp.employee_id === employeeId); // Finding employee by employeeId
//         if (employee) {
//           console.log('Employee Details:', employee);
//           this.first_name = employee.first_name;
//           this.last_name=employee.last_name;
//           console.log(this.first_name,this.last_name);
//         } else {
//           console.log('No employee found');
//         }
//       },
//       (error) => {
//         console.error('Error fetching employee details:', error);
//       }
//     );
//  ------------------------------------------------------------------


  

  async openModal(dataToUpdate: any) {
    let actionType = dataToUpdate ? 'update' : 'add';
    const modal = await this.modalCtrl.create({
      component: ApproveRequestsPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
      cssClass: 'my-custom-modal my-custom-modal-css', // Use both classes
      backdropDismiss: false,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
    });

    modal.onDidDismiss().then((data) => {
      this.refreshLeaveRequestsList();
    });
    return await modal.present();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.filterdata = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.leaveRequestService.deleteLeaveRequest(item.leaveRequestID, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "LeaveRequest deleted successfully") {
            this.showSuccessToast("LeaveRequest deleted successfully");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshLeaveRequestsList();
        },
        (error: any) => {
          console.error("Error: ", error);
          this.showErrorToast("An error occurred");
        }
      );
    }
  }
  
  showSuccessToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    }).then((toast) => {
      toast.present();
    });
  }
  
  showErrorToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    }).then((toast) => {
      toast.present();
    });
  }
}
// ---------------------------------My Logic----------------------------------------
// refreshLeaveRequestsList() {
  //   this.leaveRequestService.getAllLeaveRequests().subscribe((data) => {
  //     console.log(data);
  //   // Assuming 'id' is the key for leave request ID, you can access it this way:
  //   data.forEach((item: any) => {
  //     const employeeId =item.employee_id; // Replace with the actual employee ID
  //      this.getEmployeeDetailsById(employeeId);
  //     console.log("Leave Request ID:", item.employee_id);
  //   });
  //     this.dataSource = new MatTableDataSource<any>(data);
  //     this.dataSource.sort = this.sort!;
  //     this.dataSource.paginator = this.paginator!;
  //   })
  // }
  // getEmployeeDetailsById(employeeId: number) {
  //   this.employeeService.getEmpByID(employeeId).subscribe(
  //     (employees: any[]) => {
  //       const employee = employees.find(emp => emp.employee_id === employeeId); // Finding employee by employeeId
  //       if (employee) {
  //         console.log('Employee Details:', employee);
  //         this.first_name = employee.first_name;
  //         this.last_name=employee.last_name;
  //         console.log(this.first_name,this.last_name);
  //       } else {
  //         console.log('No employee found');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching employee details:', error);
  //     }
  //   );
  // }
  
// --------------------------