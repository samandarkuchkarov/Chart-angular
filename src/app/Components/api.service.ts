import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }
  getWeather() {
   return  this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,current,alerts&appid=60d20bfcc55b429587d513f2dfc4cf3f');

  }
}