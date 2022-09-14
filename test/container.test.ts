import { Container } from '../src/container'
import jsdom from 'jsdom'
import { readFileSync } from 'fs'

const html = readFileSync('./index.html')
const document = jsdom.JSDOM.fragment(html.toString())

describe('Container class tests', () => {
    const container = new Container(document.querySelector('.octapus'))
    if (!document) return
    it('creating container', () => {
        expect(container.element).toEqual(document.querySelector('.octapus'))
    })
    it('check empty options', () => {
        expect(container.options).toEqual({})
    })
})