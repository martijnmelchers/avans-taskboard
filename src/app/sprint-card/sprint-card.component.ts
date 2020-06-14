import { Component, Input, OnInit } from '@angular/core';
import { Userstory } from '../models/Userstory';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() item: Userstory;

  constructor() { }

  ngOnInit(): void {
  }

}
