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

console.log(calculateExercise([1,2,3,0,1], 1))