import { Component,AfterViewInit, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { AddEditAttendancePage } from 'src/app/admin/attendance/feature/add-edit-attendance/add-edit-attendance.page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { ProfileEmpPage } from 'src/app/pages/profile-emp/profile-emp.page';
import { DetailsEmpAttendancePage } from '../details-emp-attendance/details-emp-attendance.page';
import { DetailsEmployeePage } from 'src/app/admin/employee/feature/details-employee/details-employee.page';
// import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.page.html',
  styleUrls: ['./show-attendance.page.scss'],
})
export class ShowAttendancePage implements OnInit,AfterViewInit {
  // @ViewChild('slider', { static: true }) slider!: any;

  employees = [
    { first_name: '', last_name: '',department:'', userPhoto: '' },
  
  ];

  loginUser = '';
  isModalOpen = false;
  AttendanceList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    // 'attendanceID',
    'employeeName',
    'employeeDept',
    'currentTime',
    'currentDate',
    'currentLocation',
    'projectList',
    'checkInTime',
    'checkOutTime',
    'totalHrsTime',
    'action',
  ];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService,private toastController: ToastController,private attendanceService:AttendanceService,private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {

    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }
    this.refreshAttendanceList();
  }

  
  // async sliderOptions() {
  //   const options = {
  //     initialSlide: 1,
  //     speed: 400,
  //   };
  //   await this.slider.update();
  //   await this.slider.slideTo(2);
  //   await this.slider.lockSwipes(true);
  //   await this.slider.slideNext();
  //   await this.slider.slidePrev();
  //   await this.slider.unlockSwipes();
  //   await this.slider.slideTo(0);
  //   await this.slider.slideTo(0, 500);
  //   await this.slider.slideTo(0, 500, true);
  //   await this.slider.zoomTo(2);
  //   await this.slider.zoomTo(2, 500);
  //   await this.slider.startAutoplay();
  //   await this.slider.stopAutoplay();
  //   await this.slider.getSwiper();
  //   await this.slider.getSwiper().then((swiper:any) => {
  //     swiper.slideTo(3, 1000, false);
  //   });
  // }

  ngAfterViewInit() {
    // this.startAutoSlide();
  }

  // startAutoSlide() {
  //   this.slider.startAutoplay();
  // }

  // stopAutoSlide() {
  //   this.slider.stopAutoplay();
  // }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshAttendanceList();
      event.target.complete();
    }, 2000);
  }

  refreshAttendanceList() {
    this.attendanceService.getAttendanceList().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
      this.employees = data;
      console.log(this.employees)
    });

    this.employeeService.getEmpList().subscribe((data) => {
      this.employees = data;
      // console.log(this.employees)
    });
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

  // async openModal(dataToUpdate: any) {
  //   let actionType = dataToUpdate ? 'update' : 'add';
  //   const modal = await this.modalCtrl.create({
  //     component: AddEditAttendancePage,
  //     componentProps: {
  //       actionType: actionType,
  //       dataToUpdate: dataToUpdate
  //     },
  //     cssClass: 'my-custom-modal my-custom-modal-css', // Use both classes
  //     backdropDismiss: false,
  //     animated: true,
  //     keyboardClose: true,
  //     showBackdrop: true,
  //   });

  //   modal.onDidDismiss().then((data) => {
  //     this.refreshAttendanceList();
  //   });
  //   return await modal.present();
  // }

  async openModal(actionType: 'add' | 'update' | 'view', dataToUpdate: any) {
    let modalComponent;
  
    switch (actionType) {
      case 'add':
        modalComponent = AddEditAttendancePage;
        break;
      case 'update':
        modalComponent = AddEditAttendancePage; 
        break;
      case 'view':
        modalComponent = DetailsEmployeePage;
        break;
      default:
        return;
    }
  
    const modal = await this.modalCtrl.create({
      component: modalComponent,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate, 
      },
      cssClass: 'my-custom-modal my-custom-modal-css', // Use both classes
      backdropDismiss: false,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
    });
  
    modal.onDidDismiss().then(() => {
      if (actionType !== 'view') {
        this.refreshAttendanceList(); 
      }
    });

  
    return await modal.present();
  }
  
  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.attendanceService.deleteAttendance(item.attendanceID, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "Attendance deleted successfully") {
            this.showSuccessToast("Attendance deleted successfully");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshAttendanceList();
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
