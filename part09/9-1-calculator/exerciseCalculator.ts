interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercise = (log: number[], target: number = 2): ExerciseResult => {
  const average: number = log.reduce((a, b) => a + b) / log.length;
  const success: boolean = average >= target

  interface Rating {rating: number, ratingDescription: string}
  let rating: Rating = {rating: 2, ratingDescription: 'not bad'}
  if (average > target + 0.5) rating = {rating: 3, ratingDescription: 'impressed!'}
  if (average < target - 0.5) rating = {rating: 3, ratingDescription: 'disappointed'}
  
  return {
    periodLength: log.length,
    trainingDays: log.filter(t=> t>0).length,
    success,
    ...rating,
    target,
    average
  }
}

const getLogFromArgs = (argv: string[]): number[] => {
  if (argv.length < 3) throw new Error('not enough args')
  return argv.slice(2).map(v => parseFloat(v))
}

try {
  const log: number[] = getLogFromArgs(process.argv)
  console.log(calculateExercise(log))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) errorMessage += ' Error: ' + error.message;
  console.log(errorMessage);
}