// /* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import PropTypes from 'prop-types'
import { getComments } from '../../Features/Cuack/cuackFunctions'
import Cuack from '../Cuack/Cuack'

const Comentario = ({ comment, previous }) => {
  function display() {
    return (
      <Cuack
        cuackinfo={comment}
        // hide={['thread:hidden']}
        action={() => getComments(previous)}
      />
    )
  }

  return display()
}

Comentario.propTypes = {
  comment: PropTypes.object,
  previous: PropTypes.string,
}

export default Comentario
