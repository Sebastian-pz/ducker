import { Cuackear } from '..'
import { useContext } from 'react'
import { SidebarContext } from '../Sidebar/Sidebar'

const CuackearContainer = () => {
  const { setSidebarSection } = useContext(SidebarContext)

  function handleClose(e) {
    e.preventDefault()
    setSidebarSection('default')
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
        <SidebarContext.Provider value={setSidebarSection}>
          <Cuackear />
        </SidebarContext.Provider>
      </div>
    </div>
  )
}

export default CuackearContainer
