import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [screen, setScreen] = useState('landing');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    try {
      const mockData = [
        { id: 1, text: 'Do you enjoy social gatherings?', options: ['Yes', 'No'] },
        { id: 2, text: 'Do you feel drained after social events?', options: ['Yes', 'No'] },
        { id: 3, text: 'Do you prefer to stay at home on weekends?', options: ['Yes', 'No'] },
        { id: 4, text: 'Do you seek out new adventures?', options: ['Yes', 'No'] },
        { id: 5, text: 'Do you enjoy being the center of attention?', options: ['Yes', 'No'] },
      ];
      setQuestions(mockData);
    } catch (error) {
      console.error(error);
      alert('Failed to load questions. Please try again later.');
    }
  };

  useEffect(() => {
    if (screen === 'test') {
      fetchQuestions();
    }
  }, [screen]);

  const handleAnswer = (answer) => {
    if (answer === 'Yes') setScore(score + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen('finish');
    }
  };

  const calculatePersonality = () => (score > questions.length / 2 ? 'Extrovert' : 'Introvert');

  if (screen === 'landing') {
    return (
      <div className="landing">
        <h1>Welcome to the Personality Test</h1>
        <button onClick={() => setScreen('test')}>Start Personality Test</button>
      </div>
    );
  }

  if (screen === 'test') {
    if (questions.length === 0) return <p>Loading questions...</p>;

    const question = questions[currentQuestionIndex];
    return (
      <div className="test">
        <h1>Question {currentQuestionIndex + 1}</h1>
        <p>{question.text}</p>
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (screen === 'finish') {
    return (
      <div className="finish">
        <h1>Test Completed</h1>
        <p>Your personality type is: <strong>{calculatePersonality()}</strong></p>
        <button onClick={() => window.location.reload()}>Retake Test</button>
      </div>
    );
  }

  return null;
};

export default App;
