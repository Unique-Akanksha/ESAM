import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.page.html',
  styleUrls: ['./add-edit-employee.page.scss'],
})
export class AddEditEmployeePage implements OnInit {

  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 
  empForm!: FormGroup;
  userRoleList: any[] = [];
  employees: any[] = [];
  departments: any[] = [];
  imageUrl: string | undefined = ''; 
  tempImageUrl: string | undefined = ''; 
  private file: File | undefined;
  employeeData: any = { userPhoto: '' };

  constructor(
    private toastController: ToastController,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.departmentService.getDepartmentList().subscribe((departments) => {
    //   this.employees = departments; // Assuming departments fetched have 'id' and 'name' properties
    // });
    
    this.departmentService.getDepList().subscribe((departments) => {
      this.departments = departments; // Storing departments in this.departments
    });
    
    this.employeeService.getEmpList().subscribe(( employees) => {
      this. employees =  employees;
    });
    this.refreshRolesList();

    this.empForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      hire_date: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
      userPhoto: [''],
      // userPhoto:['',[Validators.required]],
    }, {
      validator: this.passwordMatchValidator
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
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
        password: this.dataToUpdate.password,
        confirmPassword: this.dataToUpdate.password,
        role: this.dataToUpdate.role,
        userPhoto: this.dataToUpdate.userPhoto, 
        
      });
      this.tempImageUrl = this.dataToUpdate.userPhoto;
      console.log(this.tempImageUrl);
    } else {
      this.empForm.patchValue({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        hire_date: '',
        dob: '',
        gender: '',
        department: '',
        position: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
    }
  }

  refreshRolesList() {
    this.userService.getRolesList().subscribe((data) => {
      this.userRoleList = data;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async closeModal(confirm: boolean) {
    if (confirm) {
      console.log("confirm button clicked");
      if (this.empForm.valid) {
        this.employeeData = { ...this.employeeData, ...this.empForm.value };
        try {
          if (this.file) {
            this.employeeData.userPhoto = await this.uploadImage(this.file);
          }
          console.log('Employee Data', this.employeeData);
  
          if (this.actionType === 'update') {
            this.updateEmployee(this.employeeData);
          } else {
            this.addEmployee(this.employeeData);
          }
  
          this.modalCtrl.dismiss({ role: 'confirm', data: { ...{ id: this.dataToUpdate.employee_id }, ...this.empForm.value } });
        } catch (error) {
          console.error('Image upload error:', error);
        }
      }
    } else {
      this.modalCtrl.dismiss(null, 'cancel');
    }
  }

  // async uploadImage(file: File) {
  //   try {
  //     const imageUrl = await this.employeeService.uploadImage(file).toPromise();
  //     if (imageUrl) {
  //       this.tempImageUrl = imageUrl.replace(/\/\//g, '/');
  //       // Update the URL with your actual path here
  //       this.tempImageUrl = 'http://localhost/ionic/Backend_Attendance_Management_System/backend/backend/' + this.tempImageUrl;
  //     }
  //     return imageUrl; // Return the image URL
  //   } catch (error) {
  //     console.error('Image upload error:', error);
  //     throw error; // Throw the error to handle it elsewhere if needed
  //   }
  // }
  async uploadImage(file: File) {
    try {
      const imageUrl = await this.employeeService.uploadImage(file).toPromise();
      if (imageUrl) {
        this.tempImageUrl = imageUrl.replace(/\/\//g, '/');
        // Update the URL with your actual path here
        this.tempImageUrl = 'http://localhost/ionic/Backend_Attendance_Management_System/backend/backend/uploads/6564628f51c90_man%20(2).png';
      }
      return imageUrl; // Return the image URL
    } catch (error) {
      console.error('Image upload error:', error);
      throw error; // Throw the error to handle it elsewhere if needed
    }
  }
  
  
  
  
    

  updateEmployee(dataToEdit: any) {
    const updatedData = {
      first_name: dataToEdit.first_name,
      middle_name: dataToEdit.middle_name,
      last_name: dataToEdit.last_name,
      email: dataToEdit.email,
      hire_date: dataToEdit.hire_date,
      dob: dataToEdit.dob,
      gender: dataToEdit.gender,
      department: dataToEdit.department,
      position: dataToEdit.position,
      password: dataToEdit.password,
      confirmPassword: dataToEdit.password,
      userPhoto: dataToEdit.userPhoto || this.dataToUpdate.userPhoto,
      role: dataToEdit.role,
      id: this.dataToUpdate.employee_id
    };

    this.employeeService.updateEmployee(updatedData,
      async (message) => {
        if (message === "employee already exists") {
          const toast = await this.toastController.create({
            message: 'Employee already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Employee updated successfully',
            duration: 3000,
            position: 'bottom',
            color: 'success',
          });
          toast.present();
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        console.error('Error updating employee:', error);
        // Handle error, show toast, etc.
      }
    );
  }



  async addEmployee(formData: any) {
      
      console.log('',formData.first_name);
      console.log('',formData.middle_name);
      console.log('',formData.last_name);
      console.log('',formData.email);
      console.log('',formData.hire_date);
      console.log('',formData.dob);
      console.log('',formData.gender);
      console.log('',formData.department);
      console.log('',formData.position);
      console.log('',formData.password);
      console.log('',formData.confirmPassword);
      console.log('',formData.userPhoto);
      console.log('',formData.role);

    this.employeeService.addEmployee(
      formData,
      async (message) => {
        console.log('Response: ', message);
        if (message === 'employee already exists') {
          const toast = await this.toastController.create({
            message: 'employee already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'employee inserted successfully',
            duration: 3000,
            position: 'bottom',
            color: 'success',
          });
          toast.present();
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    
    this.empForm.reset();
  }

  emailValidator(control: FormControl) {
    const email = control.value;
    if (email) {
      const emailRegex = /^[a-zA-Z._+-][a-zA-Z0-9._+-]*@[a-zA-Z.-]+\.[a-z]{2,10}$/;

      if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      }

      if (/^\d/.test(email)) {
        return { startsWithNumber: true };
      }

      if (/[!#$%^&*()_+{}\[\]:;<>,?~\\]/.test(email)) {
        return { containsInvalidSymbols: true };
      }
    }
    return null;
  }

  passwordMatchValidator(control: FormGroup): { [key: string]: any } | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        if (confirmPasswordControl.hasError('passwordMismatch')) {
          confirmPasswordControl.setErrors(null);
        }
      }

      if (!confirmPasswordControl?.value) {
        confirmPasswordControl.setErrors({ required: true });
      }
    }
    return null;
  }   



onPaste(event: ClipboardEvent): void {
  event.preventDefault(); 
}

// Existing code...


onImageSelected(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    this.uploadImage(file);
  }
}


// Existing code...

openImageInput() {
  const inputElement = document.getElementById('imageInput') as HTMLInputElement;
  if (inputElement) {
    inputElement.click();
  }
}
getMinimumStartDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
}
