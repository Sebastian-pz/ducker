/* eslint-disable no-undef */
import axios from 'axios'
import { useEffect } from 'react'

export const GoogleLoginButton = () => {
  async function handleCallbackResponse(response) {
    try {
      const body = { id_token: response.credential }
      const resp = await axios.post('http://localhost:3001/auth/google', body)
      const token = resp.data.token
      localStorage.setItem('Authorization', token)

      setTimeout(() => {
        window.location.replace('/')
      }, 1 * 1000)
    } catch (error) {}
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '822266228699-vkgkd1nf47m4g75glodk1u8ftb8fl18c.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'medium',
      shape: 'pill',
      logo_alignment: 'left',
      width: '15vw',
    })
  }, [])

  return (
    <div>
      <div id='signInDiv'></div>
    </div>
  )
}

export default GoogleLoginButton
