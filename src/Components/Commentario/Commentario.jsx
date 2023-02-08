// /* eslint-disable space-before-function-paren */
// import axios from 'axios'
// import { useEffect } from 'react'
// import PropTypes from 'prop-types'

// const Comentario = ({ comment }) => {
//   const id = comment.author

//   async function userCommentInfo(id) {
//     const user = await axios.get(`http://localhost:3001/users/${id}`)
//     return user
//   }

//   useEffect(() => {
//     userCommentInfo(id)
//   }, [id])

//   return (
//     <div>
//       <img src={user && user.data.img} />
//       <h1>{user && user.data.fullname}</h1>

//       <p>{user && user.data.nickname}</p>
//       <p>{comment.content}</p>
//     </div>
//   )
// }

// Comentario.propTypes = {
//   comment: PropTypes.object,
// }

// export default Comentario
