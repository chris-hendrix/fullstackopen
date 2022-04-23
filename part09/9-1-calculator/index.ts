import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height: number = parseFloat(String(req.query.height));
    const weight: number = parseFloat(String(req.query.weight));
    const bmiResult = calculateBmi(height, weight);
    res.json(bmiResult);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.send(errorMessage);
  }
});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isArrayOfNumbers = (value: any): boolean => {
    return Array.isArray(value) && value.every(item => typeof item === "number");
 };
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {log, target} = req.body;
    if (!log || !isArrayOfNumbers(log)) {
      return res.send({ error: 'log is not array of number'}).status(400);
    }
    if ( !target || isNaN(Number(target))) {
      return res.send({ error: 'target is not a number'}).status(400);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exerciseResult = calculateExercise(log, target);
    return res.json(exerciseResult);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.send(errorMessage);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});