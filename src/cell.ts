export type AttributesKinds = 'href' | 'class'

type Attributes = { key: AttributesKinds, value: string, tag: string }

// export class Cell {
//     text: string
//     decorators?: string[]
//     functionality?: string[]
//     attachments?: Attachments
//     constructor(text: string, decorators?: string[], functionality?: string[], attachments?: Attachments) {
//         this.text = text
//         this.decorators = decorators || []
//         this.functionality = functionality || []
//         this.attachments = attachments || {}
//     }
//     get length() {
//         return this.text.length
//     }
//     inspect(full = false) {
//         if (full)
//             return JSON.parse(JSON.stringify(this))

//         let inspect_object = {}
//         Object.entries(this).forEach(([key, value]) => {
//             if (typeof value == 'string' || !(value.length == 0 || Object.keys(value).length == 0))
//                 inspect_object = { ...inspect_object, ...{ [key]: value } }
//         })
//         return inspect_object

//     }
//     set_attachment(key: AttachmentsKinds, value: string) {
//         this.attachments = { ...this.attachments, ...{ [key]: value } }
//     }
//     htmlify() {
//         if (this.functionality.length != 0)
//             return this.functionality.map(item => `<${item}>`).join('')

//         const decorators_string_open = this.decorators.map(item => {
//             let attributes = ''
//             if (['span', 'a'].includes(item))
//                 attributes = Object.entries(this.attachments).map(([key, value]) => {
//                     return ` ${key}="${value}"`
//                 }).join('')

//             return `<${item}${attributes}>`
//         })

//         const decorators_string_close = this.decorators.map(item => `</${item}>`)
//         decorators_string_close.reverse()

//         return `${decorators_string_open.join('')}${this.text}${decorators_string_close.join('')}`
//     }
//     wrapper(...wrappers: string[]) {
//         const each_wrappers = (fn: (includes: boolean, wrapper: string) => void) => {
//             wrappers.forEach(wrapper => {
//                 fn(this.decorators.includes(wrapper), wrapper)
//             })
//         }
//         return {
//             wrap: () => {
//                 each_wrappers((into, tag) => !into ? this.decorators.push(tag) : null)
//             },
//             unwrap: () => {
//                 each_wrappers((into, tag) => into ? this.decorators.splice(this.decorators.indexOf(tag), 1) : null)
//             },
//             toggle: () => {
//                 each_wrappers((into, tag) => into ? this.wrapper(tag).unwrap() : this.wrapper(tag).wrap())
//             }
//         }
//     }
//     copy(): Cell {
//         return new Cell(this.text, [...this.decorators], [...this.functionality], { ...this.attachments })
//     }
//     split(...index: number[]): Cell[] {
//         let cells: Cell[] = []
//         index = index.sort((a: number, b: number) => a - b)

//         let last = 0
//         index.forEach((item) => {
//             const segment = this.copy()
//             segment.text = segment.text.slice(last, item)
//             cells.push(segment)
//             last = item
//         })
//         const cell = this.copy()
//         cell.text = cell.text.slice(last)
//         cells.push(cell)
//         cells = cells.filter(item => !(item.functionality.length == 0 && item.text == ''))

//         return cells
//     }
// }

// const regex = {
//     basic_tags: /<(?<tag>s|b|u|i|a)(.?(?<attr_name>\w+?)="(?<attr_value>[\s\S]+?)")*?>(?<text>[\s\S]*?)<\/\1>/gm,
//     cleaner: /\n\s*/gm,
//     html_tag: /<(?<tag>(?<close>\/)?\w+)(.?(?<attr_name>\w+?)="(?<attr_value>[\s\S]+?)")*?>/gm
// }

export class Cell {
    text: string
    wrappers: string[] = []
    attributes: Attributes[] = []
    constructor(text: string, wrappers: string[] = []) {
        this.text = text
        this.wrappers = wrappers
    }
    // pure(html: string): string { return html.replaceAll(regex.html_tag, '').replaceAll(regex.cleaner, '') }
    // parse(html: string) {
    //     const tag_points = html.matchAll(regex.html_tag)
    //     const open_tags: string[] = []
    //     let index = 0
    //     if (html.match(regex.html_tag)) {
    //         for (const point of tag_points) {
    //             const cell = new Cell(html.slice(index, point.index))
    //             this.children.push(cell)

    //             if (point.groups.close) {
    //                 cell.set_tag(open_tags[open_tags.length - 1] || null)
    //                 open_tags.pop()
    //             }
    //             else
    //                 open_tags.push(point.groups.tag)

    //             index += point.index + point[0].length
    //             // this.decorators.push(cell.groups.tag)
    //             // if (cell.groups.attr_name)
    //             //     this.attributes = { ...this.attributes, ...{ [cell.groups.attr_name]: cell.groups.attr_value } }
    //             // this.children.push(
    //             //     new Cell(cell.groups.text)
    //             // )
    //         }
    //         this.children.push(new Cell(html.slice(index)))
    //     }

    //     console.log(this.children)
    // }
    to_html() {
        let post = ''
        const prev = this.wrappers.map((wrapper, index) => {
            const attributes = this.attributes.filter(item => item.tag == wrapper)
            post += `</${this.wrappers[this.wrappers.length - 1 - index]}>`
            return `<${wrapper}${attributes.length != 0 ? attributes.map(item => ` ${item.key}="${item.value}"`).join('') : ''}>`
        }).join('')

        return prev + this.text + post
    }
    inspect(full = false) {
        if (full)
            return JSON.parse(JSON.stringify(this))

        let inspect_object = {}
        Object.entries(this).forEach(([key, value]) => {
            if (typeof value == 'string' || !(value.length == 0 || Object.keys(value).length == 0))
                inspect_object = { ...inspect_object, ...{ [key]: value } }
        })
        return inspect_object

    }
    set_attribute(tag: string, key: AttributesKinds, value: string) {
        this.attributes = [...this.attributes, ...[{ key, value, tag }]]
    }
    wrapper(...wrappers: string[]) {
        const each_wrappers = (fn: (includes: boolean, wrapper: string) => void) => {
            wrappers.forEach(wrapper => {
                fn(this.wrappers.includes(wrapper), wrapper)
            })
        }
        return {
            wrap: () => {
                each_wrappers((into, tag) => !into ? this.wrappers.push(tag) : null)
            },
            unwrap: () => {
                each_wrappers((into, tag) => into ? this.wrappers.splice(this.wrappers.indexOf(tag), 1) : null)
            },
            toggle: () => {
                each_wrappers((into, tag) => into ? this.wrapper(tag).unwrap() : this.wrapper(tag).wrap())
            }
        }
    }
    copy(): Cell {
        const cell = new Cell(this.text, [...this.wrappers])
        cell.attributes = [...this.attributes]
        return cell
    }
    split(...index: number[]): Cell[] {
        let cells: Cell[] = []
        index = index.sort((a: number, b: number) => a - b)

        let last = 0
        index.forEach((item) => {
            const segment = this.copy()
            segment.text = segment.text.slice(last, item)
            cells.push(segment)
            last = item
        })
        const cell = this.copy()
        cell.text = cell.text.slice(last)
        cells.push(cell)
        cells = cells.filter(item => !(item.text == ''))

        return cells
    }
}