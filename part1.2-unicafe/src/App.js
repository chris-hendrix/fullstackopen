import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => <p>{text + ' ' + value}</p>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const score = 1 * good + 0 * neutral + -1 * bad;
  const average = all === 0 ? 0 : score / all;
  const positive = all === 0 ? '0%' : String((good / all) * 100) + '%';

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = (feedback) => {
    console.log(feedback);
    feedback === 'good' && setGood(good + 1);
    feedback === 'neutral' && setNeutral(neutral + 1);
    feedback === 'bad' && setBad(bad + 1);
  };

  const feedbacks = ['good', 'neutral', 'bad'];

  return (
    <div>
      <h1>give feedback</h1>
      {feedbacks.map((f) => (
        <Button handleClick={() => setFeedback(f)} text={f} />
      ))}
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
