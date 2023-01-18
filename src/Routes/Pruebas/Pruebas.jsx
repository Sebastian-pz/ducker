import Cuack from '../../Components/Cuack/Cuack'
import Cuackear from '../../Components/Cuackear/Cuackear'

const cuacks = [
  {
    fullname: 'Juan Alberto',
    nickname: '@sebastiantfa',
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
      <Cuackear />
      {cuacks.map(cuack => {
        return <Cuack cuackinfo={cuack} key={cuack.nickname} />
      })}
    </div>
  )
}

export default Pruebas
