interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
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
            ratingDescription = 'Either you want to workout or do something else'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
      }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
