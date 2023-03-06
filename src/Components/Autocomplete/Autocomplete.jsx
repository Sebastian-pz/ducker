/* eslint-disable react/prop-types */
import Options from './Options'

const Autocomplete = ({ options, handleSelection, top, left }) => {
  return (
    <div className='autocomplete-panel' style={{ top, left }}>
      <ul className='autocomplete-items'>
        {options.map(user => {
          return (
            <li key={user.id || Math.round(Math.random() * 100)}>
              <button
                className='autocomplete-item'
                onClick={() => handleSelection(user.nickname)}
              >
                <Options
                  key={`${user.nickname}${Math.round(Math.random() * 10)}`}
                  nickname={user.nickname}
                  fullname={user.fullname}
                  img={user.img}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Autocomplete
