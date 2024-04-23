# Simple Weather App

This is a simple weather application that allows users to search for weather information based on city names. It utilizes the OpenWeatherMap API to fetch weather data and displays it to the user.

## Features

- Search for weather information by city name or city name along with the country code.
- Displays current weather information including temperature, weather description, and an icon representing the weather condition.
- Provides error messages for invalid city names or failed API requests.
- Prevents duplicate city entries in the list.

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. Enter the name of the city you want to search for in the input field and submit the form.
4. The weather information for the specified city will be displayed below the search form.
5. If the city name is invalid or the API request fails, an error message will be shown.

## Dependencies

- None

## API Key

To use this application, you need to sign up for an API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and replace the `apiKey` variable in the JavaScript code (`script.js`) with your own API key.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
