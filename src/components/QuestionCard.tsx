import * as React from "react";
//TYPES
import { AnswerObject } from "../App"
// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";


type props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<props> = ({
    question,
    answers,
    callback,
    questionNr,
    userAnswer,
    totalQuestions,
}) => (

    <Wrapper>
        <p className="number">
            Question : {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers?.map((answer) => (
                <ButtonWrapper
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                    key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer}
                        onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;