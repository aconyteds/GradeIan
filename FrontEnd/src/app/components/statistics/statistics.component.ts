import { Component, Input, OnChanges } from '@angular/core';

import { Student, AssignmentItem, Grade } from "../../interfaces";

import * as helpers from "../../utilities/helpers";

@Component({
  selector: 'app-statistics',
  styles: [`
    .stats-list li label {
      width: 50%;
      text-align: right;
      padding-right: 1rem;
      font-weight: bold;
      margin:0;
    }

    .tab-content {
      border:1px solid #eceeef;
      border-top-width: 0;
    }
    `],
  templateUrl: "./statistics.template.html"
})

export class StatisticsComponent implements OnChanges {
  @Input()
  public grades: number[] = [];
  @Input()
  public minPassing!: number;
  public sortedGrades: number[];
  public mean!: number;
  public median!: number;
  public mode!: number[];
  public range!: number[];
  public standardDeviation!: number;
  public passPercentage!: number;
  public selectedChart = "bell-curve";
  constructor(
  ) { }

  public ngOnChanges() {
    this.calculateBasics();
  }

  private calculateBasics() {
    const grades = this.grades.sort((a, b) => a - b);
    this.sortedGrades = grades;
    this.mean = this.getMean(grades);
    this.median = this.getMedian(grades);
    this.mode = this.getMode(grades);
    this.range = [grades[0], grades[grades.length - 1]];
    this.standardDeviation = this.calculateStandardDeviation(grades);
    this.passPercentage = (grades.filter((currGrade: number) => currGrade >= this.minPassing).length / grades.length) * 100;
  }

  private calculateStandardDeviation(numbers: number[]): number {
    const meanDistances = numbers.map((grade: number) => {
      return Math.pow((grade - this.mean), 2);
    });

    return Math.sqrt(meanDistances.reduce((currSum, currDistance) => currSum + currDistance, 0) / meanDistances.length);
  }

  private getMean(numbers: number[]): number {
    return numbers.reduce((currSum, currNumber) => currSum + currNumber, 0) / numbers.length;
  }

  private getMedian(numbers: number[]): number {
    let median: number;
    if (numbers.length % 2 === 0) {
      // Is Even
      median = (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
    } else {
      median = numbers[(numbers.length - 1) / 2];
    }

    return median;
  }

  private getMode(numbers: number[]): number[] {
    const modes = [];
    const count = [];
    let maxIndex = 0;

    numbers.forEach((currNumber: number) => {
      count[currNumber] = (count[currNumber] || 0) + 1;
      if (count[currNumber] > maxIndex) {
        maxIndex = count[currNumber];
      }
    });

    for (const key in count) {
      if (count.hasOwnProperty(key)) {
        if (count[key] === maxIndex) {
          modes.push(Number(key));
        }
      }
    }

    return modes;
  }

  public selectChart(newSelection: string) {
    this.selectedChart = newSelection;
  }

  public displayNumberArray(numbers: number[]): string {
    let returnString = "";
    if (numbers.length < 6) {
      numbers.forEach((currNumber: number, indx: number) => {
        returnString += (indx ? ", " : "") + currNumber.toFixed(2);
      });
    } else {
      returnString = "More than 5 unique values";
    }

    return returnString;
  }
}
