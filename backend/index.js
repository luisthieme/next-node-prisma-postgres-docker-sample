const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETTE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Test API

app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get All Users

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get User By Email

app.get("/users/:email", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Create User

app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update User By Email

app.put("/users/:email", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: req.params.email,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Delete User By Email

app.delete("/users/:email", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        email: req.params.email,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Start Server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
