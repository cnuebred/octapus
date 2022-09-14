import { AttributesKinds, Cell } from './cell'

type Selection = {
    data: {
        index: number,
        cell_index: number[],
        cells: Cell[],
        index_in_cell: number[]
    }
    reload: () => Selection
}
type Wrapper = { [index: string]: (...wrappers: string[]) => Chain }
// class Selection {
//     index: number
//     init_index: number
//     cell_index: number[]
//     cells_range: Cell[]
//     cells: Cell[]
//     index_in_cell: number[]
//     text: string
//     constructor(text: string, init_index: number, cells: Cell[]) {
//         this.text = text
//         this.init_index = init_index
//         this.cells = cells
//     }
//     select(main_index: number = this.index) {
//         if (main_index == -1)
//             throw Error('Text not found')

//         const range_index_cells: number[] = []
//         const range_cells: Cell[] = []
//         const index_in_cell: number[] = [0, 0]

//         const start_index: number = main_index
//         const end_index: number = start_index + this.text.length

//         let total_index = 0

//         this.cells.forEach((cell, index) => {
//             const start = total_index
//             const end = total_index + cell.text.length

//             if (start >= end_index)
//                 return

//             const push = () => {
//                 range_index_cells.push(index)
//                 range_cells.push(cell)
//             }

//             if ((start_index >= start && start_index < end) || (end_index > start && end_index <= end)) {
//                 if (range_index_cells.length == 0) index_in_cell[0] = start_index - start
//                 index_in_cell[1] = end_index - start
//                 push()
//             } else if (range_index_cells.length != 0)
//                 push()

//             total_index += cell.text.length
//         })

//         if (range_index_cells.length == 0)
//             throw Error('Segment index out of the range')
//         if (start_index < 0)
//             throw Error('Segment missed value')

//         this.index = main_index
//         this.cell_index = range_index_cells
//         this.index_in_cell = index_in_cell
//         this.cells_range = range_cells
//     }
//     reload() {
//         this.select()
//     }
// }

const regex: { [index: string]: RegExp } = {
    cleaner: /\n\s*/gm,
    html_tag: /<(?<tag>(?<close>\/)?\w+)(.?(?<attr_name>\w+?)="(?<attr_value>[\s\S]+?)")*?>/gm
}
// const regex = {
//     basic_tags: /<(?<tag>s|b|u|i|a)(.?(?<attr_name>\w+?)="(?<attr_value>[\s\S]+?)")*?>(?<text>[\s\S]*?)<\/\1>/gm,
//     cleaner: /\n\s*/gm,
//     html_tag: /<(?<tag>(?<close>\/)?\w+)(.?(?<attr_name>\w+?)="(?<attr_value>[\s\S]+?)")*?>/gm
// }
const SINGLE_TAG = ['br', 'hr', 'st']
const OVER_TAG = ['li']

type SelectedPoint = {
    index: number,
    index_in_text: number
}


// export class Core {
//     chains: Chain[]
//     constructor() {

//     }
//     overwrap() {

//     }
// }

// export class Chain {
//     parts: number
//     html: string
//     pure_text: string
//     cells: Cell[]
//     overwrap: string[]
//     constructor(text: string) {
//         this.html = text
//         this.pure_text = this.remove_tags(this.html)
//         this.to_chain(text)
//     }
//     remove_tags(text: string): string {
//         return text.replaceAll(regex.html_tag, '').replaceAll(regex.cleaner, '')
//     }
//     split_by_select(_location: Selection): this { // TODO
//         let location = _location.data
//         const first_segment = location.cells[0]
//         this.cells.splice(location.cell_index[0], 1, ...first_segment.split(location.index_in_cell[0]))

//         location = _location.reload().data

//         const last_segment = location.cells[location.cells.length - 1]
//         this.cells.splice(
//             location.cell_index[location.cell_index.length - 1],
//             1,
//             ...last_segment.split(location.index_in_cell[1])
//         )
//         return this
//     }
//     split_by_points(first: SelectedPoint, last: SelectedPoint): this {
//         this.cells.splice(first.index, 1, ...this.cells[first.index].split(first.index_in_text))
//         this.cells.splice(last.index, 1, ...this.cells[last.index].split(last.index_in_text))
//         return this
//     }
//     select(text: string, index = 0): Selection {
//         const pure_text = this.remove_tags(this.html)
//         const main_index = pure_text.indexOf(text, index)
//         if (main_index == -1)
//             throw Error('Text not found')

//         const cell_range_index: number[] = []
//         const cells: Cell[] = []
//         const index_in_cell: number[] = [0, 0]

//         const start_index: number = main_index
//         const end_index: number = start_index + text.length
//         let total_index = 0

//         this.cells.forEach((cell, index) => {
//             const start = total_index
//             const end = total_index + cell.text.length

//             if (start >= end_index)
//                 return

//             const push = () => {
//                 cell_range_index.push(index)
//                 cells.push(cell)
//             }

//             if ((start_index >= start && start_index < end) || (end_index > start && end_index <= end)) {
//                 if (cell_range_index.length == 0) index_in_cell[0] = start_index - start
//                 index_in_cell[1] = end_index - start
//                 push()
//             } else if (cell_range_index.length != 0)
//                 push()

//             total_index += cell.text.length

//         })

//         if (cell_range_index.length == 0)
//             throw Error('Segment index out of the range')
//         if (start_index < 0)
//             throw Error('Segment missed value')

//         return {
//             data: {
//                 index: main_index,
//                 cell_index: cell_range_index,
//                 index_in_cell: index_in_cell,
//                 cells: cells
//             },
//             reload: () => this.select(text, main_index)
//         }
//     }
//     select_all(): Selection {
//         return {
//             data: {
//                 index: 0,
//                 index_in_cell: [0, this.pure_text.length - 1],
//                 cell_index: [0, this.cells.length - 1],
//                 cells: this.cells
//             },
//             reload: () => this.select_all()

//         }
//     }
//     inspect(full = false) {
//         return this.cells.map(item => item.inspect(full))
//     }
//     // to_chain(html: string): Chain {
//     //     html = html.replaceAll(regex.cleaner, '')

//     //     const tags = html.matchAll(regex.html_tag)
//     //     const cells: Cell[] = []
//     //     let tag_iter = tags.next()
//     //     let last_index = 0
//     //     const opens: string[] = []

//     //     const close_loop = (tag: any) => {
//     //         last_index = tag.index + tag[0].length
//     //         tag_iter = tags.next()
//     //     }
//     //     const push_to_opens = (tag: any) => {
//     //         const syng = tag.groups.tag
//     //         if (SINGLE_TAG.includes(syng)) return

//     //         if (tag[0].includes('/') && !opens.includes(syng)) return

//     //         if (!tag[0].includes('/'))
//     //             opens.push(syng)
//     //         else
//     //             opens.pop()
//     //     }
//     //     const exceptions = (tag: any) => {
//     //         const syng = tag.groups.tag
//     //         if (SINGLE_TAG.includes(syng)) {
//     //             const segment: Cell = new Cell('', [], [syng])
//     //             if (opens.length != 0)
//     //                 segment.decorators = [...opens]
//     //             cells.push(segment)
//     //         }
//     //     }

//     //     const smoother = (tag: any) => {
//     //         close_loop(tag)
//     //         exceptions(tag)
//     //         push_to_opens(tag)
//     //     }

//     //     while (!tag_iter.done) {
//     //         const tag = tag_iter.value
//     //         const part = html.slice(last_index, tag.index)

//     //         if (part == '') {
//     //             smoother(tag)
//     //             continue
//     //         }
//     //         const cell: Cell = new Cell(part)
//     //         if (opens.length != 0)
//     //             cell.decorators = [...opens]
//     //         cells.push(cell)

//     //         smoother(tag)
//     //     }

//     //     const tail = html.slice(last_index)
//     //     if (tail)
//     //         cells.push(new Cell(tail))

//     //     this.parts = cells.length
//     //     this.cells = cells
//     //     return this
//     // }
//     // xD htmlify
//     to_chain(html: string): Chain {
//         html = html.replaceAll(regex.cleaner, '')



//         return this
//     }
//     htmlify(cells: Cell[] = th is.cells): string {
//         let html = ''
//         cells.forEach(cell => {
//             html += cell.htmlify()
//         })
//         while (html.match(/<\/(\w)><\1>/gm))
//             html = html.replaceAll(/<\/(\w)><\1>/gm, '')
//         this.html = html
//         return this.html
//     }
//     // 
//     wrapper(select: Selection): Wrapper {
//         const each = (method_name: 'wrap' | 'unwrap' | 'toggle', wrappers: string[]) => {
//             this.split_by_select(select)
//             select = select.reload()
//             select.data.cells.forEach(cell => {
//                 wrappers.forEach(wrapper => {
//                     cell.wrapper(wrapper)?.[method_name]()
//                 })
//             })
//         }
//         return {
//             wrap: (...wrappers: string[]) => {
//                 each('wrap', wrappers)
//                 return this
//             },
//             unwrap: (...wrappers: string[]) => {
//                 each('unwrap', wrappers)
//                 return this
//             },
//             toggle: (...wrappers: string[]) => {
//                 each('toggle', wrappers)
//                 return this
//             }
//         }
//     }
// }

export class Chain {
    text: string
    html: string
    cells: Cell[] = []
    constructor(html: string) {
        this.text = this.pure(html)
        this.html = html.replaceAll(regex.cleaner, '')
        this.parse()
    }
    pure(html: string): string { return html.replaceAll(regex.html_tag, '').replaceAll(regex.cleaner, '') }
    inspect(full = false) {
        return this.cells.map(item => item.inspect(full))
    }
    parse() {
        const tag_points = this.html.matchAll(regex.html_tag)
        const open_tags: string[] = []
        const ranges: number[][] = []
        let index = 0
        if (this.html.match(regex.html_tag)) {
            for (const point of tag_points) {
                //ranges.push([index, point.index])
                const text = this.html.slice(index, point.index)
                const cell = new Cell(this.html.slice(index, point.index))

                if (point.groups.attr_name)
                    cell.attributes.push({
                        key: point.groups.attr_name as AttributesKinds, value: point.groups.attr_value, tag: point.groups.tag
                    })

                cell.wrappers = [...open_tags]

                if (text != '' || cell.attributes.length != 0)
                    this.cells.push(cell)

                if (SINGLE_TAG.includes(point.groups.tag))
                    this.cells.push(new Cell('', [point.groups.tag]))
                else
                    if (point.groups.close) {
                        open_tags.pop()
                    } else
                        open_tags.push(point.groups.tag)

                console.log(text, open_tags)


                // //==========
                // this.decorators.push(cell.groups.tag)
                // this.children.push(
                //     new Cell(cell.groups.text)
                // )
                index = point.index + point[0].length
            }
            this.cells.push(new Cell(this.html.slice(index)))
            //ranges.push([index, this.html.length])
            // console.log(this.cells)
            // console.log(ranges.map(item => this.html.slice(item[0], item[1])))
        }

        console.log(this.cells)
    }
}