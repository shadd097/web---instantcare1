import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core"
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  public appointmentForm = new FormGroup({
    date: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createAppointment() {
    if (!this.appointmentForm.valid) {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
      });
      return;
    }
    const appointmentData = {
      date: new Date(this.appointmentForm.value.date as string)?.toISOString(),
      type: this.appointmentForm.value.type,
    }

    this.http.post(`${environment.baseURL}/createAppointment`, appointmentData).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard']);
        this.snackBar.open('Appointment Creation was Successful.', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        alert('Error occurred while creating appointment');
      },
    });

  }

}
