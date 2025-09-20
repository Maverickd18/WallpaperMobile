import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  data: any = null;
  loading = false;

  constructor() {}

  ngOnInit() {
    
  }

 

  
}