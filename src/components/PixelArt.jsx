// Renders a bitmap (array of strings) as crisp SVG pixels.
// Each character maps to a color via `palette`; unmapped characters are transparent.
export default function PixelArt({ bitmap, palette = { '#': 'currentColor' }, size = 4, className = '', title }) {
  const rects = []
  bitmap.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (palette[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={palette[ch]} />)
    }),
  )
  return (
    <svg
      viewBox={`0 0 ${bitmap[0].length} ${bitmap.length}`}
      width={bitmap[0].length * size}
      height={bitmap.length * size}
      shapeRendering="crispEdges"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  )
}

export const ICONS = {
  trophy: ['#.####.#', '########', '#.####.#', '.######.', '..####..', '...##...', '..####..', '.######.'],
  medal: ['#......#', '.#....#.', '..####..', '.######.', '.##..##.', '.##..##.', '.######.', '..####..'],
  star: ['...##...', '...##...', '########', '.######.', '..####..', '.##..##.', '.#....#.', '........'],
  terminal: ['########', '#......#', '#.#....#', '#..#...#', '#.#.##.#', '#......#', '########', '........'],
  chart: ['......#.', '......#.', '....#.#.', '....#.#.', '..#.#.#.', '..#.#.#.', '#.#.#.#.', '########'],
  flag: ['#######.', '#######.', '#######.', '#.......', '#.......', '#.......', '#.......', '##......'],
  lock: ['..####..', '.#....#.', '.#....#.', '########', '###..###', '###..###', '########', '........'],
  coin: ['..####..', '.######.', '###..###', '###.####', '###.####', '###..###', '.######.', '..####..'],
  heart: ['.##..##.', '########', '########', '########', '.######.', '..####..', '...##...', '........'],
}

// Chess-knight player sprite. '#' body, 'o' highlight, 'e' eye.
export const KNIGHT = [
  '................',
  '......##........',
  '.....#oo#.......',
  '....#oooo##.....',
  '...#ooeooo##....',
  '..#oooooooo##...',
  '.#ooooooooo##...',
  '.#oo##.#ooo###..',
  '..##...#ooo###..',
  '......#oooo###..',
  '.....#ooooo##...',
  '....#ooooo##....',
  '...##########...',
  '..#oooooooooo#..',
  '..############..',
  '................',
]
