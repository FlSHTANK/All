const apiKey = '4699f8846915533b92f72f99f4d8f775';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityCoordinates = {
    "Thailand": { lat: 15.34987180917676, lon: 101.62252736113984 },
    "Austria": { lat: -25.021470367099653, lon: 134.63588610882871 },
    "Greenland": { lat: 66.91555529944807, lon: -47.49837670608905 },
    "Italy": { lat: 43.02011412582067, lon: 12.444824663297817 },
    "Germany": { lat: 51.05123887409896, lon: 10.275025733015198 }
};

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('กรุณาเลือกเมือง');
        return;
    }

    const { lat, lon } = cityCoordinates[city];
    
    try {
        
        const weatherResponse = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        
        if (weatherData.cod !== 200) {
            document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${weatherData.message}`;
            return;
        }

        const { main, wind } = weatherData;
        document.getElementById('weather-info').innerHTML = `
            <h2>สภาพอากาศใน ${city}</h2>
            <p>อุณหภูมิ: ${main.temp} °C</p>
            <p>ความชื้น: ${main.humidity} %</p>
            <p>ความเร็วลม: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${error.message}`;
    }
}
