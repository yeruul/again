const apiKey = "6ea16ec3fab7f46924e91d388d0c52c5"; 

function loadCities() {
  // одоогоор зөвхөн Монгол тул хот/аймаг сонголт өөрчлөгдөхгүй
  console.log("Монгол улс сонгогдлоо");
}

async function getWeather() {
  const city = document.getElementById("city").value;
  const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city},MN&appid=${apiKey}&units=metric&lang=mn`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},MN&appid=${apiKey}&units=metric&lang=mn`;

  try {
    // Одоогийн цаг агаар
    const res = await fetch(urlCurrent);
    const data = await res.json();

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temp").textContent = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("feels").textContent = `Мэдрэгдэх: ${data.main.feels_like.toFixed(1)}°C`;
    document.getElementById("wind").textContent = `${data.wind.speed} м/с`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Forecast (өдөр бүрийн 12:00 цагийн дундаж)
    const resF = await fetch(urlForecast);
    const dataF = await resF.json();

    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";

    const daily = dataF.list.filter(item => item.dt_txt.includes("12:00:00"));
    daily.slice(0, 5).forEach(day => {
      const date = new Date(day.dt * 1000);
      const weekday = date.toLocaleDateString("mn-MN", { weekday: "short" });

      forecastEl.innerHTML += `
        <div class="day">
          <p>${weekday}</p>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="">
          <p>${day.main.temp.toFixed(1)}°C</p>
        </div>
      `;
    });

  } catch (err) {
    alert("⚠️ Алдаа гарлаа. Сүлжээ эсвэл API key шалгана уу.");
  }
}

