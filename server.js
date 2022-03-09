const express = require("express");
const app = express();

// dotenv
require("dotenv").config();

// CORS
const cors = require("cors");
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
const morgan = require("morgan");
app.use(morgan("dev"));

// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Port
const PORT = process.env.PORT || 5000;

// Router
const usersRouter = require("./src/users/route");
app.use("/api/v2/users", usersRouter);

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status: status,
      message: err.message || "Internal Server Error",
    },
  });
});

// Server
app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
