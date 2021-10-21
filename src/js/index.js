// Copyright 2021 sfchi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const cityForm = document.querySelector('form');
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.img-icon')

const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // Destructure properties
    const { cityDetails, weather } = data;

    // Update details template
    details.innerHTML = `
        <h2 class="h2 my-1">${cityDetails.EnglishName}</h2>
        <div class="my-1">${weather.WeatherText}</div>
        <div class="temp-group my-2">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `

    // Update night/day img
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc)

    // Remove hide class
    if(card.classList.contains('hide')){
        card.classList.remove('hide')
    }
}

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset()

    // Update UI with new city
    updateCity(city)
    .then((data) => updateUI(data))
    .catch(err => console.log(err))
})

