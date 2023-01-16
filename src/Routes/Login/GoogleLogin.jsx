import axios from 'axios'

export const GoogleLoginButton = () => {
  async function googleScript() {
    return await axios.get('https://accounts.google.com/gsi/client')
  }

  function handleCredentialResponse(response) {
    const body = { id_token: response.credential }

    fetch('http://localhost:3001/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        localStorage.setItem('email', resp.user.email)
      })
      .catch(console.warn)
  }

  return (
    <div>
      <script src={googleScript} async defer />
      <script src={handleCredentialResponse} async defer />
      {googleScript}
      {handleCredentialResponse}
      <div
        id='g_id_onload'
        data-client_id='822266228699-vkgkd1nf47m4g75glodk1u8ftb8fl18c.apps.googleusercontent.com'
        data-auto_prompt='false'
        data-callback='handleCredentialResponse'
      ></div>
      <div
        className='g_id_signin'
        data-type='standard'
        data-size='large'
        data-theme='outline'
        data-text='sign_in_with'
        data-shape='rectangular'
        data-logo_alignment='left'
      ></div>
    </div>
  )
}

export default GoogleLoginButton
