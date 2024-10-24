import { API_KEY, KELVIN_TO_CELSIUS } from "../index.js"
import { Axios } from "../modules/axios.js"
import { 
    INFO_WEATHER_SELECTOR, 
    LOADING_SELECTOR,
    PARAMETER_CONTAINER, 
    valid_selector
} from "../modules/selector.js";

interface WeatherSettings {
    lat: number;
    lon: number;
    country: string;
    name: string;
}

interface WeatherInfoSelector {
    cityName: HTMLElement;
    countryIcon: HTMLImageElement;

    weatherDesc: HTMLElement;
    weatherIcon: HTMLImageElement;

    temp: HTMLElement;

    windspeed: HTMLElement;
    humidity: HTMLElement;
    cloudiness: HTMLElement;
}
 
export class Weather {
    protected fetchWeather = async (url: string, method: string): Promise<null | unknown> => {
        try {
            method = method.toUpperCase();
            const axios: Axios = new Axios(url);
            switch(method) {
                case 'GET':
                    const data = await axios.get()
                    return data
                case 'POST':
                    break
                case 'PUT':
                    break
                default:
                    return null
            }

        } catch(error) {
            console.error('Error fetching weather data:', error)
            return null
        }
    }

    protected fetchCoordinates = async (city: string): Promise<{country: string, name: string} | null> => {
        const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        const data = await this.fetchWeather(geocodeUrl, 'GET') as WeatherSettings[];
        if(data && data.length > 0) {
            const { country, name } = data[0];
            return { country, name };
        } else {
            const loadingSelector = document.querySelector(LOADING_SELECTOR) as HTMLElement;
            const Image = loadingSelector?.querySelector('img') as HTMLImageElement
            setTimeout(() => {
                loadingSelector?.classList.remove('active')
                Image?.setAttribute('src', './assets/not-found.png');
            }, 500)
            console.warn('No coordinates found for the specified city');
            return null;
        }
    }

    protected fetchWeatherUser = async (
        lat: string | number, 
        lon: string | number,
        loadingSelector: HTMLElement,
        isLatLong: boolean = false
    ): Promise<any> => {

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${
        isLatLong 
        ? `lat=${lat}&lon=${lon}` 
        : `q=${lat},${lon}`
        }&appid=${API_KEY}`

        try {
            const data = await this.fetchWeather(apiUrl, 'GET')
            return data
        } catch(error) {
            console.log(error);
            return null;
        } finally {
            loadingSelector.classList.remove('active')
        }
    }


    public result = (data: any, is_generate: boolean = false) => {
        if(is_generate && data && valid_selector(INFO_WEATHER_SELECTOR)) {
            const infoWeather = document.querySelector(INFO_WEATHER_SELECTOR)
            
            if(infoWeather) {
                infoWeather?.classList.add('active')

                const infoObjectSelector = {
                    cityName: infoWeather?.querySelector('[data-cityName]') as HTMLElement,
                    countryIcon: infoWeather?.querySelector('[data-countryIcon]') as HTMLImageElement,
                    
                    weatherDesc: infoWeather?.querySelector('[data-weatherDesc]') as HTMLElement,
                    weatherIcon: infoWeather?.querySelector('[data-weatherIcon]') as HTMLImageElement,
                    
                    temp: infoWeather?.querySelector('[data-temp]') as HTMLElement,
                    windspeed: infoWeather?.querySelector('[data-windspeed]') as HTMLElement,
                    humidity: infoWeather?.querySelector('[data-humidity]') as HTMLElement,
                    cloudiness: infoWeather?.querySelector('[data-cloudiness]') as HTMLElement,
                } as WeatherInfoSelector;
                
                if (infoObjectSelector.cityName && infoObjectSelector.weatherIcon && 
                    infoObjectSelector.weatherDesc && infoObjectSelector.temp && 
                    infoObjectSelector.windspeed && infoObjectSelector.humidity &&
                    infoObjectSelector.cloudiness) {

                    // Вычисляем температуру (убираем магическое число в константу)   
                    let primaryTemp = Math.floor(data.main.temp - KELVIN_TO_CELSIUS)
                    infoObjectSelector.cityName.textContent = data.name;
                    const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    infoObjectSelector.weatherIcon.setAttribute('src', weatherIconUrl);
                    
                    infoObjectSelector.weatherDesc.textContent = data.weather[0].description
                    infoObjectSelector.temp.textContent = `${primaryTemp.toString()} °C`;
                }
            }
        }

    }
}

export const weather = new Weather();