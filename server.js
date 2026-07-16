const express = require("express");
const cors = require("cors");

const workoutRoutes =
    require("./server/routes/workoutRoutes");

const userRoutes =
    require("./server/routes/userRoutes");

const workoutHistoryRoutes =
    require("./server/routes/workoutHistoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/history", workoutHistoryRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to FitQuest REST API"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});