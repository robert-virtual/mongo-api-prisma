import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  const { skip = 0, take = 10, title = "" } = req.query;
  const movies = await prisma.movies.findMany({
    where: { title: { contains: title as string } },
    skip: +skip,
    take: +take,
  });
  res.json({ msg: "get movies", count: movies.length, movies });
});

moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movies.findUnique({ where: { id } });
    res.json({ msg: `get ${id} movie`, movies: movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

moviesRouter.post("/", async (req, res) => {
  const movie = await prisma.movies.create({ data: req.body });
  res.json({ msg: "post movie", movie });
});

moviesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movies.update({ data: req.body, where: { id } });
  res.json({ msg: `put ${id} movie`, movie });
});

moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movies.delete({ where: { id } });
  res.json({ msg: `delete ${id} movie`, movie });
});

export default moviesRouter;
