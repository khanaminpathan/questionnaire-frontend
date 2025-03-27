import React from "react";
import { useQuestionnaire } from "../context/QuestionnaireContext";

const Questionnaire = () => {
  const {
    questions,
    currentIndex,
    handleNext,
    handlePrevious,
    handleAnswerChange,
    submitAnswers,
  } = useQuestionnaire();

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="questionnaire-container">
      <h2>Question {currentIndex + 1}</h2>
      <p>{currentQuestion.text}</p>
      <input
        type="text"
        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
      />
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={submitAnswers}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
