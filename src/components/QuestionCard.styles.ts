import styled from "styled-components";

export const Wrapper = styled.div`
  text-align : center;
  box-shadow : 0px 5px 10px rgba(0,0,0,0.25);
  padding:20px;
  border : 2px solid #0085a3;
  border-radius:10px;
  background: #ebfeff;
  .number {
    font-size: 1.1rem;
  }
  p{
    font-size : 1rem;
  }
  .question {
    font-weight: bold;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  
  transition:  all 0.3s ease;

  display: flex;
  color:black;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    width: 100%;
    height:40px;
    margin:5px 0;

    background: ${({ correct, userClicked }) =>
    correct ? "linear-gradient(90deg, #56FFA4, #59BC86)"
      : !correct && userClicked ?
        'linear-gradient(90deg, #FF5656, #C16868)'
        : 'linear-gradient(90deg, #56ccff, #6eafb4)'};
  }
`;