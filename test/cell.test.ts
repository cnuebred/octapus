import { Cell } from '../src/cell'



describe('Cell - structure', () => {
    it('create cell', () => {
        const text = 'Here is text for cell'
        const cell = new Cell(text)
        expect(cell.text).toBe('Here is text for cell')
    })

    const text = 'Here is new text'
    it('text -> cell - typical text', () => {
        const cell = new Cell(text)
        expect(cell.text).toBe('Here is new text')
        expect(cell.wrappers).toEqual([])
        expect(cell.attributes).toEqual([])
    })
    it('text -> cell - wrapper wrap #1', () => {
        const cell = new Cell(text)
        expect(cell.text).toBe('Here is new text')
        cell.wrapper('b').wrap()
        expect(cell.wrappers).toEqual(['b'])
        expect(cell.attributes).toEqual([])

    })
    it('html -> cell - wrapper wrap #2', () => {
        const cell = new Cell(text)
        expect(cell.text).toBe('Here is new text')
        cell.wrapper('b', 'i').wrap()
        expect(cell.wrappers).toEqual(['b', 'i'])
        expect(cell.attributes).toEqual([])
    })
    it('html -> cell - wrapper toggle and unwrap', () => {
        const cell = new Cell(text, ['s', 'h'])

        expect(cell.text).toBe('Here is new text')
        cell.wrapper('s').unwrap()
        cell.wrapper('b', 'h').toggle()
        expect(cell.wrappers).toEqual(['b'])
        expect(cell.attributes).toEqual([])
    })
    it('html -> cell - set attribute', () => {
        const cell = new Cell(text, ['s'])
        cell.set_attribute('s', 'class', 'red_strike')
        expect(cell.text).toBe('Here is new text')
        expect(cell.wrappers).toEqual(['s'])
        expect(cell.attributes).toEqual([{ key: 'class', value: 'red_strike', tag: 's' }])
    })
    it('html -> cell -> html', () => {
        const cell = new Cell(text, ['s'])
        expect(cell.text).toBe('Here is new text')
        expect(cell.wrappers).toEqual(['s'])
        expect(cell.to_html()).toBe('<s>Here is new text</s>')
        cell.wrapper('b').toggle()
        expect(cell.to_html()).toBe('<s><b>Here is new text</b></s>')
        cell.set_attribute('s', 'class', 'red_strike')
        expect(cell.attributes).toEqual([{ key: 'class', value: 'red_strike', tag: 's' }])
        expect(cell.to_html()).toBe('<s class="red_strike"><b>Here is new text</b></s>')
        cell.wrapper('b').toggle()
        expect(cell.to_html()).toBe('<s class="red_strike">Here is new text</s>')
    })
    it('cell split', () => {
        const cell = new Cell(text, ['s'])
        expect(cell.split(5)).toEqual([
            new Cell('Here ', ['s']),
            new Cell('is new text', ['s'])
        ])
        expect(cell.split(5, 9)).toEqual([
            new Cell('Here ', ['s']),
            new Cell('is n', ['s']),
            new Cell('ew text', ['s'])
        ])
        expect(cell.split(5, 9, 16)).toEqual([
            new Cell('Here ', ['s']),
            new Cell('is n', ['s']),
            new Cell('ew text', ['s'])
        ])
    })
})


// describe('Cell class', () => {
//     it('cell -> json', () => {
//         const cell_1 = new Cell('Some text', ['s'])
//         const cell_2 = new Cell('Some text', ['s', 'b'], ['hr'])
//         const cell_3 = new Cell('Some text', ['s', 'b', 'a'], [], { href: 'https://xd.org.edu.com' })
//         expect(cell_1.inspect()).toEqual({
//             text: 'Some text',
//             wrappers: ['s']
//         })
//         expect(cell_2.inspect()).toEqual({
//             text: 'Some text',
//             tag: ['s', 'b'],
//             functionality: ['hr']
//         })
//         expect(cell_3.inspect()).toEqual({
//             text: 'Some text',
//             tag: ['s', 'b', 'a'],
//             attachments: { href: 'https://xd.org.edu.com' }
//         })
//     })
//     it('cell text length', () => {
//         const cell = new Cell('Here is new text')
//         expect(cell.length).toBe(16)
//     })
//     it('wrap, unwrap and toggle', () => {
//         const cell = new Cell('text')
//         expect(cell.tag).toEqual([])
//         cell.wrapper('b').wrap()
//         expect(cell.tag).toEqual(['b'])
//         cell.wrapper('s', 's').wrap()
//         expect(cell.tag).toEqual(['b', 's'])
//         cell.wrapper('b').unwrap()
//         expect(cell.tag).toEqual(['s'])
//         cell.wrapper('u', 'i').wrap()
//         expect(cell.tag).toEqual(['s', 'u', 'i'])
//         cell.wrapper('u').unwrap()
//         expect(cell.tag).toEqual(['s', 'i'])
//         cell.wrapper('i', 's').unwrap()
//         expect(cell.tag).toEqual([])
//         cell.wrapper('code').toggle()
//         expect(cell.tag).toEqual(['code'])
//         cell.wrapper('code', 'u').toggle()
//         expect(cell.tag).toEqual(['u'])
//     })
//     it('set attachment', () => {
//         const cell = new Cell('Here is link')
//         cell.wrapper('a').wrap()
//         cell.set_attachment('href', 'https://xd.com')
//         expect(cell.inspect()).toEqual({
//             text: 'Here is link',
//             tag: ['a'],
//             attachments: { href: 'https://xd.com' }
//         })
//     })
//     it('cell htmlify #1', () => {
//         const cell = new Cell('Here is new text', ['s'])
//         expect(cell.htmlify()).toBe('<s>Here is new text</s>')
//         cell.wrapper('u').wrap()
//         expect(cell.htmlify()).toBe('<s><u>Here is new text</u></s>')
//         cell.wrapper('a').wrap()
//         cell.set_attachment('href', 'https://xd.com')
//         expect(cell.htmlify()).toBe('<s><u><a href="https://xd.com">Here is new text</a></u></s>')
//     })
// })
// describe('Cell - split', () => {
//     it('split cell #1', () => {
//         const cell = new Cell('Here is new text')
//         expect(cell.split(5)).toEqual([
//             new Cell('Here '),
//             new Cell('is new text')
//         ])
//         expect(cell.split(2, 6)).toEqual([
//             new Cell('He'),
//             new Cell('re i'),
//             new Cell('s new text')
//         ])
//         expect(cell.split(2, 6, 15)).toEqual([
//             new Cell('He'),
//             new Cell('re i'),
//             new Cell('s new tex'),
//             new Cell('t'),
//         ])
//         expect(cell.split(2, 6, 16)).toEqual([
//             new Cell('He'),
//             new Cell('re i'),
//             new Cell('s new text'),
//         ])
//         expect(cell.split(0, 6, 16)).toEqual([
//             new Cell('Here i'),
//             new Cell('s new text'),
//         ])
//     })
//     it('split cell #2', () => {
//         const cell = new Cell('Here is new text', ['s'])
//         expect(cell.split(5)).toEqual([
//             new Cell('Here ', ['s']),
//             new Cell('is new text', ['s'])
//         ])
//     })
// })