import { Component, OnInit } from '@angular/core';
import { data } from '../../../assets/counties';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-risk-form',
  templateUrl: './risk-form.component.html',
  styleUrls: ['./risk-form.component.scss']
})
export class RiskFormComponent implements OnInit {

	sex: string = 'Select';
  county: string;
  age: number;
  medCondition: string;
	counties: string[] = data;
  countiesMatch: string[] = [];
  enter: boolean = true;
  percentage;

  constructor(private http: HttpClient) {
    $(document).ready(() => {
      const searchGroup = $('#county');
      $(window).click(() => {
        $('#county-dropdown').hide();
      });
      searchGroup.click((event) => {
        event.stopPropagation();
        $('#county-dropdown').show();
      });
    });
  }

  ngOnInit() {
  }

  assignGender(val) {
  	if (val == 1) {
      return this.sex = 'Male';
    }
  	this.sex = 'Female';
  }

  monitorSearch() {
    const dropdown = $('#county-dropdown');
    dropdown.show();
    if (this.county != '') {
      this.county = this.county.toLowerCase();
      this.enter = false;
      this.countiesMatch = [];
      for (const x in this.counties) {
        const county = this.counties[x].toLowerCase();
        if ((county.includes(this.county) && this.county.length > 1) || (county.substring(0,1) == this.county)) this.countiesMatch.push(this.counties[x]);
      }
      if (!this.countiesMatch[0]) this.countiesMatch = null;
    } else {
      this.countiesMatch = [];
      this.enter = true;
    }
  }

  selectCounty(county) {
    this.county = county;
  }

  condition(num) {
    const hasClass = $(`#${num}`).hasClass('clicked');
    $('th').removeClass('clicked');
    if (hasClass) {
      $(`#${num}`).removeClass('clicked');
      this.medCondition = null;
    } else {
      $(`#${num}`).addClass('clicked');
      switch(num) {
        case(0) :
          this.medCondition = 'cardiovascular';
          break;
        case(1) :
          this.medCondition = 'diabetes';
        case(2) :
          this.medCondition = 'chronic_resp';
          break;
        case(3) :
          this.medCondition = 'hypertension';
          break;
        case(4) :
          this.medCondition = 'cancer';
      }
    }

  }

  calculate() {
    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:5000/user_info?age=${this.age}&sex=${this.sex.toLowerCase()}&condition=${this.medCondition ? this.medCondition : 'none'}&county_state=${this.county}`,
    }).done((data) => {
      this.percentage = `${data.toFixed(2)*100}%`;
    });
  }

}
