import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    particlesJS.load('particles-js', 'particles.json', null);
    $( "#fader" ).fadeTo( "slow" , 0, function() {
      // Animation complete.
    });
  }

}
