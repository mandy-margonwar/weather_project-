const API_KEY = 'dc3365b1d8c46249da2549ce5f9ac003'; // Replace with your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');
const recentCitiesDropdown = document.getElementById('recentCitiesDropdown');
const forecastContainer = document.getElementById('forecastContainer');

// Recent searches from localStorage
let recentSearches = JSON.parse(localStorage.getItem('recentCities')) || [];

// Event: Search by city name
searchBtn.addEventListener('click', async () => {
	const cityName = cityInput.value.trim();
	if (!cityName) {
		alert('Please enter a valid city name.');
		return;
	}
	await getWeatherByCity(cityName);
	cityInput.value = '';
});

// Event: Search by current location
currentLocationBtn.addEventListener('click', async () => {
	if (!navigator.geolocation) {
		alert('Geolocation is not supported by your browser.');
		return;
	}
	navigator.geolocation.getCurrentPosition(async (position) => {
		const { latitude, longitude } = position.coords;
		await getWeatherByLocation(latitude, longitude);
	}, () => {
		alert('Unable to fetch your location.');
	});
});

// Fetch weather data by city name
async function getWeatherByCity(city) {
	try {
		const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
		if (!response.ok) throw new Error('City not found');
		const data = await response.json();
		updateCurrentWeather(data);

		if (!recentSearches.includes(city)) {
			recentSearches.push(city);
			updateRecentCities();
		}
	} catch (error) {
		alert(error.message);
	}
}

// Fetch weather data by geographic coordinates
async function getWeatherByLocation(lat, lon) {
	try {
		const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
		if (!response.ok) throw new Error('Unable to fetch weather for current location');
		const data = await response.json();
		updateCurrentWeather(data);
	} catch (error) {
		alert(error.message);
	}
}

// Update current weather UI
function updateCurrentWeather(data) {
	currentWeather.querySelector('#cityName').textContent = data.name;
	currentWeather.querySelector('#weatherCondition').textContent =
		`Condition: ${data.weather[0].description}`;
	currentWeather.querySelector('#temperature').textContent =
		`Temperature: ${data.main.temp}°C`;
	currentWeather.querySelector('#humidity').textContent =
		`Humidity: ${data.main.humidity}%`;
	currentWeather.querySelector('#windSpeed').textContent =
		`Wind Speed: ${data.wind.speed} m/s`;

	currentWeather.classList.remove('hidden');
	getForecast(data.name);
}

// Fetch 5-day weather forecast
async function getForecast(city) {
	try {
		const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
		if (!response.ok) throw new Error('Forecast not available');
		const data = await response.json();
		updateForecast(data);
	} catch (error) {
		alert(error.message);
	}
}

// Update forecast UI
function updateForecast(data) {
	forecastContainer.innerHTML = '';
	const forecasts = data.list.filter((_, index) => index % 8 === 0);
	forecasts.forEach((forecastData) => {
		const day = new Date(forecastData.dt_txt).toLocaleDateString('en-US', {
			weekday: 'short',
		});
		const icon = `https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`;
		const temp = `Temp: ${forecastData.main.temp}°C`;
		const humidity = `Humidity: ${forecastData.main.humidity}%`;
		const wind = `Wind: ${forecastData.wind.speed} m/s`;

		forecastContainer.innerHTML += `
			<div class="bg-white p-4 rounded-md shadow-md text-center">
				<p class="font-bold">${day}</p>
				<img src="${icon}" alt="${forecastData.weather[0].description}" class="mx-auto">
				<p>${temp}</p>
				<p>${humidity}</p>
				<p>${wind}</p>
			</div>`;
	});

	forecast.classList.remove('hidden');
}

// Update recent cities dropdown
function updateRecentCities() {
	localStorage.setItem('recentCities', JSON.stringify(recentSearches));
	recentCitiesDropdown.innerHTML = '<option value="" disabled selected hidden>Select a recent city</option>';
	recentSearches.forEach((city) => {
		const option = document.createElement('option');
		option.value = city;
		option.textContent = city;
		recentCitiesDropdown.appendChild(option);
	});

	recentCitiesDropdown.addEventListener('change', () => {
		const selectedCity = recentCitiesDropdown.value;
		if (selectedCity) {
			getWeatherByCity(selectedCity);
		}
	});
}

// Initial load
updateRecentCities();