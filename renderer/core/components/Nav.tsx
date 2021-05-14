import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LogoutIcon } from '@heroicons/react/outline'

import { useUser } from '@/core/contexts/userContext'

type NavigationLink = {
  name: string
  href: string
}

type Props = {
  navigation: NavigationLink[]
}

export const Nav: React.FunctionComponent<Props> = ({ navigation }): JSX.Element => {
  const router = useRouter()
  const [user, dispatch] = useUser()
  const { firstname, lastname } = user

  const logOut = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        email: undefined,
        firstname: undefined,
        lastname: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
    })
    router.push('/auth/signin')
  }

  const arMenus = navigation.map(({ href, name }, index) => (
    <Link key={index} href={href}>
      <a
        className={`${
          router.pathname === href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
        group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
      >
        {name}
      </a>
    </Link>
  ))

  return (
    <>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">{arMenus}</nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {firstname} {lastname}
                    </p>
                  </div>
                  <div className="ml-3">
                    <LogoutIcon className="h-6 w-6 text-white" onClick={logOut} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
