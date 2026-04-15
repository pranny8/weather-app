import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

//test route 
app.get("/", (req, res) => {
  res.send("WORKING 🚀");
});

// WEATHER ROUTE
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: "No city provided" });

  // fetch from OpenWeatherMap
  try {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.json({ error: "Something went wrong" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});