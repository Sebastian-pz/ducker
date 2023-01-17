import Cuack from '../../Components/Cuack/Cuack'

const cuacks = [
  {
    fullname: 'Juan Alberto',
    nickname: '@juancitoalbertito',
    content: 'Hola mundo, este soy yo, Juan Albertito',
    likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
    recuacks: ['a', 'b'],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Pistacho',
    nickname: '@jpistacho',
    content: 'Hola!, odio el mundo',
    likes: ['a'],
    recuaks: [],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Alberto',
    nickname: '@juancitoalbertito',
    content: 'Hola mundo, este soy yo, Juan Albertito',
    likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
    recuacks: ['a', 'b'],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Pistacho',
    nickname: '@jpistacho',
    content: 'Hola!, odio el mundo',
    likes: ['a'],
    recuaks: [],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Alberto',
    nickname: '@juancitoalbertito',
    content: 'Hola mundo, este soy yo, Juan Albertito',
    likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
    recuacks: ['a', 'b'],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Pistacho',
    nickname: '@jpistacho',
    content: 'Hola!, odio el mundo',
    likes: ['a'],
    recuaks: [],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Alberto',
    nickname: '@juancitoalbertito',
    content: 'Hola mundo, este soy yo, Juan Albertito',
    likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
    recuacks: ['a', 'b'],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Pistacho',
    nickname: '@jpistacho',
    content: 'Hola!, odio el mundo',
    likes: ['a'],
    recuaks: [],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Alberto',
    nickname: '@juancitoalbertito',
    content: 'Hola mundo, este soy yo, Juan Albertito',
    likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
    recuacks: ['a', 'b'],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
  {
    fullname: 'Juan Pistacho',
    nickname: '@jpistacho',
    content: 'Hola!, odio el mundo',
    likes: ['a'],
    recuaks: [],
    responses: [
      {
        author: '12354',
        content: 'Jesucristo te ama',
      },
    ],
  },
]

const Pruebas = () => {
  return (
    <div>
      <h3>Bienvenido a la página Pruebas 💥</h3>
      {cuacks.map(cuack => {
        return <Cuack cuackinfo={cuack} key={cuack.nickname} />
      })}
    </div>
  )
}

export default Pruebas
