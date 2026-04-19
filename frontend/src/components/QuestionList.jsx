import React, { useEffect, useState } from "react";
import { getQuestions, submitAnswers } from "../services/api";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

useEffect(() => {
  getQuestions()
    .then((res) => {
      console.log("Questions from backend:", res.data);
      setQuestions(res.data);
    })
    .catch((err) => {
      console.log("Error fetching questions:", err);
    });
}, []);

  const handleChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    console.log("Sending answers:", answers);
    submitAnswers({ answers }).then((res) => {
      setScore(res.data);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exam Portal</h2>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <p><b>{q.question}</b></p>

          {[q.option1, q.option2, q.option3, q.option4].map((opt, index) => (
            <div key={index}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={() => handleChange(q.id, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Exam</button>

      {score !== null && (
        <h3>Your Score: {score}</h3>
      )}
    </div>
  );
}

export default QuestionList;