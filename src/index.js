import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let inputValue = '';

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  inputValue = e.target.value.trim();
  if (inputValue === '') {
    clearMarkup();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      console.log(countries);
      if (countries.length === 1) {
        clearMarkup();
        createCountryInfo(countries);
        return;
      } else if (countries.length > 1 && countries.length <= 10) {
        clearMarkup();
        createCountriesList(countries);
        return;
      } else if (countries.length > 10) {
        clearMarkup();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    })
    .catch(onError);
}

function createCountriesList(countries) {
  const markup = countries
    .map(
      country => `<button type="button" class="country-item">
        <img class="country-flag" src="${country.flags.svg}" alt="flag">
        <p class="country-name">${country.name.official}</p>
      </button>`
    )
    .join(' ');

  refs.list.insertAdjacentHTML('beforeend', markup);

  refs.list.addEventListener('click', onListElementClick);

  function onListElementClick(e) {
    clearMarkup();

    const chosenCountry = e.target.lastChild.textContent;
    console.log(chosenCountry);
    fetchCountries(chosenCountry)
      .then(countries => {
        clearMarkup();
        createCountryInfo(countries);
        return;
      })
      .catch(onError);
  }
}

function createCountryInfo(countries) {
  const languages = Object.values(countries[0].languages).join(', ');

  const markup = countries.map(
    country => `<div class="country-info-head"><img class="country-info-flag" src="${country.flags.svg}" alt="flag">
      <h1 class="country-info-name">${country.name.official}</h1></div>
      <ul class="country-info-list">
        <li>
          <p class="country-info-item">Capital: </p>
          <span class="country-info-value">${country.capital}</span>
        </li>
        <li>
          <p class="country-info-item">Population: </p>
          <span class="country-info-value">${country.population}</span>
        </li>
        <li>
          <p class="country-info-item">Languages: </p>
          <span class="country-info-value">${languages}</span>
        </li>
      </ul>`
  );

  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.list.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onError() {
  clearMarkup();
  Notify.failure('Oops, there is no country with that name');
}

// const DEBOUNCE_DELAY = 300;
// const refs = {
//   inputEl: document.querySelector('#search-box'),
//   listEl: document.querySelector('.country-list'),
//   countryInf: document.querySelector('.country-info'),
// };

// let inputValue = 'az';

// refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(event) {
//   event.preventDefault();

//   inputValue = event.target.value.trim();
//   console.log('inputValue: ', inputValue);
//   console.log('event.target.value.trim(): ', event.target.value.trim());

//   // if (inputValue === '') {
//   //   clearMarkup();
//   //   return;
//   // }
// }

// fetchCountries(inputValue)
//   .then(countries => {
//     console.log(countries);
//     if (countries.length === 1) {
//       clearMarkup();
//       createCountryInfo(countries);
//       return;
//     }
//     if (countries.length > 1 && countries.length <= 10) {
//       clearMarkup();
//       createCountryList(countries);
//       return;
//     }
//     if (countries.length > 10) {
//       clearMarkup();
//       Notify.info('Too many matches found. Please enter a more specific name.');
//       return;
//     }
//   })
//   .catch(onError);

// function createCountryList(countries) {
//   const listMarkup = countries
//     .map(country => {
//       `<li class="country-list">
//   <img class="country-list_img" src="${country.flags.svg}" alt="${country.name.official}">
//   <p country-list_info>${country.name.official}</p>
// </li>`;
//     })
//     .join(' ');

//   refs.listEl.insertAdjacentHTML('beforebegin', listMarkup);
// }

// function createCountryInfo(countries) {
//   const countrLang = Object.values(countries[0].languages).join(', ');
//   const countryInfo = countries
//     .map(
//       country =>
//         `<div class="country-info_wrapper">
//   <img src="${country.flags.svg}" alt="" class="country-info_img">
//   <p class="country-info_name">${country.name.official}</p>
// </div>
// <ul class="country-info_list">
//   <li class="country-info_item">Capital:
//   <span class="country-info_value">${country.capital}</span>
//   </li>
//   <li class="country-info_item">Population:
//   <span class="country-info_value">${country.population}</span>
//   </li>
//   <li class="country-info_item">Languages:
//   <span class="country-info_value">${countrLang}</span>
//   </li>
// </ul>`
//     )
//     .join(' ');

//   refs.countryInf.insertAdjacentHTML('beforebegin', countryInfo);
// }

// function clearMarkup() {
//   refs.countryInf.innerHTML = '';
//   refs.listEl.innerHTML = '';
// }

// function onError(error) {
//   clearMarkup();
//   Notify.failure('Oops, there is no country with that name');
// }
