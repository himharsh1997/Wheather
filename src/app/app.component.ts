import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Whether';

  getvalues = ()=>{
    navigator.geolocation.getCurrentPosition(this.printvalue);

  }
  printvalue = (position)=>{
//document.getElementById('pri').innerHTML = position.coords.latitude + "  " + position.coords.longitude;


$.ajax({
  type:'GET',
  url: 'https://geocoder.tilehosting.com/r/'+ position.coords.longitude+'/'+position.coords.latitude+'.js?key=jgCKJ4loM3WvBhmSK5zc',
  success: function(data) {
  //  document.getElementById('pri').innerHTML = JSON.stringify(data);
    console.log(data);
      },
  error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status);
      },
 dataType: 'json'
});

$.ajax({
  type:'GET',
  url: 'https://api.openweathermap.org/data/2.5/weather/?lat='+position.coords.latitude +'&lon='+position.coords.longitude+'&APPID=b2b5902633a15cacaa50df2585d7c4f2'
  ,
  success: function(data) {

    document.getElementById('pri').innerHTML = "Your Location: "+ JSON.stringify(data.name) + "    and Wheather:" + (data.weather)[0].description;
    document.getElementById('imgicon').src = 'http://openweathermap.org/img/w/'+ (data.weather)[0].icon + '.png';
    document.getElementById('temp').innerHTML = " :  " + (data.main.temp - 274.15).toFixed(2);
    console.log(data);
      },
  error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status);
      },
 dataType: 'json'
});

}

}
