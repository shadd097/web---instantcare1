import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core"
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  createAppointment() {
    console.log("HELLO");
    const appointmentData = {
      date: "lolool",
      type: "broooo",
    }

    this.http.post(`${environment.baseURL}/createAppointment`, appointmentData).subscribe({
      next: (res) => {
        // console.log("WHATT");
        // console.log(res);
        // this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Error occurred while uploading avatar');
      },
    });

  }

}
