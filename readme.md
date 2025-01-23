# Weather App

This is a simple Weather App built with HTML, JavaScript, and Tailwind CSS. It allows users to search for current weather conditions and 5-day forecasts by city name or their current location. The app also includes features like recent search history and interactive UI updates.

## Features
- Search weather forecasts by city name.
- Fetch weather forecasts for the user's current location using Geolocation.
- Display current weather details (temperature, condition, humidity, wind speed).
- Show a 5-day weather forecast with day-wise breakdown.
- Dropdown menu for recently searched cities.
- Interactive and visually appealing design using Tailwind CSS.
- Input validation and error handling for invalid locations or network issues.

## Project Structure
- **HTML**: Contains the structure and layout of the app.
- **CSS (Tailwind CSS)**: Used for styling the UI.
- **JavaScript**: Implements core functionality such as API requests, user interaction, and dynamic UI updates.

## Setup Instructions
1. Clone or download the project to your local machine.
2. Open the `index.html` file in a web browser.
3. Replace `YOUR_API_KEY` in the JavaScript section with your OpenWeatherMap API key.

## Usage
1. **Search by City Name**:
   - Enter the city name in the input field and click "Search."
   - The current weather and a 5-day forecast will be displayed.
2. **Use Current Location**:
   - Click the "Use Current Location" button to fetch weather data for your current location.
3. **Recent Searches**:
   - Search for cities to populate the "Recently Searched" dropdown.
   - Click a city in the dropdown to view its weather data.
4. **Error Handling**:
   - If the city is not found, an error message will be shown.
   - If location permissions are denied, a fallback alert will appear.

## Dependencies
- Tailwind CSS: A utility-first CSS framework.
- OpenWeatherMap API: For fetching weather data.

## File Overview
- **index.html**: The main HTML file containing the structure and functionality.
- **README.txt**: Project documentation.

## Requirements
- A web browser that supports modern JavaScript (e.g., Chrome, Firefox).
- An API key from OpenWeatherMap to fetch weather data.

## Notes
- The app stores recent searches in `localStorage` to persist data across sessions.
- Icons for weather conditions are fetched directly from OpenWeatherMap.

## API Documentation
- OpenWeatherMap API: https://openweathermap.org/api
