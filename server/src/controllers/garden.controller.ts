import Garden from "../models/garden.model";
import Tree from "../models/tree.model";

import type { Request, Response, NextFunction } from "express";

export async function listGardens(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const gardens = await Garden.find().sort({ createdAt: -1 });
    res.status(200).json(gardens);
  } catch (error) {
    next(error);
  }
}

export async function getGarden(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const garden = await Garden.findById(req.params.id);

    if (!garden) {
      res.status(404).json({ error: "Garden not found" });
      return;
    }

    const trees = await Tree.find({ garden: garden._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ garden, trees });
  } catch (error) {
    next(error);
  }
}

export async function createGardern(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { name, description, location } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!name) {
      res.status(400).json({ error: "Garden name is required" });
      return;
    }

    const garden = await Garden.create({
      name,
      description,
      location,
      createdBy: userId,
      members: [userId],
    });
    res.status(201).json(garden);
  } catch (error) {
    next(error);
  }
}

export async function joinGarden(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const garden = await Garden.findById(req.params.id);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!garden) {
      res.status(404).json({ error: "Garden not found" });
      return;
    }

    if (!garden.members.includes(userId)) {
      garden.members.push(userId);
      await garden.save();
    }
    res.json(garden);
  } catch (error) {
    next(error);
  }
}

export async function updateGarden(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const garden = await Garden.findById(req.params.id);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!garden) {
      res.status(404).json({ error: "Garden not found" });
      return;
    }

    if (garden.createdBy !== userId) {
      res.status(403).json({ error: "Only the garden creator can edit it" });
      return;
    }

    // as const tells TypeScript that these are the exact string literals instead of just strings
    const updatable = ["name", "description", "location"] as const;

    for (const field of updatable) {
      if (req.body[field] !== undefined) {
        garden[field] = req.body[field];
      }
    }

    await garden.save();
    res.status(200).json(garden);
  } catch (error) {
    next(error);
  }
}

export async function deleteGarden(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const garden = await Garden.findById(req.params.id);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!garden) {
      res.status(404).json({ error: "Garden not found" });
      return;
    }

    if (garden.createdBy !== userId) {
      res.status(403).json({ error: "Only the garden creator can delete it" });
      return;
    }

    await Tree.deleteMany({ garden: garden._id });
    await garden.deleteOne();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
