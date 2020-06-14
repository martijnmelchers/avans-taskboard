import {Component, Input, OnInit} from '@angular/core';
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

  public lineChartData: ChartDataSets[] = [
  ];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor:["#FF7360"]
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private _sprints: SprintService) {
  }

  async ngOnInit() {
    await this.generateBurndown();
  }

  async generateBurndown(){
    const daysOfYear = [];
    for (const d = this.sprint.startDate.toDate(); d <= this.sprint.endDate.toDate(); d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d).toDateString());
    }
    const data = await this._sprints.getBurnDown(this.projectId, this.sprint.id);
    let series = {data: [], label: 'Zooi'};

    for(const dataItem in data) {
      series.data.push(data[dataItem]);
    }
    this.lineChartLabels = daysOfYear;
    this.lineChartData = [series];

  }
}
