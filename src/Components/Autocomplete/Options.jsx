/* eslint-disable react/prop-types */

const Options = ({ nickname, fullname, img }) => {
  return (
    <div className='account-body'>
      <div className='account-avatar'>
        <img src={img} alt={'Imagen de perfil'} />
      </div>

      <div>
        <div className='account-name'>{fullname}</div>

        <div className='account-handle'>{nickname}</div>
      </div>
    </div>
  )
}

export default Options
