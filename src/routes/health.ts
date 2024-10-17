import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    status: "ok",
    date: new Date(),
  };

  /**
    * @swagger
    * tags:
    *   name: Health
    *   description: API Health check
    * /health:
    *   get:
    *     tags: [Health]
    *     summary: Return the health of the application
    *     responses:
    *       200:
    *         description: A successful response
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 uptime:
    *                   type: number
    *                 status:
    *                   type: string
    *                 date:
    *                   type: string
    *      
    */
  res.status(200).send(data);
});

export default router;