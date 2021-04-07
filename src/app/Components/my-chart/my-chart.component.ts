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
      let tempDay = Response.daily.map((elem: any) => {
        let celsius = elem.temp.day - 273
        return celsius.toFixed(0)
      })
      let tempEvening = Response.daily.map((elem: any) => {
        let celsius = elem.temp.eve - 273
        return celsius.toFixed(0)
      })
      let tempMorn = Response.daily.map((elem: any) => {
        let celsius = elem.temp.morn - 273
        return celsius.toFixed(0)
      })
      let tempNight = Response.daily.map((elem: any) => {
        let celsius = elem.temp.night - 273
        return celsius.toFixed(0)
      })
      console.log(Response)
      const myChart = new Chart('myChart', {
        type: 'line',
        data: {
          labels: date,
          datasets: [{
              label: 'Celsius at day',
              borderColor: 'red',
              data: tempDay,
            },
            {
              label: 'Celsius at evening',
              borderColor: 'blue',
              data: tempEvening,
            },
            {
              label: 'Celsius at morning',
              borderColor: 'green',
              data: tempMorn,
            },
            {
              label: 'Celsius at night',
              borderColor: 'black',
              data: tempNight,
            },

          ]
        },

        options: {
          plugins: {
            legend: {
                labels: {
                   
                    font: {
                        size: 16  
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
