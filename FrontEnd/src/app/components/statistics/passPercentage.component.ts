import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pass-percentage',
  styles: [`
    `],
  template: `<div *ngIf="dataSet.length > 0 " echarts [options]="options" class="demo-chart"></div>`
})

export class PassPercentageComponent implements OnChanges {
  @Input()
  public dataSet: number[] = [];
  @Input()
  public minPassing!: number;
  public options: any;
  constructor() { }

  public ngOnChanges() {
    if (this.dataSet.length > 1) {
      this.graphData();
    }
  }

  private graphData() {
    const numberPassed = this.dataSet.filter((currNumber: number) => currNumber >= this.minPassing).length;

    this.options = {
      title: {
        text: "Pass Percentage",
        left: "center"
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Pass or Fail',
          type: 'pie',
          radius: '55%',
          data: [{
            value: numberPassed,
            name: "Passed",
            itemStyle: {
              color: "rgb(120, 194, 173)"
            }
          }, {
            value: this.dataSet.length - numberPassed,
            name: "Failed",
            itemStyle: {
              color: "#FF7851"
            }
          }],
          label: {
            color: 'rgba(0, 0, 0, 0.3)',
            formatter: '{b}: {c}'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => {
              return Math.random() * 200;
          }
        }
      ]
    };
  }
}
