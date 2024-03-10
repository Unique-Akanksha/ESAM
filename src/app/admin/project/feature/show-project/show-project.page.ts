import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/admin/project/data-access/project.service';
import { AddEditProjectPage } from 'src/app/admin/project/feature/add-edit-project/add-edit-project.page';
import { ModalController, ToastController } from '@ionic/angular';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetailsProjectPage } from '../details-project/details-project.page';


@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.page.html',
  styleUrls: ['./show-project.page.scss'],
})
export class ShowProjectPage implements OnInit {
  loginUser = '';
  isModalOpen = false;
  ProjectList: any[] = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    // 'project_id',
    'name',
    'description',
    'start_date',
    'end_date',
    'projectManager',
    'client',
    'teamMembers',
    'status',
    'priority',
    'delivered',
    'technologies',
    'changeRequests',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private toastController: ToastController,private projectService:ProjectService,private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }

    this.refreshProjectList();
    
  }

  
  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshProjectList();
      event.target.complete();
    }, 2000);
  }

  refreshProjectList() {
    this.projectService.getProjectList().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
      this.ProjectList = data;
      console.log("Project list : ",this.ProjectList);
    })
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
  //     component: AddEditProjectPage,
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
  //     this.refreshProjectList();
  //   });
  //   return await modal.present();
  // }

  async openModal(actionType: 'add' | 'update' | 'view', dataToUpdate: any) {
    let modalComponent;
  
    switch (actionType) {
      case 'add':
        modalComponent = AddEditProjectPage;
        break;
      case 'update':
        modalComponent = AddEditProjectPage; 
        break;
      case 'view':
        modalComponent = DetailsProjectPage;
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
        this.refreshProjectList(); 
      }
    });

  
    return await modal.present();
  }
  

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.projectService.deleteProject(item.project_id, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "Project deleted successfully.") {
            this.showSuccessToast("Project deleted successfully.");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshProjectList();
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

  getStatusColor(status: string): string {
    let color = '';
    switch (status.toLowerCase()) {
      case 'inprogress':
        color = 'orange';
        break;
      case 'planning':
        color = 'red';
        break;
      case 'completed':
        color = 'green';
        break;
      default:
        color = 'black';
        break;
    }
    return color;
  }
  
  getStatusIcon(status: string): string {
    let iconName = '';
    switch (status.toLowerCase()) {
      case 'inprogress':
        iconName = 'pending_actions';
        break;
      case 'planning':
        iconName = 'schedule';
        break;
      case 'completed':
        iconName = 'check_circle';
        break;
      default:
        iconName = 'help';
        break;
    }
    return iconName;
  }
  
  
  getPriorityColor(priority: string): string {
    let color = '';
    switch (priority.toLowerCase()) {
      case 'high':
        color = 'red';
        break;
      case 'medium':
        color = 'yellow';
        break;
      case 'low':
        color = 'green';
        break;
      default:
        color = 'black';
        break;
    }
    return color;
  }
  
  getPriorityIcon(priority: string): string {
    let iconName = '';
    switch (priority.toLowerCase()) {
      case 'high':
        iconName = 'arrow_upward';
        break;
      case 'medium':
        iconName = 'arrow_forward';
        break;
      case 'low':
        iconName = 'arrow_downward';
        break;
      default:
        iconName = 'info';
        break;
    }
    return iconName;
  }
  
  onSlideChange() {
    // Logic for slide change event
    console.log('Slide changed!'); // Replace with your specific logic
    // Additional logic such as fetching data or updating UI elements can be added here
  }
  
  
}
