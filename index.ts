import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
