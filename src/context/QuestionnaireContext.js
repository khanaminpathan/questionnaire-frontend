import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/questions")
      .then(response => setQuestions(response.data))
      .catch(error => console.error("Error fetching questions", error));
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerChange = (questionId, response) => {
    setAnswers({ ...answers, [questionId]: response });
  };

  const submitAnswers = async () => {
    const formattedAnswers = Object.keys(answers).map(questionId => ({
        question_id: parseInt(questionId), // Ensure it's an integer
        response: answers[questionId] // User's response
    }));

    try {
        console.log("Submitting answers:", formattedAnswers);
        const response = await axios.post("http://127.0.0.1:8000/answers", formattedAnswers, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Answers submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting answers", error);
    }
};

  return (
    <QuestionnaireContext.Provider value={{
      questions,
      currentIndex,
      handleNext,
      handlePrevious,
      handleAnswerChange,
      submitAnswers,
    }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => useContext(QuestionnaireContext);
