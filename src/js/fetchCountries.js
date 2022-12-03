import axios from 'axios';

export function fetchCountries(name) {
  return axios
    .get(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    )
    .then(({ data }) => data);
}

// export function fetchCountries(countryName) {
//   fetch(
//     `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
//   )
//     .then(resp => {
//       return console.log(resp.json());
//     })
//     .then(country => {
//       return console.log(country);
//     })
//     .catch(error => console.log(error));
// }

// import axios from 'axios';

// export function fetchCountries(name) {
//   return axios
//     .get(
//       `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//     )
//     .then(({ data }) => data);
// }

// .then(r => {
//       return r.json();
//     })
//     .then(countres => {
//       let sortCountry = countres.filter(sort =>
//         sort.name.includes(countryName)
//       );
//       console.log(sortCountry);
//       // console.log(sortCountry);
//       // console.log(countres.map(country => country.name));
//     });
