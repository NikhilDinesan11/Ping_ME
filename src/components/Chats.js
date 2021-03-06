import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from '../contexts/AuthContext'

import { auth } from '../firebase'

export default function Chats () {
  const didMountRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout () {
    await auth.signOut()
    history.push('/')
  }

  async function getFile (url) {
    const response = await fetch(url)
    const data = await response.blob()
    return new File([data], 'test.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push('/')
        return
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'project-id': '6ff13e28-508d-4b20-b21b-eb86c83c50e7',
            'user-name': user.email,
            'user-secret': user.uid
          }
        })

        .then(() => setLoading(false))

        .catch((e) => {
          const formdata = new FormData()
          formdata.append('email', user.email)
          formdata.append('username', user.email)
          formdata.append('secret', user.uid)

          getFile(user.photoURL).then((avatar) => {
            formdata.append('avatar', avatar, avatar.name)

            axios
              .post('https://api.chatengine.io/users/', formdata, {
                headers: {
                  'private-key': '03eeb400-d1f6-4ced-895c-f26ba9a1f6db'
                }
              })
              .then(() => setLoading(false))
              .catch((e) => console.log('e', e.response))
          })
        })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history])

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>PING-ME</div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='6ff13e28-508d-4b20-b21b-eb86c83c50e7'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}
