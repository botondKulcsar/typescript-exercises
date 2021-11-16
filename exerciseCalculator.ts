interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface TargetAndHours {
    target: number;
    hours: number[];
}

const parseArgs = (args: string[]): TargetAndHours => {

    const allParamsAreNumbers = args.slice(2).every(p => !isNaN(Number(p)));

    if (allParamsAreNumbers) {
        const hours = args.slice(3).map(p => Number(p));

        return {
            target: Number(args[2]),
            hours
        };
    }
    
    throw new Error('Not all provided values were numbers!');
};

const calculateExercises = (target: number, hours: number[]): Result => {
    const periodLength: number = hours.length;
    const trainingDays: number = hours.filter(hour => hour).length;
    const average: number = hours.reduce((acc, hour) => acc + hour, 0) / periodLength;
    const success: boolean = average >= target;

    let rating: number;
    if (average / target > 1) {
        rating = 3;
    }
    else if (average / target > 0.9) {
        rating = 2.5;
    }
    else if (average / target > 0.8) {
        rating = 2;
    }
    else if (average / target > 0.6) {
        rating = 1.5;
    }
    else {
        rating = 1;
    }

    let ratingDescription: string;

    switch(rating) {
        case 3:
            ratingDescription = 'Great work! Target achieved!';
            break;
        case 2.5:
            ratingDescription = 'Not bad! A little more is needed';
            break; 
        case 2:
            ratingDescription = 'Not bad! But could be way better!';
            break; 
        case 1.5:
            ratingDescription = 'Maybe you should think your target over';
            break; 
        default:
            ratingDescription = 'Either you want to workout or do something else';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
      };
};

try {
    const { target, hours } = parseArgs(process.argv);
    console.log(calculateExercises(target, hours));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
}
