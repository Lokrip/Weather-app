import { tab } from "./tab.js";
import { TAB_CONTAINER_SELECTOR, TAB_SELECTOR } from "../modules/selector.js";
import { view } from "./view.js";

interface TCFType {
    your_weather: () => void;
    search_weather: () => void;
}

export class App {
    tab = () => {
        const containerTab = document.querySelector(TAB_CONTAINER_SELECTOR[0]) as HTMLElement;
        if(!containerTab) return;

        const tabs = tab.__choice__(TAB_SELECTOR)
        tab.__event__((tab) => {
            const textTab = tab?.textContent?.trim()
                .split(' ')
                .map(e => e.toLowerCase())
                .join('_')

            const TabChoiceFun: TCFType = {
                your_weather: view.your_weather,
                search_weather: view.search_weather,
            } as TCFType;

            if (textTab && TabChoiceFun[textTab as keyof TCFType]) {
                TabChoiceFun[textTab as keyof TCFType]();
            }

        }, tabs, TAB_SELECTOR.many, 'current-tab')
    }

    run = () => {
        this.tab()
    }
}
export const app: App = new App();