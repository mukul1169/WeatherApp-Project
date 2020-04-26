let app_key="fd37ae8a2ca5ff7411827413c75ebf52";
let units="metric";
let search_method;

function getSearchMethod(method)
{
	if(method.length==5 && Number.parseInt(method)+''==method)
		search_method='zip';
	else
		search_method='q';
}
function searchWeather(inputName)
{
	 getSearchMethod(inputName);
     fetch(`http://api.openweathermap.org/data/2.5/weather?${search_method}=${inputName}&appId=${app_key}&units=${units}`).then(result=>{
     	return result.json();
     }).then(result=>{
     	init(result);
     })
}
function init(result)
{
	console.log(result);
	switch(result.weather[0].main)
	{
       case 'Clear':
            document.body.style.backgroundImage=`url("https://openweathermap.org/themes/openweathermap/assets/img/shutterstock_753167914_1.jpg")`;
            break;
       case 'Clouds':
            document.body.style.backgroundImage=`url("https://i.gifer.com/srG.gif")`; 
            break;
       case 'Rain': 
	    document.body.style.backgroundImage=`url("https://33.media.tumblr.com/7a73856ab9301e8e4f27137dcb349219/tumblr_n63plyhz5t1qk9powo1_500.gif")`; 
            break;
       case 'Drizzle':
       case 'Mist':
            document.body.style.backgroundImage=`url("Rainy.jpg")`; 
            break;
       case 'Thunderstorm': 
            document.body.style.backgroundImage=`url("https://media1.tenor.com/images/f9fafb2c30fa57595bf17fd89cf6ae99/tenor.gif?itemid=15027660")`;
            break;
       case 'Snow': 
            document.body.style=`url("https://66.media.tumblr.com/tumblr_m92lu1fvYU1rt04f0o1_400.gifv")`;
            break;
       default: 
            document.body.style.backgroundImage=`url("default.jpg")`;
            break;
	}
	let weatherDesciption=document.getElementById('weather_description_header');
	let humidity=document.getElementById('humidity');
	let temperature=document.getElementById('temperature');
	let windSpeed=document.getElementById('wind_speed');
	let cityHeader=document.getElementById('city_header');
	let icon=document.getElementById('document_icon');

	icon.src=`http://openweathermap.org/img/wn/`+result.weather[0].icon+`.png`;
    let description=result.weather[0].description;
	weatherDesciption.innerText=description.charAt(0).toUpperCase()+description.slice(1);
	temperature.innerHTML=Math.floor(result.main.temp)+ '&#176';
	windSpeed.innerHTML=`Winds at `+Math.floor(result.wind.speed)+` m/s`;
	cityHeader.innerHTML=result.name;
	humidity.innerHTML=`Humidity levels at `+result.main.humidity+`%`;
  setPositionForWeather();
}

function setPositionForWeather()
{
	let weatherContainer=document.getElementById('weather_container');
	let weatherContainerHeight=weatherContainer.clientHeight;
	let weatherContainerWidth=weatherContainer.clientWidth;
	weatherContainer.style.left=`calc(50%-${weatherContainerWidth/2}px)`;
	weatherContainer.style.top=`calc(50%-${weatherContainerHeight/1.3}px)`;
   weatherContainer.style.visibility='visible';
}
document.getElementById('search_button').addEventListener('click',function(){
	let input=document.getElementById('search_input').value;
	if(input)
		searchWeather(input);
})
