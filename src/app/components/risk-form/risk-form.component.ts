import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-form',
  templateUrl: './risk-form.component.html',
  styleUrls: ['./risk-form.component.scss']
})
export class RiskFormComponent implements OnInit {

	gender: string = 'Select';

  constructor() { }

  ngOnInit() {
  }

  assignGender(val) {
  	if (val == 1) return this.gender = 'Male';
  	this.gender = 'Female';
  }

}
