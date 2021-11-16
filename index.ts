import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    console.log(req.query);
  const heightStr = req.query.height;
  const weightStr = req.query.weight;
  if (heightStr && weightStr && !isNaN(Number(heightStr)) && !isNaN(Number(weightStr))) {
    const height = Number(heightStr);
    const weight = Number(weightStr);
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } else {
    res.status(400);
    res.json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = req.body.daily_exercises; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises || !target) {
    res.status(400);
    res.json({
      error: "parameter missing"
    });
  } else if (
    !daily_exercises.every(n => !isNaN(Number(n))) || isNaN(Number(target))
  ) {
    res.status(400);
    res.json({
      error: "malformatted parameters"
    });
  } else {
    res.json(calculateExercises(target, daily_exercises));
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
