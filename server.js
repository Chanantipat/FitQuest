const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const workoutHistoryRoutes = require("./routes/workoutHistoryRoutes");
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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});