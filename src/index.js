import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryInfo = document.getElementById('country-info');

searchBox.addEventListener('input', debounce(onSearch, 300));

function onSearch(event) {
    const query = event.target.value.trim();

    if (query === '') {
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(query)
        .then(data => renderResults(data))
        .catch(error => {
            if (error.message === '404') {
                Notiflix.Notify.failure("Oops, there is no country with that name");
            }
        });
}

function renderResults(data) {
    countryInfo.innerHTML = '';
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (data.length >= 2 && data.length <= 10) {
        const list = document.createElement('ul');
        list.classList.add('country-list');
        data.forEach(country => {
            const listItem = document.createElement('li');
            listItem.classList.add('country-item');
            listItem.innerHTML = `
                <img src="${country.flags.svg}" alt="flag of ${country.name.official}">
                <span>${country.name}</span>
            `;
            list.appendChild(listItem);
        });
        countryInfo.appendChild(list);
    } else if (data.length === 1) {
        const country = data[0];
        countryInfo.innerHTML = `
            <div class="country-item">
                <img src="${country.flags.svg}" alt="flag of ${country.name}">
                <span>${country.name}</span>
            </div>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${country.languages.map(lang => lang.name).join(', ')}</p>
        `;
    }
}
