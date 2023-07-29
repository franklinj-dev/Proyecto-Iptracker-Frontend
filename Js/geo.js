const ip = document.getElementById('ip');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const locationip = document.getElementById('location');
let mapContenedor = document.getElementById('map-container');
const modal = document.querySelector(".modal");
const svg = document.querySelector(".o");

const inputIP = document.getElementById('input-ip');
const btnIP = document.getElementById('btnIP');



let iconMark;
let marker;


    let map = L.map('map').setView([51.505, -0.09],15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);
    

                    iconMark = L.icon({

                    iconUrl: 'img/icon-location.svg',

                    });
                    
marker = L.marker([51.505, -0.09], {icon: iconMark}).addTo(map)


function ValidateIPaddress(event)
 {
    let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 
 if(inputIP.value.match(ipformat))
 {

        if(map){
            map.remove(map);
            map.removeLayer(marker);
            ip.innerText = "";
            locationip.innerText = "";
            timezone.innerText = "";
            isp.innerText = "";
            console.log(map)
        }
        
     
        
        const geoAPI = async (url) => {
            modal.style.display = "block";
            svg.style.animationPlayState = "running";
            const dataGEO = await fetch(url);
            const resultData = await dataGEO.json();
            return resultData;
        }
    
        geoAPI(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6CiMNDVUqOpe3xp0K9w0tJ2XQkMis&ipAddress=${inputIP.value}`)
            .then((res) => {
            
                modal.style.display = "none";
                svg.style.animationPlayState = "paused";
                ip.innerText = res.ip;
                locationip.innerText = res.location.city;
                timezone.innerText = res.location.timezone;
                isp.innerText = res.isp;
            
    
                map = L.map('map').setView([res.location.lat, res.location.lng], 13);
                
                iconMark = L.icon({
                     iconUrl: 'img/icon-location.svg',
                });
    
                marker = L.marker([res.location.lat, res.location.lng], {icon: iconMark}).addTo(map)
    
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                console.log(map)
            })
            .catch((err) => console.log(err));
    

    return;

 }else{
        alert("You have entered an invalid IP address!");
        return false;
      }

 

 }

btnIP.addEventListener('click',ValidateIPaddress);