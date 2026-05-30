import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "youtube clone API is running",
  });
});

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}` )
})

