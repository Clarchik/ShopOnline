import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  template: `
    <p>
      empty-data works!
    </p>
  `,
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
