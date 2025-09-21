import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  data: any = null;
  loading = false;

  constructor( private router: Router) {}

  ngOnInit() {
    
  }
  logout() {
    this.router.navigate(['/login']);
  }
  profile() {
    this.router.navigate(['/profile']);
  }
 

  
}