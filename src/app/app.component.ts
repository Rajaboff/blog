import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigateByUrl('?page=1&limit=10&filter=A-Z')
  }

}
