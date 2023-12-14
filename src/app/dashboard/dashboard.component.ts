import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userName = "userName";
  public nextAppointment: any;
  public laterAppointments: any;
  public olderAppointments: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.http.get(`${environment.baseURL}/getAppointments`).subscribe({
      next: (res) => {
        this.nextAppointment = this.getNextAppointment(res);
        this.laterAppointments = this.getLaterAppointments(res);
        this.olderAppointments = this.getOlderAppointments(res);
      },
      error: (error) => {
        alert('Error occurred while uploading avatar');
      },
    });
  }

  public deleteAppointment(appointment: any) {
    this.http.delete(`${environment.baseURL}/deleteAppointment/${appointment._id}`).subscribe({
      next: (res) => {
        this.getAppointments();
      },
      error: (error) => {
        alert('Error occurred while uploading avatar');
      },
    });
  }

  navigateToNewPage() {
    this.router.navigate(['booking']);
  }

  getNextAppointment(appointments: any) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let closestAppointment = null;
    let closestTimeDifference = Number.MAX_SAFE_INTEGER;

    appointments.forEach((appointment: any) => {
      const appointmentDate = new Date(appointment.date);
      const timeDifference = appointmentDate.getTime() - currentDate.getTime();

      if (timeDifference > 0 && timeDifference < closestTimeDifference) {
        closestTimeDifference = timeDifference;
        closestAppointment = appointment;
      }
    });
    console.log(closestAppointment);
    return closestAppointment;
  }

  getLaterAppointments(appointments: any) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    return appointments.filter((appointment: any) => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0, 0, 0, 0); // Set appointment time to midnight

      return appointmentDate > currentDate;
    });
  }

  getOlderAppointments(appointments: any) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    return appointments.filter((appointment: any) => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0, 0, 0, 0); // Set appointment time to midnight

      return appointmentDate < currentDate;
    });
  }

  formatNiceDate(date: any) {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // console.log(date);
    return new Date(date).toLocaleDateString('en-US', options);
  }

  navigateToInsurance() {
    this.router.navigate(["insurance"]);
  }
}
