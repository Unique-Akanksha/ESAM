import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.page.html',
  styleUrls: ['./details-project.page.scss'],
})
export class DetailsProjectPage implements OnInit {

  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 

  isReadonly=true;
  projectForm!:FormGroup;
  tempImageUrl: string | undefined = ''; 
  role: string | undefined = ''; 
  constructor(private modalCtrl:ModalController,private fb: FormBuilder) { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
      start_date: [''],
      end_date: [''],
      projectManager: [''],
      client: [''],
      teamMembers: [''],
      status: [''],
      priority: [''],
      delivered: [''],
      technologies: [''],
      changeRequests: [''],
    });

    if (this.actionType === 'view' && this.dataToUpdate) {
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
  }

  async closeModal(confirm: boolean){
    this.modalCtrl.dismiss(null, 'cancel');
  }


}
