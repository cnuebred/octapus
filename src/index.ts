import {Container} from './container.js'

window.onload = () => {
    const base_element = document.querySelector('.octapus') 
    if (!base_element) return
    const container = new Container(base_element, {})
    console.log(container)
}