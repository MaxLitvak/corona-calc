import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

var url = 'http://newsapi.org/v2/everything?' +
  'q=coronavirus&' +
  'sortBy=popularity&' +
  'apiKey=3de170360a534848b3e90f76fd73da15';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  date = (Date.now());

  articles;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.datePipe.transform(this.date, "yyyy-MM-dd").toString())
    this.fetchData(this.datePipe.transform(this.date, "yyyy-MM-dd").toString());
  }

  fetchData(inputDate) {
    // var req = new Request(url);
    // fetch(req)
    //   .then(function (response) {
    //     alert((response.json()));
    //   });
    fetch(url + "&from=" + inputDate)
      .then(response => response.json())
      .then(data => console.log(this.articles = data['articles']));
  }
}
