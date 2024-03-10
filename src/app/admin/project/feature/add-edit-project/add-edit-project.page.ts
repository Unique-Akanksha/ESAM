// add-edit-project.page.ts
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/admin/project/data-access/project.service';
import { ToastController } from '@ionic/angular';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.page.html',
  styleUrls: ['./add-edit-project.page.scss'],
})
export class AddEditProjectPage implements OnInit {
  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 
  @Input() projectdata: any; 
  projectForm!: FormGroup;
  employees: any[] = [];
  constructor(private employeeService: EmployeeService, private toastController: ToastController,private projectService: ProjectService, private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      projectManager: ['', [Validators.required]],
      client: ['', [Validators.required]],
      teamMembers: [[], [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      delivered: ['', [Validators.required]],
      technologies: ['', [Validators.required]],
      changeRequests: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      this.projectForm.patchValue({

        name: this.dataToUpdate.name,
        description: this.dataToUpdate.description,
        start_date: this.dataToUpdate.start_date,
        end_date: this.dataToUpdate.end_date,
        projectManager: this.dataToUpdate.projectManager,
        client: this.dataToUpdate.client,
        teamMembers: this.dataToUpdate.teamMembers,
        status: this.dataToUpdate.status,
        priority: this.dataToUpdate.priority,
        delivered: this.dataToUpdate.delivered,
        technologies: this.dataToUpdate.technologies,
        changeRequests: this.dataToUpdate.changeRequests,
      });
    }
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.employeeService.getEmpList().subscribe((data) => {
      this.employees = data;
    });
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      if (this.projectForm.valid) {
        const projectData = this.projectForm.value;
        if (this.actionType === 'update') {
          this.updateProject(projectData);
        } else {
          this.addProject(projectData);
        }
      }
    }
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.project_id},...this.projectForm.value}});
  }

  updateProject(dataToEdit: any) {
    const updatedData = { ...dataToEdit, id: this.dataToUpdate.project_id };
    this.projectService.updateProject(updatedData,
      async (message) => {
        if (message === "Project already exists") {
          this.presentToast('Project already exists', 'danger');
        } else {
          this.presentToast('Project updated successfully', 'success');
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  addProject(formData: any) {
    this.projectService.addProject(formData,
      async (message) => {
        if (message === "Project already exists") {
          this.presentToast('Project already exists', 'danger');
        } else {
          this.presentToast('Project created successfully', 'success');
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    this.projectForm.reset();
  }

  // isMemberSelected(employeeId: number): boolean {
  //   const selectedTeamMembers = this.projectForm.get('teamMembers')?.value;
  //   return Array.isArray(selectedTeamMembers) && selectedTeamMembers.includes(employeeId);
  // }
  isMemberSelected(employeeId: number): boolean {
    const selectedTeamMembers = this.projectForm.get('teamMembers')?.value;
    return selectedTeamMembers?.indexOf(employeeId) !== -1;
  }
  

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); 
  }

  getMinimumStartDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMinimumEndDate(): string {
    const startDateControl = this.projectForm.get('start_date');
    const endDateControl = this.projectForm.get('end_date');

    if (startDateControl && endDateControl) {
      const startDateValue = startDateControl.value;
      if (startDateValue !== '' && startDateValue !== null) {
        return startDateValue;
      }
    }

    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  
}
