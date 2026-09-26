const express = require("express");
const usageRoutes = require("./routes/usage");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

app.use("/usage", usageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});