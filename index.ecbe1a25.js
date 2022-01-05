const e=async e=>{try{const t=await fetch(`https://metaweather-api.glitch.me/${e}`);if(!t.ok)throw new Error("Something went wrong");return await t.json()}catch(e){console.log(e)}};class t{async getQueryLocations(t){const a=`/api/location/search/?query=${t}`;return await e(a)}async getWeatherData(t){const a=`/api/location/${t}`;return await e(a)}async getHistoricalWeatherData(t,a){const s=`/api/location/${t}/${a}`;return await e(s)}}class a{static set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.log(e)}}static get(e){try{return JSON.parse(localStorage.getItem(e))}catch(e){console.log(e)}return null}static remove(e){try{localStorage.removeItem(e)}catch(e){console.log(e)}}}class s{setText(e){this.elem.innerText=e}setImage(e){this.elem.src=e}setWindIcon(e){e+=90,this.elem.style.transform=`rotate(${e}deg)`}setDatalistChildren(e){this.elem.innerHTML="",e.forEach((e=>{const t=document.createElement("option");t.value=e.title,t.dataset.woeid=e.woeid,this.elem.append(t)}))}toggleDisplay(){this.elem.style.display="none"===this.elem.style.display?"flex":"none"}reset(){this.elem.value=""}setDay(e){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][((new Date).getDay()+e)%7]}setMonth(){return["January","February","March","April","May","June","July","August","September","October","November","December"][(new Date).getMonth()%12]}static setUpdatedTime(e,t){const a=Date.now()-Date.parse(t);let s=Math.floor(a/1e3%60),r=Math.floor(a/6e4%60),n=Math.floor(a/36e5%24);n=n<10?"0"+n:n,r=r<10?"0"+r:r,s=s<10?"0"+s:s,e.setText(`Updated ${n} hours ${r} minutes ago`)}static setWarsawWeather(e){new s("local-city").setText(e.title);const t=new s("local-date");t.setText(`${t.setDay(0)} ${(new Date).getDate()} ${t.setMonth()}`);new s("local-abbr").setImage(`https://www.metaweather.com/static/img/weather/${e.consolidated_weather[0].weather_state_abbr}.svg`);new s("local-temp").setText(`${parseInt(e.consolidated_weather[0].the_temp,10)}°C`);new s("local-state").setText(`${e.consolidated_weather[0].weather_state_name}`);new s("local-low").setText(`${parseInt(e.consolidated_weather[0].min_temp,10)}°C`);new s("local-high").setText(`${parseInt(e.consolidated_weather[0].max_temp,10)}°C`);new s("local-speed").setText(`${parseInt(e.consolidated_weather[0].wind_speed,10)} mph`)}static setLastWeather(e){new s("home-city").setText(e.title);const t=new s("home-date");t.setText(`${t.setDay(0)} ${(new Date).getDate()} ${t.setMonth()}`);new s("home-temp").setText(`${parseInt(e.consolidated_weather[0].the_temp,10)}°C`);new s("home-min").setText(`${parseInt(e.consolidated_weather[0].min_temp,10)}°C`);new s("home-max").setText(`${parseInt(e.consolidated_weather[0].max_temp,10)}°C`);new s("home-speed").setText(`${parseInt(e.consolidated_weather[0].wind_speed,10)} mph`);const a=new s("home-update-time"),r=e.consolidated_weather[0].created;s.setUpdatedTime(a,r)}setDisplay(e){this.elem.style.display=e}constructor(e){this.elem=document.getElementById(e)}}var r,n,o;o=e=>{new s("daily-city-name").setText(e.title),new s("daily-current-time").setText(e.time.substr(11,5)),new s("daily-abbr").setImage(`https://www.metaweather.com/static/img/weather/${e.consolidated_weather[0].weather_state_abbr}.svg`),new s("daily-temp").setText(`${parseInt(e.consolidated_weather[0].the_temp,10)}°C`),new s("daily-state").setText(e.consolidated_weather[0].weather_state_name),new s("daily-min").setText(`min: ${parseInt(e.consolidated_weather[0].min_temp,10)}°C`),new s("daily-max").setText(`max: ${parseInt(e.consolidated_weather[0].max_temp,10)}°C`),new s("daily-arrow").setWindIcon(e.consolidated_weather[0].wind_direction),new s("daily-wind-speed").setText(`${parseInt(e.consolidated_weather[0].wind_speed,10)} mph`);const t=new s("daily-update");s.setUpdatedTime(t,e.consolidated_weather[0].created);for(let t=1;t<6;t++){const a=new s(`card${t}-abbr`),r=new s(`card${t}-temp`),n=new s(`card${t}-state`),o=new s(`card${t}-wind`),i=new s(`card${t}-arrow`),c=new s(`card${t}-day`);a.setImage(`https://www.metaweather.com/static/img/weather/${e.consolidated_weather[t].weather_state_abbr}.svg`),r.setText(`${parseInt(e.consolidated_weather[t].the_temp,10)}°C`),n.setText(e.consolidated_weather[t].weather_state_name),o.setText(`${parseInt(e.consolidated_weather[t].wind_speed,10)} mph`),i.setWindIcon(e.consolidated_weather[t].wind_direction),c.setText(c.setDay(t))}},(n="setWeatherInfo")in(r=s)?Object.defineProperty(r,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[n]=o;class i{static set(e,t){try{window.sessionStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(e)}}static get(e){try{return JSON.parse(window.sessionStorage.getItem(e))}catch(e){return console.error(e),!1}}}const c=(e,t)=>{if("search"!==e)history.replaceState(null,null,"/");else{var a;const s=new URLSearchParams({action:e,...t});t.id!==(null===(a=history.state)||void 0===a?void 0:a.woeid)&&history.pushState({woeid:t.id},null,`?${s.toString()}`)}l()},l=async()=>{const e=new t,r=new s("home-view"),n=new s("search-view"),o=new s("last-weather-info"),c=new s("page-loadingSpinner"),l=new URLSearchParams(window.location.search),d=l.get("id");if("search"!==l.get("action"))a.get("lastWeather")?(s.setLastWeather(a.get("lastWeather")),o.setDisplay("flex")):o.setDisplay("none"),r.setDisplay("flex"),n.setDisplay("none");else{let t,o;c.setDisplay("flex"),i.get(d)?t=i.get(d):(t=await e.getWeatherData(d),i.set(d,t)),a.set("lastWeather",t),i.get(523920)?o=i.get(523920):(o=await e.getWeatherData(523920),i.set(523920,o)),setTimeout((()=>{s.setWeatherInfo(t),s.setWarsawWeather(o),c.setDisplay("none"),r.setDisplay("none"),n.setDisplay("flex")}),500)}},d="standby",w="error",h="ready",m="loading",u="reload",y=(e,t)=>{switch([...e.querySelector(".search-icon-container").children].forEach((e=>{e.classList.remove("active")})),t){case"standby":e.querySelector(".fa-search").classList.add("active");break;case"loading":e.querySelector(".lds-spinner").classList.add("active");break;case"error":e.querySelector(".fa-exclamation").classList.add("active");break;case"ready":e.querySelector(".fa-check").classList.add("active");break;case"reload":e.querySelector(".fa-redo").classList.add("active");break;default:console.log("unexpected input")}},p=(e,t)=>{let a;return function(...s){clearTimeout(a),a=setTimeout((()=>{clearTimeout(a),e(...s)}),t)}};let g=d;const _=new t,f=async e=>{const t=e.target,a=e.target.closest("form"),r=a.querySelector(".search-info-container p");if(r.innerText="",!e.target.value)return g=d,void y(a,g);g=m,y(a,g);try{const n=await _.getQueryLocations(e.target.value);if(n.length<1)return console.log("No locations found"),g=w,y(a,g),void(r.innerText="No results");new s("results").setDatalistChildren(n),((e,t)=>{const a=e.find((({title:e})=>e.toLowerCase()===t.value.toLowerCase()));return!!a&&(t.dataset.currentWoeid=a.woeid,t.dataset.currentCity=a.title,!0)})(n,t)?(g=h,y(a,g)):(g=d,y(a,g))}catch(e){g=u,y(a,g),r.innerText="Try again"}},x=e=>{const t=e.target.closest("form"),a=t.querySelector("input"),s=t.querySelector(".search-info-container p");a.value="",g=d,y(t,g),s.innerText=""},T=e=>{e.target.closest("form").querySelector(".search-info-container p").innerText="";const t=new s("home-input"),a=new s("daily-input"),r=document.querySelector(".home-search-bar"),n=document.querySelector(".daily-search-bar");t.reset(),a.reset(),g=d,y(r,g),y(n,g),c("",{})},$=(new t,document.querySelector(".home-search-bar")),v=document.querySelector(".daily-search-bar"),b=new s("home-input"),S=new s("daily-input"),D=document.querySelectorAll(".fa-times"),I=document.querySelectorAll(".fa-redo");function L(e){if(e.preventDefault(),g!==h)return;let t=this.getElementsByTagName("input")[0];t.dataset.currentWoeid&&t.dataset.currentCity&&(t.disabled=!0,c("search",{id:t.dataset.currentWoeid,title:t.dataset.currentCity}),t.disabled=!1,setTimeout((()=>t.focus()),750))}new s("search-view").toggleDisplay(),y($,g),b.elem.addEventListener("input",p(f,1e3)),$.addEventListener("submit",L),S.elem.addEventListener("input",p(f,1e3)),v.addEventListener("submit",L),D.forEach((e=>{e.addEventListener("click",x)})),I.forEach((e=>{e.addEventListener("click",T)})),window.addEventListener("popstate",l),document.addEventListener("DOMContentLoaded",(()=>l()));
//# sourceMappingURL=index.ecbe1a25.js.map