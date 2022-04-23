interface BmiValues {
  height: number;
  weight: number;
}

const getBmiArgs = (args: Array<string>) : BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number) => {
  
  const getBmiCategory = (bmi: number) : string => {
    if (bmi >= 30) return 'obese'
    if (bmi >= 25) return 'overweight'
    if (bmi >= 18.5) return 'normal'
    return 'underweight'
  }

  return {bmi: height/weight, category: getBmiCategory(height/weight), height, weight}
}

try {
  const { height, weight } = getBmiArgs(process.argv);
  const bmiResult = calculateBmi(height, weight)
  console.log(bmiResult)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
