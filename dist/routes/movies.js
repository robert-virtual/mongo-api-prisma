"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const moviesRouter = (0, express_1.Router)();
moviesRouter.get("/", async (req, res) => {
    const { skip = 0, take = 10, title = "" } = req.query;
    const movies = await prisma.movies.findMany({
        where: { title: { contains: title } },
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
    }
    catch (error) {
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
exports.default = moviesRouter;
//# sourceMappingURL=movies.js.map