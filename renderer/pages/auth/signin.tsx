import * as React from 'react'
import { gql } from 'graphql-request'
import Link from 'next/link'
import { useRouter } from 'next/router'

import api from '@/lib/api'
import { useUser } from '@/core/contexts/userContext'

export const Home: React.FunctionComponent = (): JSX.Element => {
  const [, dispatch] = useUser()
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const router = useRouter()

  const signIn = async () => {
    const query = gql`
      mutation {
        signin(email: "${email}", password: "${password}") {
          id
          email
          encryptedPassword
          firstname
          lastname
          createdAt
          updatedAt
        }
      }
    `

    await api<any>(query)
      .then((data) => {
        const { id, email, firstname, lastname, createdAt, updatedAt } = data.signin
        const payload = { id, email, firstname, lastname, createdAt, updatedAt }

        dispatch({ type: 'UPDATE_USER', payload })
        router.push('/')
      })
      .catch(() => {
        setError('Mauvais identifiant ou mot de passe.')
      })
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="w-full text-right">
                <Link href="/auth/signup">
                  <span className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    You dont have an account ? Sign up!
                  </span>
                </Link>
              </div>

              <span className={`${error.length === 0 && 'hidden'} text-red-400`}>{error}</span>

              <div>
                <button
                  type="button"
                  onClick={signIn}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  )
}

export default Home
