import { 
    SEARCH_FORM_SELECTOR, 
    TAB_CONTAINER_SELECTOR,
    valid_selector,
    LOADING_SELECTOR,
    GRANT_LOCATION_CONTAINER
} from "../modules/selector.js"

import { API_KEY } from "../index.js"
import { utils } from "../utils/utils.js"

import { 
    Weather, 
    weather 
} from "./weather.js"

interface CoordsType {
    latitude: string,
    longitude: string
}

export class View extends Weather {
    private addClass = (searchForm: HTMLElement, tabContainer: HTMLElement) => {
        searchForm?.classList.add('active')
        tabContainer?.classList.add('close')
    }

    private view_selector = (
        TAB_CONTAINER_SELECTOR: string,
        SEARCH_FORM_SELECTOR: string,
        LOADING_SELECTOR: string,
    ): { 
        searchForm: HTMLElement; 
        tabContainer: HTMLElement; 
        loadingSelector: HTMLElement
    } | undefined => {

        if(TAB_CONTAINER_SELECTOR && SEARCH_FORM_SELECTOR) {
            const tabContainer = document.querySelector(TAB_CONTAINER_SELECTOR) as HTMLElement;
            const searchForm = document.querySelector(SEARCH_FORM_SELECTOR) as HTMLElement;
            const loadingSelector = document.querySelector(LOADING_SELECTOR) as HTMLElement

            if (!tabContainer || !searchForm || !loadingSelector) return;
            this.addClass(searchForm, tabContainer)

            return { searchForm, tabContainer, loadingSelector};
        }
    }

    public your_weather = () => {
        const loadingSelector = document.querySelector(LOADING_SELECTOR) as HTMLElement;
        const grantLocationContainer = document.querySelector(GRANT_LOCATION_CONTAINER)
        const locationBtn = grantLocationContainer?.querySelector('.btn')
        grantLocationContainer?.classList.add('active')


        
        const MouseClickHandler = () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords
                const {lat, lon} = {
                    lat: latitude, 
                    lon: longitude
                }
                
                if(loadingSelector) {
                    grantLocationContainer?.classList.remove('active')
                    loadingSelector?.classList.add('active')

                    const data = await this.fetchWeatherUser(
                        lat,
                        lon,
                        loadingSelector,
                        true
                    )

                    console.log(data)
    
                    weather.result(data, true)
                }
            })
        }


        locationBtn?.addEventListener('click', MouseClickHandler)
    }

    public search_weather = (): void => {

        if(valid_selector(SEARCH_FORM_SELECTOR) &&
            valid_selector(TAB_CONTAINER_SELECTOR)) {
            const viewResult = this.view_selector(
                TAB_CONTAINER_SELECTOR[0],
                SEARCH_FORM_SELECTOR[1],
                LOADING_SELECTOR
            )

            if(!viewResult) {
                console.error("Search form or tab container not found.");
                return; // Exit if either is not found
            }

            const {searchForm, tabContainer, loadingSelector} = viewResult

            utils.form_event(async (value) => {
                const coordinates = await this.fetchCoordinates(value);
                loadingSelector.classList.add('active');
                
                if(coordinates) {
                    const {name, country} = coordinates;
                    const data = await this.fetchWeatherUser(
                        name, 
                        country, 
                        loadingSelector
                    )
                    weather.result(data, true)
                }
            }, searchForm, '[data-searchInput]')
        }
    }
}

export const view = new View()