import { Component, OnInit } from '@angular/core';

var url = 'http://newsapi.org/v2/everything?' +
  'q=coronavirus&' +
  'from=2020-05-03&' +
  'sortBy=popularity&' +
  'apiKey=3de170360a534848b3e90f76fd73da15';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  articles;

  constructor() { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // var req = new Request(url);
    // fetch(req)
    //   .then(function (response) {
    //     alert((response.json()));
    //   });
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(this.articles = data['articles']));
  }
}
