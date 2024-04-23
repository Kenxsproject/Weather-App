const form = document.querySelector(`.top-banner form`);
const input = document.querySelector(`.top-banner input`);
const msg = document.querySelector(`.top-banner .msg`);
const list = document.querySelector(`.ajax-section .cities`);
const apiKey = `4d8fb5b93d4af21d66a2948710284366`;

form.addEventListener(`submit`, e => {
    e.preventDefault();
    let inputVal = input.value.trim();

    const listItems = list.querySelectorAll(`.city`);
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = ``;
            const cityName = el.querySelector(`.city-name span`).textContent.toLowerCase();
            const countryCode = el.querySelector(`.city-name sup`).textContent.toLowerCase();
            const fullName = `${cityName},${countryCode}`;

            if (inputVal.includes(`,`)) {
                const [inputCity, inputCountry] = inputVal.split(`,`);
                inputVal = inputCity.trim();
                content = inputCountry.trim() === countryCode ? cityName : fullName;
            } else {
                content = cityName;
            }
            return content === inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            const cityName = filteredArray[0].querySelector(`.city-name span`).textContent;
            msg.textContent = `You already know the weather for ${cityName}... Otherwise, be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

            const li = document.createElement(`li`);
            li.classList.add(`city`);
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${weather[0].description}">
          <figcaption>${weather[0].description}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
            msg.textContent = ``;
            form.reset();
            input.focus();
        })
        .catch(() => {
            msg.textContent = `Please search for a valid city 😩`;
        });
});

