import * as React from 'react'

type ParentData = {
  correct: string[]
  questionID: number
  answers: string[]
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>
}

type Props = {
  text: string
  reference: number
  parentData: ParentData
}

export const Answer: React.FunctionComponent<Props> = ({ text, reference, parentData }): JSX.Element => {
  const [selected, setSelected] = React.useState<boolean>(false)
  const [isNotAnswer, setIsNotAnswer] = React.useState<boolean>(false)
  const { answers, correct, questionID, setAnswers } = parentData

  const upDateAnswers = () => {
    if (!answers.includes(text)) {
      setAnswers([...answers, text])
    } else {
      const array = answers
      for (let i = 0; i < array.length; i++) {
        if (array[i] === text) {
          array.splice(i, 1)
        }
      }
      setAnswers(array)
    }
    setSelected(!selected)
  }

  const questionIsReference = () => questionID - 1 === reference

  React.useEffect(() => {
    if (questionIsReference() && correct.length != 0 && !correct.includes(text)) setIsNotAnswer(true)
  }, [correct])

  return (
    <button
      className={`w-56 h-12 flex items-center justify-center relative bg-${
        selected && !isNotAnswer ? 'green-500' : isNotAnswer ? 'red-400' : 'blue-400'
      } focus:outline-none`}
      onClick={upDateAnswers}
    >
      <div className="absolute top-0 left-0 triangle-top-left"></div>
      <div className="absolute top-0 right-0 triangle-top-right"></div>
      <div className="absolute bottom-0 left-0 triangle-bottom-left"></div>
      <div className="absolute bottom-0 right-0 triangle-bottom-right"></div>
      <span className="select-none">{text}</span>
    </button>
  )
}

export default Answer
