import { TabSelectorType } from "../modules/selector"


export class Tab {
    __event__ = (
        callback: (tab: HTMLElement | null) => void, 
        tabs: NodeListOf<HTMLElement>, 
        many: boolean,
        classNameAdd: string
    ) => {
        const mouse_event_tab = (event: MouseEvent) => {
            if (many) tabs.forEach(tab => tab.classList.remove(classNameAdd))
            
            const event_tab = event.target as HTMLElement;
            event_tab.classList.add(classNameAdd)
            callback(event_tab)
        }

        if(many) {
            tabs.forEach(tab => {
                tab.addEventListener('click', mouse_event_tab)
            })
        }
    }

    __choice__ = (TAB_SELECTOR: TabSelectorType): NodeListOf<HTMLElement> => {
        if(TAB_SELECTOR.many) {
            const tabs = document.querySelectorAll(TAB_SELECTOR.selector) as NodeListOf<HTMLElement>
            if(tabs) {
                return tabs
            }
        }

        return document.querySelectorAll('');
    }
}


export const tab: Tab = new Tab()