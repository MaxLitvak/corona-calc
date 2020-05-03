import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  scroll() {
    this.router.navigate(['']);
    $(document).ready(() => {
      $([document.documentElement, document.body]).animate({
        scrollTop: $('#form').offset().top
      }, 0);
    });
  	
  }

}
