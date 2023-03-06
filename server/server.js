import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

const url =
  "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium";

dotenv.config();
const API_KEY = process.env.API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompt;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY,
    },
    body: JSON.stringify({
      enable_google_results: "true",
      enable_memory: false,
      input_text: prompt,
    }),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      res.status(200).send(json);
    })
    .catch((err) => {
      console.error("error:" + err);
      res.status(500).send(err.json());
    });
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
