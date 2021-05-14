/// <reference types="next" />
/// <reference types="next/types/global" />

type Question = {
  sentence: string
  answers: string[]
  expected: number[]
}

type User = {
  id?: number
  email: string
  encryptedPassword: string
  firstname: string
  lastname: string
  createdAt: Date
  updatedAt: Date
}

type Score = {
  id: number
  score: number
  time: string
  createdAt: string
  user: User | null
}
