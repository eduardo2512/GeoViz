import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(8000, "0.0.0.0", () => {
  console.log("😭🎉 Server started on port 8000! ");
});

export default app;
