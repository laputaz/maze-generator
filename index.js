const randomDeg = () =>
    ['45deg', '135deg', '225deg', '315deg'][Math.round(Math.random() * 3)]
const setGridStyle = (grid, portionX, portionY, lineColor) => {
    grid.style.setProperty('--x-portion', portionX)
    grid.style.setProperty('--y-portion', portionY)
    grid.style['display'] = 'grid'
    grid.style['gridTemplateColumns'] = 'repeat(var(--x-portion), 1fr)'
    grid.style['gridTemplateRows'] = 'repeat(var(--y-portion), 1fr)'
    grid.style['overflow'] = 'hidden'
    grid.style['gridAutoFlow'] = 'row dense'
    grid.style['cursor'] = 'pointer'
    let style = document.createElement('style')
    style.innerText = `.maze-generator-cell{position:relative;height:100%}.maze-generator-cell::before{transform:scale(1.41)rotate(var(--deg));content:"";display:block;width:1px;background-color:${lineColor};margin:0 auto;height:100%;transition:all var(--second);will-change:transform}`
    document.body.appendChild(style)
}
const setcellStyle = (cell, cellSize) => {
    cell.className = 'maze-generator-cell'
    cell.style.setProperty('--deg', randomDeg())
    cell.style.setProperty('--second', `${Math.random() * 0.5}s`)
    cell.style.setProperty('grid-column-start', `span ${cellSize}`)
    cell.style.setProperty('grid-row-start', `span ${cellSize}`)
}
const createMaze = ({
    el = '#app',
    gridSize = 10,
    cellSize = 2,
    lineColor = '#000',
}) => {
    let grid = document.querySelector(`${el}`)
    let fragment = document.createDocumentFragment()
    const portionX = gridSize
    const portionY = Math.round(grid.clientHeight / (grid.clientWidth / gridSize))
    setGridStyle(grid, portionX, portionY, lineColor)
    let count = (portionX * portionY) / cellSize ** 2
    let cells = []
    while (count > 0) {
        let cell = document.createElement('div')
        setcellStyle(cell, cellSize)
        cells.push(cell)
        fragment.appendChild(cell)
        count--
    }
    grid.appendChild(fragment)
    grid.onclick = () => {
        cells.forEach((el) => {
            el.style.setProperty('--deg', randomDeg())
        })
    }
}
export default createMaze
