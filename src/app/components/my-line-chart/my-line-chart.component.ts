import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Sprint} from '../../models/Sprint';
import {SprintService} from '../../services/sprint/sprint.service';

@Component({
  selector: 'app-burndown',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit {
  @Input()
  sprint: Sprint;
  @Input()
  projectId: string;
  @Input()
  reload: EventEmitter<void>

  public lineChartData: ChartDataSets[] = [
  ];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true, circumference: 0
  };
  public lineChartColors: Color[] = [
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private _sprints: SprintService) {
  }

  async ngOnInit() {
    await this.renderBurndown();
    this.reload.subscribe(async () => await this.renderBurndown())
  }

  async renderBurndown(){
    const data = await this._sprints.getBurnDown(this.projectId, this.sprint.id, this.sprint.startDate.toDate(), this.sprint.endDate.toDate());

    let dates = [];
    let actualLine = {data: [], label: 'Current stories', fill: false, lineTension: 0 };
    let optimalLine = { data: [], label: 'Optimal', fill: false, lineTension: 0  };

    for (let date of data) {
      dates.push(date.date)
      actualLine.data.push(date.open)
      optimalLine.data.push(date.optimal)
    }

    this.lineChartLabels = dates;
    this.lineChartData = [actualLine, optimalLine];

  }
}
