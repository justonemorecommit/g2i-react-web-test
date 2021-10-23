interface Question {
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface TravisResult {
  correctCount: number
  incorrectCount: number
  correctness: boolean[]
  questions: Question[]
  answers: string[]
}

export type { Question, TravisResult }
