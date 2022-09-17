import { shuffleArray } from './utils';

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answers: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;

}
export type QuestionState = Question & { answers: string[] }

const fetchQuizQuestions = async (
  amount: number,   difficulty: Difficulty): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  return data.results.map((question: Question) => (
    {
      ...question,
      answer: shuffleArray([...question.incorrect_answers, question.correct_answers]),
    }))
};

export default fetchQuizQuestions;