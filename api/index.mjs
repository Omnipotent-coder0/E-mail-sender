import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const user = process.env.EMAIL;
const pass = process.env.PASSWORD;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.com",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendMessage = async (email) => {
  const info = await transporter.sendMail({
    from: {
      name: "Nilesh 👻",
      address: user,
    },
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Look look big ben 🕰️", // plain text body
    html: "<b>Look look big ben 🕰️</b>", // html body
    attachments: [
      {
        filename: "wallpaper.jpg",
        path: path.join(__dirname, "..", "wallpaper.jpg"),
      },
    ],
  });
  console.log("info: ", info);
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// post email in here e.g, { "email":"YourMail@email.com"}
app.post("/", async (req, res) => {
  const {
    body: { email },
  } = req;
  if (!email) return res.status(400).send({ error: "email cannot be empty!" });
  await sendMessage(email);
  return res.send(email);
});

try {
  app.listen(PORT, () => {
    console.log(`Your server is listening on port : ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
// mongoose
//   .connect(DATABASE_URL)
//   .then(() => {
//     console.log("Your database is successfully connected!");
//   })
//   .catch((error) => {
//     console.log("Unable to connect to the database!", error);
//   });
