import express from "express";
import { ConnexionDB } from "./commun/connexionDb.js";
import { route as taskRouter } from "./tasks/taskRoute.js";
import { route as userRouter } from "./users/userRoute.js";
import { route as authRoute } from "./authentification/authRoute.js";
const port = 6001;
const database = new ConnexionDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ statut: "UP" });
});
//authRoute
app.use("/auth", authRoute);
//taskRoute
app.use("/tasks", taskRouter);
//userRoute
app.use("/users", userRouter);

database.generateConnexion().then(
  app.listen(port, () => {
    console.log(`Starting server at : ${port}`);
  })
);
