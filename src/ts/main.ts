import { CONNECT_NAME } from "./index.js"
import { startApplication } from "./components/start.js"

if(!startApplication) throw new Error('Not Found')

const __load__ = () => {
    CONNECT_NAME.forEach(name => {
        try {
            const wrapper = document.querySelector(name);
            if(wrapper) {
                startApplication(true)
            }
        } catch(error) {
            console.log(error)
        }
    })

}

window.addEventListener("DOMContentLoaded", __load__)