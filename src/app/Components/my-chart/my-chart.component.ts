import {
  WeatherService
} from './../api.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'node_modules/chart.js';


Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  constructor(private configService: WeatherService) {}

  ngOnInit(): void {
    this.configService.getWeather().subscribe((Response: any) => {
      let date = Response.daily.map((elem: any) => {
        let time = new Date(elem.dt * 1000);
        return `${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`
      })
      let temp = Response.daily.map((elem: any) => {
        let celsius = elem.temp.day - 273
        return celsius.toFixed(0)
      })
      console.log(temp.length)
      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: date,
          datasets: [{
              label: 'weather',
              borderColor: 'red',
              data: temp,
            },

          ]
        },

        options: {
          plugins: {
            legend: {
                labels: {
                   
                    font: {
                        size: 18  
                    }
                }
            }
        },
          scales: {
            yAxes: 
              {
                  ticks: {
                      callback: function (value) {
                          return value + "°";
                      }
                  }
              }
          }
        }
      })
    });
  }
}
