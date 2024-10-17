import express from "express";

const router = express.Router();


   
router.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    status: "ok",
    date: new Date(),
  };
  res.status(200).send(data);
});

export default router;