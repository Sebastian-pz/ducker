import { Cuackear } from '..'
import { useContext } from 'react'
import { SidebarContext } from '../Sidebar/Sidebar'

const CuackearContainer = () => {
  const { setSection } = useContext(SidebarContext)

  function handleClose(e) {
    e.preventDefault()
    setSection('default')
  }

  return (
    <div className='cuackearSidebar'>
      <div className='cuackearSidebar2'>
        <button
          className='cuackearSidebar-button'
          onClick={e => handleClose(e)}
        >
          X
        </button>
        <Cuackear />
      </div>
    </div>
  )
}

export default CuackearContainer
