/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Chain } from './core'


type ContainerOptions = {

}

export class Container {
    element: Element
    options: ContainerOptions
    core: Chain[]
    constructor(element: Element | null, options?: ContainerOptions) {
        if (!element) return
        this.element = element
        this.options = options || {}
    }

}
