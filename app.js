const express = require("express");
const app = express();
const port = 3001;
const payoutRoutes = require("./route/payout");

app.use("/payout", payoutRoutes);

app.listen(`the server is running at port: ${port}`);