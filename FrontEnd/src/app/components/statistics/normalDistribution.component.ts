import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-normal-distribution',
  styles: [`
    `],
  template: `
  <div *ngIf="dataSet.length > 0 && !!standardDeviation" echarts [options]="options" class="demo-chart"></div>
  <div *ngIf="!standardDeviation" class="jumbotron">
    <h3>Cannot display distribution with a Standard Deviation of 0</h3>
  </div>
  `
})

export class NormalDistributionComponent implements OnChanges {
  @Input()
  public dataSet: number[] = [];
  @Input()
  public mean!: number;
  @Input()
  public standardDeviation!: number;
  @Input()
  public minPassing!: number;
  public options: any;
  constructor() {}

  public ngOnChanges() {
      if (!!this.standardDeviation) {
        this.graphData();
      }
  }

  private graphData() {
    const xAxisData = [];
    const expectedValues = [];
    const actualValues = [];
    for (let i = 0; i <= 100; i++) {
      xAxisData.push(i);
      actualValues.push(this.getNormalDistribution(i, this.mean, this.standardDeviation));
      const passingMidPoint = this.minPassing + ((100 - this.minPassing) / 2);
      expectedValues.push(this.getNormalDistribution(i, passingMidPoint, passingMidPoint * .34));
    }

    const standardDeviationMarkers = [];
    const displayPieces = [];
    standardDeviationMarkers.push({
      xAxis: this.mean,
      lineStyle: {
        color: 'black',
        width: 3
      },
      displayLabel: "Class Average"
    });
    standardDeviationMarkers.push({
      xAxis: this.minPassing,
      lineStyle: {
        color: "#FF7851 "
      },
      displayLabel: "Min Passing Grade"
    });
    for (let x = 1; x < 5; x++) {
      // Create Markers for the Standard Deviation
      standardDeviationMarkers.push({
        xAxis: this.mean - (x * this.standardDeviation),
        lineStyle: {
          color: "orange"
        },
        displayLabel: "-" + x + " Standard Deviation"
      });
      standardDeviationMarkers.push({
        xAxis: this.mean + (x * this.standardDeviation),
        lineStyle: {
          color: "green"
        },
        displayLabel: "+" + x + " Standard Deviation"
      });
      // Create different shaded areas do display under the curve
      displayPieces.push({
        gt: this.mean - (x * this.standardDeviation),
        lt: this.mean - ((x - 1) * this.standardDeviation),
        color: "rgba(120, 194, 173, " + ((5 - x) * .25) + ")"
      });
      displayPieces.push({
        gt: this.mean + ((x - 1) * this.standardDeviation),
        lt: this.mean + (x * this.standardDeviation),
        color: "rgba(120, 194, 173, " + ((5 - x) * .25) + ")"
      });
    }

    this.options = {
      title: {
        text: "Bell Curve"
      },
      legend: {
        data: ['Actual Distribution', 'Ideal Trend'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        }
      },
      yAxis: {},
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: displayPieces
      },
      series: [
        {
          name: 'Actual Distribution',
          type: 'line',
          smooth: .6,
          symbol: "none",
          color: "rgb(120, 194, 173)",
          data: actualValues,
          animationDelay: (idx: number) => idx * 10,
          markLine: {
            symbol: ['none', 'none'],
            label: {show: false},
            tooltip: {
              formatter: (item: any) => {
                return item.data.displayLabel + " (" + item.data.value + ")";
              }
            },
            data: standardDeviationMarkers
          },
          areaStyle: {}
        },
        {
          name: 'Ideal Trend',
          type: 'line',
          smooth: .6,
          symbol: "none",
          data: expectedValues,
          animationDelay: (idx: number) => idx * 10,
          color: "black"
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  public getNormalDistribution(x: number, mean: number, standardDeviation: number): number {
    const data1 = Math.pow(((x - mean) / standardDeviation), 2) * -.5;
    const data2 = Math.pow(Math.E, data1);
    const data3 = 1 / (standardDeviation * Math.sqrt(2 * Math.PI));
    return data2 * data3;
  }
}
