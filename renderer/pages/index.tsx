import * as React from 'react'
import type { GetStaticProps } from 'next'
import { gql } from 'graphql-request'
import { sum } from 'lodash'
import { useRouter } from 'next/router'

import api from '@/lib/api'
import Layout from '@/core/layouts/Showcase'
import Answer from '@/components/Answer'
import { useUser } from '@/core/contexts/userContext'

type Props = {
  data: { prepareQuizz: Question[] }
}

export const Home: React.FunctionComponent<Props> = ({ data }): JSX.Element => {
  const [user] = useUser()
  const [answers, setAnswers] = React.useState<string[]>([])
  const [correct, setCorrect] = React.useState<string[]>([])
  const [time, setTime] = React.useState<string>('')
  const [results, setResults] = React.useState<number[]>([])
  const [questionID, setQuestionID] = React.useState<number>(1)
  const [startAt, setStartAt] = React.useState<number>(0)
  const [quizzStarted, setQuizzStarted] = React.useState<boolean>(false)
  const [quizzEnded, setQuizzEnded] = React.useState<boolean>(false)
  const router = useRouter()

  const nextQuestion = async () => {
    const { id } = user

    if (questionID === data.prepareQuizz.length) {
      const timeResult = getTime()
      setQuizzEnded(true)
      const query = gql`
        mutation {
          addScore(value: ${sum(results)}, time: "${timeResult}", userId: ${id}) {
            score
          }
        }
      `
      await api<any>(query)
    } else {
      setAnswers([])
      setCorrect([])
      setQuestionID(questionID + 1)
    }
  }

  const getTime = () => {
    const diff = {
      minutes: 0,
      secondes: 0,
    }

    let tmp = Date.now() - startAt

    tmp = Math.floor(tmp / 1000) // Nombre de secondes entre les 2 dates
    diff.secondes = tmp % 60 // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.secondes) / 60) // Nombre de minutes (partie entière)
    diff.minutes = tmp % 60 // Extraction du nombre de minutes

    setTime(`${diff.minutes} minutes et ${diff.secondes} secondes.`)
    return `${diff.minutes} minutes et ${diff.secondes} secondes.`
  }

  const start = () => {
    setQuizzStarted(true)
    setStartAt(Date.now())
  }

  const handleCorrect = () => {
    const correctAnswers: string[] = []

    let points = 0

    data.prepareQuizz[questionID - 1].expected.map((nb: number, _) => {
      correctAnswers.push(data.prepareQuizz[questionID - 1].answers[nb])
    })

    answers.map((answer, _) => {
      if (correctAnswers.includes(answer)) points++
    })

    setCorrect(correctAnswers)
    setResults([...results, points])
  }

  const parentData = {
    correct,
    questionID,
    answers,
    setAnswers,
  }

  React.useEffect(() => {
    if (user.email === undefined) router.push('/auth/signin')
  })

  return (
    <Layout title="Home">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          className={`w-full h-full ${
            !quizzStarted || quizzEnded ? 'hidden' : 'flex'
          } flex-col items-center justify-center space-y-16`}
        >
          {data.prepareQuizz.map((question, index) => (
            <div
              className={`${
                questionID - 1 != index ? 'hidden' : 'flex'
              } flex-col items-center justify-center space-y-16`}
            >
              <div className="font-medium text-2xl">{question.sentence}</div>
              <div key={index} className="grid grid-cols-2 gap-6">
                {question.answers.map((text, answerID) => (
                  <Answer key={answerID} reference={index} text={text} parentData={parentData} />
                ))}
              </div>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={handleCorrect}
              className={`${
                answers.length != 0 && correct.length === 0 ? 'inline-flex' : 'hidden'
              } items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              Valider
            </button>
            <button
              type="button"
              disabled={answers.length === 0}
              onClick={nextQuestion}
              className={`${
                correct.length != 0 ? 'inline-flex' : 'hidden'
              } items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              Suivant
            </button>
          </div>
        </div>
        <div className={`${quizzEnded ? 'flex' : 'hidden'} flex-col items-center justify-center space-y-4`}>
          {quizzEnded && <div>Terminé en {time}</div>}
          <div>Score: {quizzEnded && sum(results)}</div>
          <button
            type="button"
            /* onClick={() => router.push('/')} */
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Recommencer
          </button>
        </div>
        <button
          type="button"
          onClick={start}
          className={`${
            quizzStarted ? 'hidden' : 'inline-flex'
          } items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          Commencer !
        </button>
      </div>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        .triangle-bottom-left {
          display: inline-block;
          height: 0;
          width: 0;
          border-right: 2.5rem solid transparent;
          border-bottom: 1.5rem solid rgba(159, 166, 178, 1);
        }
        .triangle-top-left {
          display: inline-block;
          height: 0;
          width: 0;
          border-top: 1.5rem solid rgba(159, 166, 178, 1);
          border-right: 2.5rem solid transparent;
        }
        .triangle-bottom-right {
          display: inline-block;
          height: 0;
          width: 0;
          border-bottom: 1.5rem solid rgba(159, 166, 178, 1);
          border-left: 2.5rem solid transparent;
        }
        .triangle-top-right {
          display: inline-block;
          height: 0;
          width: 0;
          border-top: 1.5rem solid rgba(159, 166, 178, 1);
          border-left: 2.5rem solid transparent;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    mutation {
      prepareQuizz(nb: 2) {
        sentence
        answers
        expected
      }
    }
  `

  const data: any = await api<any>(query)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}

export default Home
