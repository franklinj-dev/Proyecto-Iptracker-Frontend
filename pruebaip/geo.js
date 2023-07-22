const ip = document.getElementById('ip');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');
const locationip = document.getElementById('location');

const inputIP = document.getElementById('input-ip');
const btnIP = document.getElementById('btnIP');

const searchIP = (event) => {
    console.log(event)

    const geoAPI = async (url) => {
        const dataGEO = await fetch(url);
        const resultData = await dataGEO.json();
        return resultData;
    }

    geoAPI(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7YNnrt5gTvVQniS4ncpyp4h3tO9zb&ipAddress=${inputIP.value}`)
        .then((res) => {

            ip.innerText = res.ip;
            locationip.innerText = res.location.city;
            timezone.innerText = res.location.timezone;
            isp.innertext = res.isp;

            let map = L.map('map').setView([res.location.lat, res.location.lng], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        })
        .catch((err) => console.log(err));
}


btnIP.addEventListener('click', searchIP);