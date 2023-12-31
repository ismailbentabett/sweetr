// components/GuestLayout.tsx

import { useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { useAuth } from '../../context/authContext'

interface GuestLayoutProps {
  children:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined
}

const GuestLayout = (props: GuestLayoutProps) => {
  const { isAuthenticated } = useAuth() as any
  const navigate = useNavigate()

  createEffect(() => {
    if (
      isAuthenticated() ||
      localStorage.getItem('isAuthenticated') === 'true'
    ) {
      navigate('/')
    }
  })

  return <>{props.children}</>
}

export default GuestLayout
