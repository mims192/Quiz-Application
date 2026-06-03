import express from "express";
import Quiz from "../models/Quizzes.js";
import crypto from "crypto";
import { authenticateToken } from "./Auth.js";

const router = express.Router();

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { title, questions } = req.body;
    
    const roomId = crypto.randomBytes(4).toString("hex");
    
    const quiz = new Quiz({
      title,
      questions,
      roomId,
      createdBy: req.user.userId,
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (err) {
    console.error("Error creating quiz", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/join/:roomId", authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const quiz = await Quiz.findOne({ roomId }).populate(
        "createdBy",
        "username email"
    );

    if (!quiz || !quiz.isActive) {
      return res.status(404).json({ message: "Quiz not found or inactive" });
    }

    const alreadyJoined = quiz.players.some(
      (playerId) => playerId.toString() === req.user.userId
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: "User already joined the quiz" });
    }

    quiz.players.push(req.user.userId);
    await quiz.save();

    res.status(200).json({
      message: "Joined quiz successfully",
       quiz 
    });
  } catch (err) {
    console.error("Error joining quiz", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;