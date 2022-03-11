const express = require("express");
const app = express();

// CORS
const cors = require("cors");
const isProduction = process.env.NODE_ENV === "production";
const corsOptions = {
  origin: isProduction ? "https://express-user-api-v2.herokuapp.com" : "*",
};

app.use(cors(corsOptions));

// Helmet
const helmet = require("helmet");
app.use(helmet());

// Gzip compression
const compression = require("compression");
app.use(compression());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Logger
const morgan = require("morgan");
app.use(morgan("dev"));

// Rate Limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 5 requests
});

app.use(limiter);

// Port
const PORT = process.env.PORT || 5000;

// Import Swagger UI Express and yaml.js
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Load the yaml file
const swaggerDocument = YAML.load("./openApi.yaml");

// Swagger Docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customSiteTitle: "Users API" })
);

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
