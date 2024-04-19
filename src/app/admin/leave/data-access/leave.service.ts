import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  apiURL = environment.apiURLserver;
  readonly LeaveRequestsAPIUrl = this.apiURL + "leaveRequestAPI.php";

  constructor(private http: HttpClient) { }

  getAllLeaveRequests() {
    return this.http.get<any[]>(this.LeaveRequestsAPIUrl);
  }

  getAllLeaveRequestsByID(employee_id: any) {
    const url = `${this.LeaveRequestsAPIUrl}?employee_id=${employee_id}`;
    return this.http.get<any[]>(url);
  }

  getAllLeaveRequestsCount(): Observable<number> {
    const endpoint = `${this.LeaveRequestsAPIUrl}`;

    return this.http.get<any[]>(endpoint).pipe(
      map((leaveRequests: any) => {
        return leaveRequests.length;
      })
    );
  }

  deleteLeaveRequest(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    const url = this.LeaveRequestsAPIUrl;
    const data = { id: val };

    this.http.delete(url, { body: data }).subscribe(
      (response) => {
        const responseBody = response as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      },
      (error) => {
        errorCallback(error);
      }
    );
  }

  createLeaveRequest(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    const data = {
      employee_id: val.employee_id,
      leave_type: val.leave_type,
      start_date: val.start_date,
      end_date: val.end_date,
      reason: val.reason,
      leave_category: val.leave_category
    };

    this.http.post(this.LeaveRequestsAPIUrl, data, { observe: 'response' }).subscribe(
      (response) => {
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      },
      (error) => {
        errorCallback(error);
      }
    );
  }

  updateLeaveRequest(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.LeaveRequestsAPIUrl, data, { observe: 'response' }).subscribe(
      (response) => {
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      },
      (error) => {
        errorCallback(error);
      }
    );
  }
}
