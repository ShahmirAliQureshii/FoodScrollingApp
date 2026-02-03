const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodPartnerRoutes = require("./routes/food-partner.routes.js");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
