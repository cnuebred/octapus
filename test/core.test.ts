import { Chain } from '../src/core'
import { Cell } from '../src/cell'



describe('Core html <=> json', () => {
    const html = `
    Here is <b>some</b> text <u>with <i>some</i></u> different 
    <s>tags, <b>so I</b> need</s> to <pre><u>check</u></pre> <br>
    how it exactly <code>works</code> ;)
    `
    const chain = new Chain(html)
    it('pure text - without tags', () => {
        expect(chain.text).toBe('Here is some text with some different tags, so I need to check how it exactly works ;)')
    })
    const json = chain.inspect()
    it('html to chain - cells', () => {
        expect(json).toEqual(
            [
                { text: 'Here is ', },
                { text: 'some', wrappers: ['b'] },
                { text: ' text ' },
                { text: 'with ', wrappers: ['u'] },
                { text: 'some', wrappers: ['u', 'i'], },
                { text: ' different ', },
                { text: 'tags, ', wrappers: ['s'], },
                { text: 'so I', wrappers: ['s', 'b'], },
                { text: ' need', wrappers: ['s'], },
                { text: ' to ', },
                { text: 'check', wrappers: ['pre', 'u'], },
                { text: ' ' },
                { text: '', wrappers: ['br'] },
                { text: 'how it exactly ', },
                { text: 'works', wrappers: ['code'], },
                { text: ' ;)', }
            ]
        )
    })
    // it('chain to html', () => {
    //     expect(chain.htmlify()).toBe(html.replace(/\n\s*/gm, ''))
    // })



})
// describe('Selection', () => {
//     const html = `
//     Here is <b>some</b> text <u>with <i>some</i></u>
//     different <s>tags, <b>so I</b> need</s> to <pre><u>check</u></pre> <br>
//     how it exactly <code>works</code> ;)
//     `
//     const chain = new Chain(html)
//     it('select - easy', () => {
//         const cell_to_pass = chain.cells[7]
//         expect(chain.select('so I', 0).data).toEqual({
//             index: 44,
//             cell_index: [7],
//             index_in_cell: [0, 4],
//             cells: [cell_to_pass]
//         })
//     })
//     it('select - mid #1', () => {
//         const cell_to_pass_1 = chain.cells[5]
//         expect(chain.select('diff', 0).data).toEqual({
//             index: 28,
//             cell_index: [5],
//             index_in_cell: [1, 5],
//             cells: [cell_to_pass_1]
//         })
//     })
//     it('select - mid #2', () => {
//         const cell_to_pass_1 = chain.cells[5]
//         const cell_to_pass_2 = chain.cells[6]
//         console.log(cell_to_pass_1)
//         expect(chain.select('ifferent ta', 0).data).toEqual({
//             index: 29,
//             cell_index: [5, 6],
//             index_in_cell: [2, 2],
//             cells: [cell_to_pass_1, cell_to_pass_2]
//         })
//     })
//     it('select - mid #3', () => {
//         const cell_to_pass_1 = chain.cells[5]
//         const cell_to_pass_2 = chain.cells[6]
//         const cell_to_pass_3 = chain.cells[7]
//         expect(chain.select(' tags, so', 0).data).toEqual({
//             index: 37,
//             cell_index: [5, 6, 7],
//             index_in_cell: [10, 2],
//             cells: [cell_to_pass_1, cell_to_pass_2, cell_to_pass_3]
//         })
//     })
//     it('select - mid #4', () => {
//         const cell_to_pass_1 = chain.cells[13]
//         const cell_to_pass_2 = chain.cells[14]
//         const cell_to_pass_3 = chain.cells[15]
//         expect(chain.select('tly works ;', 0).data).toEqual({
//             index: 74,
//             cell_index: [13, 14, 15],
//             index_in_cell: [11, 2],
//             cells: [cell_to_pass_1, cell_to_pass_2, cell_to_pass_3]
//         })
//     })
//     it('select - hard', () => {
//         const cell_to_pass_1 = chain.cells[4]
//         const cell_to_pass_2 = chain.cells[0]
//         const cell_to_pass_3 = chain.cells[5]
//         expect(chain.select('some', 10).data).toEqual({
//             index: 23,
//             cell_index: [4],
//             index_in_cell: [0, 4],
//             cells: [cell_to_pass_1]
//         })
//         expect(chain.select('er', 0).data).toEqual({
//             index: 1,
//             cell_index: [0],
//             index_in_cell: [1, 3],
//             cells: [cell_to_pass_2]
//         })
//         expect(chain.select('er', 3).data).toEqual({
//             index: 32,
//             cell_index: [5],
//             index_in_cell: [5, 7],
//             cells: [cell_to_pass_3]
//         })
//     })
//     it('select all', () => {
//         const all_selected = chain.select_all()
//         expect(all_selected.data).toEqual({
//             index: 0,
//             index_in_cell: [0, 85],
//             cell_index: [0, 15],
//             cells: chain.cells
//         })
//     })
// })
// describe('Split cells', () => {
//     const html = `
//     Here is <b>some</b> text <u>with <i>some</i></u>
//     different <s>tags, <b>so I</b> need</s> to <pre><u>check</u></pre> <br>
//     how it exactly <code>works</code> ;)
//     `
//     const core = new Chain(html)
//     it('Basic split', () => {
//         const selection = core.select('om', 0).data
//         expect(selection.cell_index).toEqual([1])
//         expect(selection.cells[0].split(selection.index_in_cell[0]))
//             .toEqual([new Cell('s', ['b']), new Cell('ome', ['b'])])
//     })
//     it('split cells #1', () => {
//         const selection = core.select('me text')
//         core.split_by_select(selection)

//         expect(core.inspect()).toEqual(
//             [
//                 {
//                     text: 'Here is ',
//                 },
//                 {
//                     text: 'so',
//                     decorators: ['b'],
//                 },
//                 {
//                     text: 'me',
//                     decorators: ['b'],
//                 },
//                 { text: ' text' },
//                 { text: ' ' },
//                 {
//                     text: 'with ',
//                     decorators: ['u'],
//                 },
//                 {
//                     text: 'some',
//                     decorators: ['u', 'i'],
//                 },
//                 {
//                     text: 'different ',
//                 },
//                 {
//                     text: 'tags, ',
//                     decorators: ['s'],
//                 },
//                 {
//                     text: 'so I',
//                     decorators: ['s', 'b'],
//                 },
//                 {
//                     text: ' need',
//                     decorators: ['s'],
//                 },
//                 { text: ' to ' },
//                 {
//                     text: 'check',
//                     decorators: ['pre', 'u'],
//                 },
//                 { text: ' ' },
//                 {
//                     text: '',
//                     functionality: ['br'],
//                 },
//                 {
//                     text: 'how it exactly ',
//                 },
//                 {
//                     text: 'works',
//                     decorators: ['code'],
//                 },
//                 { text: ' ;)' }
//             ]
//         )
//     })
//     it('split cells #2', () => {
//         const selection = core.select('ck how it exa')
//         core.split_by_select(selection)
//         expect(core.inspect()).toEqual(
//             [
//                 {
//                     text: 'Here is ',
//                 },
//                 {
//                     text: 'so',
//                     decorators: ['b'],
//                 },
//                 {
//                     text: 'me',
//                     decorators: ['b'],
//                 },
//                 { text: ' text', },
//                 { text: ' ', },
//                 {
//                     text: 'with ',
//                     decorators: ['u'],
//                 },
//                 {
//                     text: 'some',
//                     decorators: ['u', 'i'],
//                 },
//                 {
//                     text: 'different ',
//                 },
//                 {
//                     text: 'tags, ',
//                     decorators: ['s'],
//                 },
//                 {
//                     text: 'so I',
//                     decorators: ['s', 'b'],
//                 },
//                 {
//                     text: ' need',
//                     decorators: ['s'],
//                 },
//                 { text: ' to ', },
//                 {
//                     text: 'che',
//                     decorators: ['pre', 'u'],
//                 },
//                 {
//                     text: 'ck',
//                     decorators: ['pre', 'u'],
//                 },
//                 { text: ' ', },
//                 {
//                     text: '',
//                     functionality: ['br'],
//                 },
//                 {
//                     text: 'how it exa',
//                 },
//                 { text: 'ctly ', },
//                 {
//                     text: 'works',
//                     decorators: ['code'],
//                 },
//                 { text: ' ;)', }
//             ]
//         )
//     })
// })
// describe('Chain operations', () => {
//     const html = `
//         Here is new html text, with bold, with italic, with both ;)
//     `
//     const core = new Chain(html)
//     it('wrap, unwrap, toggle - selected', () => {
//         const selection_1 = core.select('with bold')
//         core.wrapper(selection_1).wrap('b').htmlify()
//         expect(core.html).toBe(
//             'Here is new html text, <b>with bold</b>, with italic, with both ;)'
//         )

//         const selection_2 = core.select('with italic')
//         core.wrapper(selection_2).wrap('i').htmlify()
//         expect(core.html).toBe(
//             'Here is new html text, <b>with bold</b>, <i>with italic</i>, with both ;)'
//         )
//         const selection_3 = core.select('with both')
//         core.wrapper(selection_3).wrap('b', 'i').htmlify()
//         expect(core.html).toBe(
//             'Here is new html text, <b>with bold</b>, <i>with italic</i>, <b><i>with both</i></b> ;)'
//         )
//         core.wrapper(selection_1.reload()).unwrap('b').htmlify()
//         expect(core.html).toBe(
//             'Here is new html text, with bold, <i>with italic</i>, <b><i>with both</i></b> ;)'
//         )
//         core.wrapper(selection_1.reload()).wrap('b').htmlify()
//         expect(core.html).toBe(
//             'Here is new html text, <b>with bold</b>, <i>with italic</i>, <b><i>with both</i></b> ;)'
//         )
//         core.wrapper(selection_3.reload()).toggle('b', 's').htmlify()
//         core.wrapper(core.select('text, ')).toggle('b').htmlify()

//         expect(core.html).toBe(
//             'Here is new html <b>text, with bold</b>, <i>with italic</i>, <i><s>with both</s></i> ;)'
//         )
//     })
// })