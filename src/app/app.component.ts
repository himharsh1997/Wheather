import { Component } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Whether';

ngAfterViewInit(){

  this.getvalues();
}
   getvalues = ()=>{

     if(new Date().getHours() < 5 || new Date().getHours() > 18)
     {
       (document.getElementById('day_night') as HTMLImageElement).src = '../assets/night2.jpeg';
     }
     else{
       (document.getElementById('day_night') as HTMLImageElement).src = '../assets/day.jpeg';
     }
    navigator.geolocation.getCurrentPosition(this.printvalue);
  }
  printvalue = (position)=>{
//document.getElementById('pri').innerHTML = position.coords.latitude + "  " + position.coords.longitude;
console.log(position)
$.ajax({
  type:'GET',
  url: 'https://geocoder.tilehosting.com/r/'+ position.coords.longitude+'/'+position.coords.latitude+'.js?key=jgCKJ4loM3WvBhmSK5zc',
  success: function(data) {
  document.getElementById('location').innerHTML =  data.results[0].display_name
      },
  error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status);
      },
 dataType: 'json'
});

$.ajax({
  type:'GET',
  url : 'https://api.openweathermap.org/data/2.5/weather/?lat='+position.coords.latitude +'&lon='+position.coords.longitude+'&APPID=b2b5902633a15cacaa50df2585d7c4f2',
  success: function(data) {

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    (document.getElementById('imgaicon') as HTMLImageElement).src = 'http://openweathermap.org/img/w/'+ (data.weather)[0].icon + '.png';
    document.getElementById('temp').innerHTML =  (data.main.temp - 274.15).toFixed(0);
    document.getElementById('w_status').innerHTML = data.weather[0].main;
    document.getElementById('speed').innerHTML = 'Wind: ' + data.wind.speed + " km/hr";

    var d = new Date();
    console.log(d.getDate())
    document.getElementById('date_today').innerHTML = d.getDate() + " " +  months[d.getMonth()] + "," + d.getFullYear();

     console.log(data);
      },
  error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.status);
      },
 dataType: 'jsonp'
});

}

callby_user = ()=>{
  $.ajax({
    type:'GET',
    url : 'https://api.openweathermap.org/data/2.5/weather/?q=' + ((document.getElementById("city_name") as HTMLInputElement).value.toString())  +','+  (document.getElementById("country_name") as HTMLInputElement ).value.toString() +'&APPID=b2b5902633a15cacaa50df2585d7c4f2',
    success: function(data) {
console.log(data);

  document.getElementById('t_text').innerHTML =  "    "  +  (data.main.temp - 274.15).toFixed(0);
  document.getElementById('we_text').innerHTML = "    "  +   data.weather[0].description;
  document.getElementById('wi_text').innerHTML = "    "  +   data.wind.speed + " km/hr"
  document.getElementById('ai_text').innerHTML = "    "  +   data.main.pressure;
  document.getElementById("result").style.display = "block";
  document.getElementById("result").style.opacity = "0.4";
  document.getElementById("result").style.opacity = "1";
  document.getElementById('not_found').style.display = 'none';

        },
    error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
              document.getElementById('not_found').style.display = 'block';
  document.getElementById("result").style.display = "none";
        },
   dataType: 'jsonp'
  });


}

}
//  url: 'https://api.openweathermap.org/data/2.5/weather/?lat='+position.coords.latitude +'&lon='+position.coords.longitude+'&APPID=b2b5902633a15cacaa50df2585d7c4f2
  //  document.getElementById('location').innerHTML = data.name + this.loca.results[0].alternative_names ;
