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

  constructor(
    private router: Router,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.http.get(`${environment.baseURL}/getAppointments`).subscribe({
      next: (res) => {
        // console.log("WHATT");
        // console.log(res);
        // this.router.navigate(['/']);
        console.log(res);
      },
      error: (error) => {
        alert('Error occurred while uploading avatar');
      },
    });  }

  navigateToNewPage() {
    this.router.navigate(['booking']);
  }

}
