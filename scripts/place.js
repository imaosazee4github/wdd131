document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Nigeria States Data
const statesData = {
    default: {
        country: {
            area: "923,768 km²",
            population: "218+ million",
            capital: "Abuja",
            language: "English, Hausa, Yoruba, Igbo",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 28,
            conditions: "Tropical",
            wind: 15,
            windChill: null
        }
    },
    lagos: {
        country: {
            area: "3,577 km²",
            population: "15+ million",
            capital: "Ikeja",
            language: "English, Yoruba",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 30,
            conditions: "Hot & Humid",
            wind: 12,
            windChill: null
        }
    },
    abuja: {
        country: {
            area: "7,315 km²",
            population: "218+ million",
            capital: "Abuja",
            language: "English, Hausa",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 28,
            conditions: "Tropical",
            wind: 15,
            windChill: null
        }
    },
    kano: {
        country: {
            area: "20,131 km²",
            population: "13+ million",
            capital: "Kano",
            language: "Hausa, English",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 35,
            conditions: "Hot & Dry",
            wind: 20,
            windChill: null
        }
    },
    rivers: {
        country: {
            area: "11,077 km²",
            population: "7+ million",
            capital: "Port Harcourt",
            language: "English, Ikwerre",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 32,
            conditions: "Hot & Humid",
            wind: 10,
            windChill: null
        }
    },
    edo: {
        country: {
            area: "17,802 km²",
            population: "4+ million",
            capital: "Benin City",
            language: "English, Edo, Bini",
            currency: "Nigerian Naira (₦)",
            callingCode: "+234",
            internetTLD: ".ng"
        },
        weather: {
            temperature: 29,
            conditions: "Tropical",
            wind: 14,
            windChill: null
        }
    }
};

// DOM Elements
const selectElement = document.querySelector('#stateSelect');
const data1List = document.querySelector('.data1 ul');
const data2List = document.querySelector('.data2 ul');

// Populate the select dropdown with states
function populateStates() {
// Add default option
selectElement.innerHTML = '<option value="default">Nigeria (Country)</option>';

// Add state options

const stateOptions = [
    {'value' : 'lagos', name: 'Lagos State'},
    {'value' : 'abuja', name: 'Abuja (FCT)'},
    {'value' : 'kano', name: 'Kano State'},
    {'value' : 'rivers', name: 'Rivers State'},
    {'value' : 'edo', name: 'Edo State'},
];

stateOptions.forEach(state => {
    const option = document.createElement('option');
    option.value = state.value;
    option.textContent = state.name;
    selectElement.appendChild(option)
});

}

function calculateWindChill(temp, wind) {
  return Math.round(13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16))) + "°C";
}

// update country data (data1)
function updateCountryData(stateKey){
    const countryData = statesData[stateKey].country;

    data1List.innerHTML = `
    <li>Area: <span>${countryData.area}</span></li>
    <li>Population: <span>${countryData.population}</span></li>
    <li>Capital: <span>${countryData.capital}</span></li>
    <li>Language: <span>${countryData.language}</span></li>
    <li>Currency: <span>${countryData.currency}</span></li>
    <li>Calling Code: <span>${countryData.callingCode}</span></li>
    <li>Internet TLD: <span>${countryData.internetTLD}</span></li>
    `;
}

// update weather data(data2)
function updateWeatherData(stateKey) {
    const weatherData = statesData[stateKey].weather;


    const windChill = (weatherData.temperature <= 10 && weatherData.wind > 4.8)
           ? calculateWindChill(weatherData.temperature, weatherData.wind)
           : weatherData.temperature + "°C";

    data2List.innerHTML = `
    <li>Temperature: <span>${weatherData.temperature}°C</span></li>
    <li>Conditions: <span>${weatherData.conditions}</span></li>
    <li>Wind: <span>${weatherData.wind}km/h</span></li>
    <li>Wind Chill: <span>${windChill}</span></li>
    `;

}

// Handle state selection change

function handleStateChange(event) {
    const selectedState = event.target.value;

    // update both data sections
    updateCountryData(selectedState);
    updateWeatherData(selectedState);

    // update header title
    const headerTitle = document.querySelector('header h1');
    headerTitle.textContent = (selectedState === 'default') ? 'Nigeria' : event.target.options[event.target.selectedIndex].text;
}    

function init(){
    populateStates();
    updateCountryData('default');
    updateWeatherData('default');

    // Add event listener for state selection

    selectElement.addEventListener('change', handleStateChange);
}

document.addEventListener('DOMContentLoaded', init);

