import { AfterViewInit,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { ProjectService } from 'src/app/admin/project/data-access/project.service';
import { Subscription,timer} from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';
import { Plugins } from '@capacitor/core';
import { PushNotification, PushNotifications } from '@capacitor/push-notifications';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  isMenuButtonVisible = true; 
  departmentCount:number=0;
  projectCount:number=0;
  employeeCount:number=0;
  attendanceCount:number=0;
  leaveCount:number=0;

  userRole = '';
  userRoleName = '';
  // chart: Chart<'bar' | 'pie' | 'line', (number | string | null)[]> | null = null;
  deptDynamicData = [20, 35, 45, 15];
  deptLabelData = ['Backend', 'HR', 'Frontend', 'Finance'];
  dynamicData = [20, 35, 45, 15];
  projectStartDynamicData = [20, 35];
  projectEndDynamicData = [45, 15];
  attendanceDynamicData = [20, 35, 45, 15];
  LeaveTypeDynamicData = [20, 35, 45, 15];
  chart: any; 


  private sessionSubscription!: Subscription;
  remainingSessionTime: number = 0;
  sessionTimeout: number = 600 * 60 * 1000; // 30 minutes in milliseconds

  constructor(private notificationService: PushNotificationService,private sessionService: SessionService,private departmentService:DepartmentService, private projectService:ProjectService,private employeeService:EmployeeService,private attendanceService:AttendanceService, private leaveRequestService:LeaveService,private router: Router,private authService:AuthService) {
    this.addListeners();
  }
  
  ngAfterViewInit() {
    // Call chart initialization here
    if (this.authService.getUserRole() === '1') {
      this.initializeChart();
    }
  }
  ngOnInit() {

    this.disableBrowserBack();
    
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;

      this.userRole = userRole;

      if(userRole === '1'){
        this.userRoleName = 'Super Admin';
        this.initializeChart();
      }
      else if(userRole === '2'){
        this.userRoleName = 'Admin';
      }
      else if(userRole === '3')
      {
        this.userRoleName = 'Manager';
      }
      else if(userRole === '4')
      {
        this.userRoleName = 'Developer';
      }
      else{
        this.userRoleName = 'Employee';
      }
    }

    
   this.FatchData();

   // Subscribe to the session timer
   this.sessionSubscription = timer(0, 1000).subscribe(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.sessionService.getLastActivityTimestamp();
    this.remainingSessionTime = Math.max(0, this.sessionTimeout - elapsedTime);

    // Check if the remaining session time is zero, and perform logout if needed
    if (this.remainingSessionTime === 0) {
      this.logout();
    }
  });
  }

  
  disableBrowserBack(): void {
    history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      history.pushState(null, document.title, window.location.href);
    });
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.FatchData();
      event.target.complete();
    }, 2000);
  }

  FatchData(){
     // Fetch data from the service and update counts
     this.departmentService.getDepartmentCount().subscribe((count) => {
      this.departmentCount = count;
    });

    this.projectService.getProjectCount().subscribe((count) => {
      this.projectCount = count;
    });

    this.employeeService.getEmployeeCount().subscribe((count) => {
      this.employeeCount = count;
    });

    this.attendanceService.getAttendanceCount().subscribe((count) => {
      this.attendanceCount = count;
    });

    this.leaveRequestService.getAllLeaveRequestsCount().subscribe((count) => {
      this.leaveCount = count;
    });
  }


  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // Unsubscribe from the session timer when the component is destroyed
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  // Triggered when user interacts with the dashboard
  onUserActivity() {
    // Reset the session timer
    this.sessionService.resetSessionTimer();
  }

  // Format the remaining time as HH:MM:SS
  // formatTime(milliseconds: number): string {
  //   const totalSeconds = Math.floor(milliseconds / 1000);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;
    
  //   const formattedHours = this.padZero(hours);
  //   const formattedMinutes = this.padZero(minutes);
  //   const formattedSeconds = this.padZero(seconds);

  //   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  // }

  // Add a zero padding function for single digits
  // padZero(num: number): string {
  //   return num < 10 ? `0${num}' : num.toString();
  // }

  addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received: ', notification);
      // Handle received push notifications here
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      // Handle user actions on push notifications here
    });
  };


  registerPushNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    
    console.log('Permission status:', permStatus);
    
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    
    if (permStatus.receive !== 'granted') {
      console.error('User denied permissions!');
      return;
    }
    
    await PushNotifications.register();
  }
  


  getDeliveredNotifications = async () => {
    try {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    } catch (error) {
      console.error('Error while getting delivered notifications:', error);
    }
  }
  
initializeChart() {
  if (this.authService.getUserRole() !== '1') {
    return; // Exit if user is not Super Admin
  }
    // Initialize chart only if canvas element is available
    const canvasElement = document.getElementById('dep') as HTMLCanvasElement;
    if (canvasElement) {
      // Initialize chart here
this.chart = new Chart('dep', {
      type: 'bar',
      data:  {
        labels:  this.deptLabelData,
        datasets: [{
          label: 'Number of Employee',
          data: this.deptDynamicData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      
    });
    this.chart = new Chart('gender', {
      type: 'pie',
      data: {
        labels: [
          'Male',
          'Female',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: this.dynamicData,
          // hoverBackgroundColor: ['lightcoral', 'lightblue', 'lightgreen', 'lightyellow', 'lightsalmon'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          // hoverOffset: 4;
        }]
      }
    });
    
    this.chart = new Chart('project', {
      type: 'bar',
      data:  {
        labels:  ['Attendance Management','Car Management'],
        datasets: [{
          label: 'Start Date',
          data:this.projectStartDynamicData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        },
        {
          // labels:  ['05-01-23', '15-03-23', '19-09-23', '17-11-23'],
          label: 'End Date',
          data: this.projectEndDynamicData,
          backgroundColor: [
            'red',
            'orange',
            'yellow',
            'green',
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
            // 'rgba(255, 205, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'red',
            'orange',
            'yellow',
            'green',
          ],
          borderWidth: 1
        }
      ]
      },
    });

    this.chart = new Chart('attendance', {
      type: 'line',
      data:  {
        labels:  ['Mon', 'Tue', 'Wed', 'Thu','Fri','Sat'],
        datasets: [{
          label: 'Number of Employee',
          data: this.attendanceDynamicData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
    });

    this.chart = new Chart('leave_type', {
      type: 'pie',
      data: {
        labels: [
          'Vacation',
          'Sick',
          'Personal',
          'Unpaid',
        ],
        datasets: [{
          label: 'My First Dataset',
          data:this.LeaveTypeDynamicData,
          backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
          ],
          // hoverOffset: 4;
        }]
      }
    });
    } else {
      console.error('Canvas element not found!');
    }
  }
 

  updateChartData(newData: number[]) {
    if (this.chart) {
      this.chart.data.datasets[0].data = newData;
      this.chart.update();
    }
  }

}
