import React, { useEffect, useState } from "react";
import { getQuestions, submitAnswers } from "../services/api";
import "../App.css";

function QuestionList() {
 
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    console.log("Questions:", questions);
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
    
    <div className="container">
      <div className="card" style={{ width: "650px", paddingTop: "10px" }}>
        
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Exam Portal
        </h2>

        {questions.length === 0 && (
          <p style={{ textAlign: "center" }}>No questions available</p>
        )}

        {questions.map((q, index) => (
          <div
            key={q.id}
            style={{
              marginTop: index === 0 ? "10px" : "0px", 
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fafafa"
            }}
          >
            <p>
              <b>
                Q{index + 1}. {q.question}
              </b>
            </p>

            {[q.option1, q.option2, q.option3, q.option4].map(
              (opt, i) => (
                <label
                  key={i}
                  style={{
                    display: "block",
                    margin: "6px 0",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    onChange={() => handleChange(q.id, opt)}
                    style={{ marginRight: "8px" }}
                  />
                  {opt}
                </label>
              )
            )}
          </div>
        ))}

        <button onClick={handleSubmit}>
          Submit Exam
        </button>

        {score !== null && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              textAlign: "center",
              background: "#e8f5e9",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            Your Score: {score} / {questions.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionList;