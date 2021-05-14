import * as React from 'react'
import Head from 'next/head'
import { MenuIcon } from '@heroicons/react/outline'

import Navigation from '@/components/Nav'
import Transition from '@/components/Transition'

type Props = {
  children: React.ReactNode
  title?: string
}

type NavigationLink = {
  name: string
  href: string
  current: boolean
}

const Showcase: React.FunctionComponent<Props> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navigation: NavigationLink[] = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'My scores', href: '/scores', current: false },
  ]

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{title || 'Welcome'} | Cross Quizz</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <div className="h-screen flex overflow-hidden bg-gray-400">
        <Transition navigation={navigation} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Static sidebar for desktop */}
        <Navigation navigation={navigation} />

        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-hidden focus:outline-none">
            <div className="w-full h-full py-6">
              <div className="w-full h-auto mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4 w-full h-full">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Showcase
