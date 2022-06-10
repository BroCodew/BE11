const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const subMenuRoute = require("./routes/subMenu");
const menuRoute = require("./routes/menu");
const blogRouter = require("./routes/blog");
const serviceRouter = require("./routes/service");
const subServiceRouter = require("./routes/subService");
dotenv.config();
//CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json({ limit: "25mb" }));
app.use(helmet());
app.use(cors());
/* app.use(cookieParser()); */
app.use(morgan("common"));

//ROUTES
app.use("/api/sub-menu", subMenuRoute);
app.use("/api/menu", menuRoute);
app.use("/api/blog", blogRouter);
app.use("/api/service", serviceRouter);
app.use("/api/sub-service", subServiceRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});
