const microcosmNames = [
  'sample-microcosm',
  'testing',
  'collaborative-session-3',
  'studio-workshop',
  'sample-microcosm2ds',
  'testing23dd',
  'collaboratisdfdve-session-3',
  'studio-workshosssp',
]

export const microcosms = {}

const randomInt = (minimum, maximum) => {
  if (maximum === undefined) {
    maximum = minimum
    minimum = 0
  }

  if (typeof minimum !== 'number' || typeof maximum !== 'number') {
    throw new TypeError('Expected all arguments to be numbers')
  }

  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum)
}

// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF'
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

// const shallowRemoveFromArray = (arr, item) => {
//   const newArray = [...arr]
//   const index = arr.indexOf(item)
//   if (index > -1) {
//     newArray.splice(index, 1)
//   }
//   return newArray
// }

const randomTextString = (length, spaces = true) => {
  let result = ''
  const characters = `${
    spaces ? '        ' : ''
  }ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const colors = [
  '#FFFFFF',
  '#FFD8E1',
  '#EEFFBC',
  '#CDEAFF',
  '#FFD8CC',
  '#DAD9FE',
  '#FFF3CA',
]

const s1 = `
# Headline here is my headline
## Hello again
Here is some **text**
`
const s2 = `
# Something 😃
`

const s3 = `
Testing something here
`

const s4 = `
Another headline
`

const md = [s1, s2, s3, s4]
microcosmNames.forEach((m) => {
  const nodes = []
  const num = randomInt(3, 25)
  // const num = 20
  for (let i = 0; i < num; i++) {
    nodes.push({
      node_id: randomTextString(15, false),
      backgroundColor: colors[randomInt(0, colors.length - 1)],
      text: md[randomInt(0, md.length - 1)],
      width: randomInt(300, 600),
      height: randomInt(300, 600),
      fontSize: randomInt(16, 36),
      position: {
        x: Math.random() * 2000,
        y: Math.random() * 2000,
      },
    })
  }

  microcosms[m] = {
    microcosm_id: m,
    nodes,
  }
})

export const generateNode = () => {
  return {
    node_id: randomTextString(15, false),
    createdAt: new Date().toISOString(),
    backgroundColor: colors[randomInt(0, colors.length - 1)],
    text: md[randomInt(0, md.length - 1)],
    width: randomInt(300, 600),
    height: randomInt(300, 600),
    fontSize: randomInt(16, 36),
    position: {
      x: Math.random() * 2000,
      y: Math.random() * 2000,
    },
  }
}

export const generateMicrocosm = () => {
  const nodes = []
  const num = randomInt(3, 25)
  // const num = 20
  for (let i = 0; i < num; i++) {
    nodes.push(generateNode())
  }

  return nodes
}
