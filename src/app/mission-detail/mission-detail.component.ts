import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.scss']
})
export class MissionDetailComponent implements OnInit {

  @Input() mission;

  constructor() { }

  ngOnInit() {
  }

}
