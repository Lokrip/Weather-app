export interface TabSelectorType {
    selector: string;
    many: boolean;
}

type SFLT = '.form-container' | '[data-searchForm]'

export const valid_selector = (
    selector: string | string[], 
    many: boolean = false) => {
    
    if (!many) {
        // For a single selector
        return !!document.querySelector(selector as string);
    } else {
        // For multiple selectors
        const selectors = selector as string[];
        return selectors.some(selector_new => !!document.querySelector(selector_new));
    }

}


export type TabContainerSelctor = '.tab-container'

export const TAB_CONTAINER_SELECTOR: TabContainerSelctor[] = ['.tab-container']

export const TAB_SELECTOR: TabSelectorType = {
    selector: '.tab',
    many: true
}
//Search Weather Selector
export const INFO_WEATHER_SELECTOR = '.user-info-container'

export const LOADING_SELECTOR = '.loading-container'

export const SEARCH_FORM_SELECTOR: SFLT[] = ['.form-container', '[data-searchForm]']

export const PARAMETER_CONTAINER = '.parameter-container'

export const GRANT_LOCATION_CONTAINER = '.grant-location-container'
