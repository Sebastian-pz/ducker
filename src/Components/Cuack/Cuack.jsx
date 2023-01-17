/* eslint-disable react/prop-types */
const Cuack = props => {
  const { cuackinfo } = props

  console.log(props)

  if (!cuackinfo) {
    return (
      <div>
        <h3>Ooopss!</h3>
        <h5>
          Lo sentimos, el cack que está buscando no se encuentra disponible
        </h5>
      </div>
    )
  }

  const { nickname, fullname, likes, recuacks, responses, content } = cuackinfo
  return (
    <article>
      <b>{fullname}</b>
      <br />
      <b>{nickname}</b>
      <p>{content}</p>
      <p>Likes: {likes ? likes.length : 0}</p>
      <p>Recuacks: {recuacks ? recuacks.length : 0}</p>
      <p>Responses: {responses ? responses.length : 0}</p>
      <br />
      <br />
      <br />
      <br />
    </article>
  )

  // Nickname - fullname - content - likes - recuack - responses - profile picture
}

// Cuack.propTypes = {
//   cuackInfo: {
//     nickname: react.PropTypes.string,
//     fullname: react.PropTypes.string,
//     content: react.PropTypes.string,
//     likes: react.PropTypes.array,
//     recuack: react.PropTypes.array,
//     responses: react.PropTypes.array,
//   },
// }

export default Cuack
