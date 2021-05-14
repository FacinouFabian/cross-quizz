import * as React from 'react'
import { gql } from 'graphql-request'
import moment from 'moment'

import api from '@/lib/api'
import Layout from '@/core/layouts/Showcase'
import { useUser } from '@/core/contexts/userContext'

type Data = {
  score: Score[]
}

export const Home: React.FunctionComponent = (): JSX.Element => {
  const [user] = useUser()
  const [data, setData] = React.useState<Data>({
    score: [],
  })
  const { id } = user

  const getUserScores = async () => {
    const query = gql`
    {
      score(userID: ${id}) {
        id
        score
        time
        createdAt
      }
    }
  `

    const data: any = await api<any>(query)

    setData(data)
  }

  React.useEffect(() => {
    getUserScores()
  }, [])

  return (
    <Layout title="Home">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Score
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Temps
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Résultat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.score.map(({ score, createdAt, time }, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {moment(createdAt).locale('fr').format('LLL')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              score >= 4 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {score >= 4 ? 'Réussi' : 'Raté'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
    </Layout>
  )
}

export default Home
