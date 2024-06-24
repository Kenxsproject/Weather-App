const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');
const unitSelect = document.getElementById('unit');
const apiKey = '4d8fb5b93d4af21d66a2948710284366';

form.addEventListener('submit', e => {
    e.preventDefault();
    let inputVal = input.value.trim();
    let selectedUnit = unitSelect.value;

    const listItems = list.querySelectorAll('.city');
    const listItemsArray = Array.from(listItems);

    const cityAlreadyListed = listItemsArray.some(el => {
        const cityName = el.querySelector('.city-name span').textContent.toLowerCase();
        const countryCode = el.querySelector('.city-name sup').textContent.toLowerCase();
        const fullName = `${cityName},${countryCode}`;

        if (inputVal.includes(',')) {
            const [inputCity, inputCountry] = inputVal.split(',').map(item => item.trim().toLowerCase());
            return inputCity === cityName && inputCountry === countryCode;
        } else {
            return cityName === inputVal.toLowerCase();
        }
    });

    if (cityAlreadyListed) {
        const cityName = inputVal.includes(',') ? inputVal.split(',')[0] : inputVal;
        msg.textContent = `You already know the weather for ${cityName}... Otherwise, be more specific by providing the country code as well 😉`;
        form.reset();
        input.focus();
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=${selectedUnit}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                throw new Error('City not found');
            }

            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
            const tempUnit = selectedUnit === 'metric' ? '°C' : '°F';

            const li = document.createElement('li');
            li.classList.add('city');
            li.innerHTML = `
                <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                </h2>
                <div class="city-temp">${Math.round(main.temp)}<sup>${tempUnit}</sup></div>
                <figure>
                    <img class="city-icon" src="${icon}" alt="${weather[0].description}">
                    <figcaption>${weather[0].description}</figcaption>
                </figure>
            `;
            list.appendChild(li);
            msg.textContent = '';
            form.reset();
            input.focus();
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city 😩';
        });
});
