
class EventPrimary {
    getElement = (selector: string | HTMLElement): HTMLElement | null => {
        return typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    } 
}

export class Utils extends EventPrimary {
    input_event = (
        callback: (target: string) => void, 
        inputSelector: string | HTMLElement,
    ) => {

        const inputElement = this.getElement(inputSelector);

        if(!inputElement) {
            console.error('Form or input element not found');
            return;
        }

        const inputEventHandler = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target && callback) {
                callback(target.value)
            }
        }

        inputElement.addEventListener('input', inputEventHandler)
    }

    form_event = (
        callback: (target: string) => void, 
        formSelector: string | HTMLElement,
        inputSelector: string | HTMLElement,
    ) => {

        const inputElement = this.getElement(inputSelector) as HTMLInputElement;
        const formElement = this.getElement(formSelector) as HTMLFormElement;

        if(!inputElement || !formElement) {
            console.error('Form or input element not found');
            return;
        }

        const formEventHandler = (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            
            if (target && callback) {
                callback(inputElement.value)
            }
        }

        formElement.addEventListener('submit', formEventHandler)
    }
}


export const utils: Utils = new Utils()