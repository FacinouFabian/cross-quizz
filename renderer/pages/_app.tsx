import * as React from 'react'
import type { AppProps } from 'next/app'

import '@/layouts/styles/tailwind.css'
import '@/layouts/styles/index.css'
import User, { UserProvider } from '@/core/contexts/userContext'

/**
 * @description component to initialize pages
 */
export const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <UserProvider {...User}>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </UserProvider>
  )
}

export default MyApp
