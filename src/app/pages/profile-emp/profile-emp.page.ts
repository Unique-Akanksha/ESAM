import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
import * as CapacitorCore from '@capacitor/core';


@Component({
  selector: 'app-profile-emp',
  templateUrl: './profile-emp.page.html',
  styleUrls: ['./profile-emp.page.scss'],
})
export class ProfileEmpPage implements OnInit {
  employee_id!: number;
  userRole = '';
  // userRoleName = '';
  dob: string = '';
  first_name : string ='';
  middle_name : string ='';
  last_name : string ='';
  email : string ='';
  hire_date : string = '';
  gender: string = '';
  department : string = '';
  role : string = '';
  position : string = '';
  userPhoto : string = '';
  employee: any;
  EmpList:any=[];
  formattedDate: string = '';
  constructor(private router: Router, private employeeService: EmployeeService) { }
  
 
  ngOnInit() {
     // code for get user role 
     const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       this.employee_id=user.employee_id;
       this.first_name = user.first_name;
       this.middle_name = user.middle_name;
       this.last_name = user.last_name;
       this.email = user.email;
       this.hire_date = user.hire_date;
       this.dob = user.dob;
       this.gender = user.gender;
       this.department = user.department;
       this.position = user.position;
       this.userPhoto = user.userPhoto;
       const employeeId =this.employee_id; // Replace with the actual employee ID
       this.getEmployeeDetailsById(employeeId);

      //  if(user.role === '1'){
      //   this.role = 'Super Admin';
      //  }
      //  else if(user.role === '5'){
      //   this.role = 'Employee'
      //  }
      //  else if(user.role === '2'){}
      //  else if(user.role === '2'){}
      //  else if(user.role === '2'){}
      //  else if(user.role === '2'){}
     }
  }

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  // getEmployeeDetailsById(employeeId: number) {
  //   this.employeeService.getEmpByID(employeeId).subscribe(
  //     (employee) => {
  //       console.log('Employee Details:', employee);
  //       this.EmpList = employee;
  //       this.dob = employee.dob; // Store dob value
  //       console.log(this.EmpList)
  //     },
  //     (error) => {
  //       console.error('Error fetching employee details:', error);
  //     }
  //   );
  // }
  
  getEmployeeDetailsById(employeeId: number) {
    this.employeeService.getEmpByID(employeeId).subscribe(
      (employees: any[]) => {
        const employee = employees.find(emp => emp.employee_id === employeeId); // Finding employee by employeeId
        if (employee) {
          console.log('Employee Details:', employee);
          this.dob = employee.dob; // Assign dob to a class property
          this.gender = employee.gender;
          this.role = employee.role;
          const date = new Date(this.dob);
          this.formattedDate = this.formatDate(date);
        } else {
          console.log('No employee found');
        }
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
  
  formatDate(date: Date): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];

    return `${day} ${month}`;
  }


//   async downloadAndSaveImage() {
//     const filename = 'uploads/651ac74b29723_TrentBoult.jpg'; // Replace with the actual filename
//     try {
//         const imageBlob = await this.employeeService.getImageFromAPI(filename);
//          // Define the path where you want to save the image in the assets directory
//       const path = 'assets/img/image.jpg';

//       // Write the image data to the assets directory
//       await CapacitorCore.Filesystem.writeFile({
//         path,
//         data: imageBlob,
//         directory: CapacitorCore.FilesystemDirectory.Assets,
//     });

//       console.log('Image downloaded and saved successfully');
//     } catch (error) {
//         console.error('Error downloading and saving image', error);
//     }
// }

}