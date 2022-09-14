/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Chain } from './core'


export class Editor extends Chain {
    constructor(text: string) {
        super(text)
    }
    wrap(location: Location, wrappers: string[]) {

    }
}