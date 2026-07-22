import Tree from "../models/tree.model";

import type { Request, Response, NextFunction } from "express";

export async function listTrees(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const filter: { garden?: string } = {};

    if (req.query.garden) {
      filter.garden = req.query.garden as string;
    }

    const trees = await Tree.find(filter).sort({ createdAt: -1 });

    res.status(200).json(trees);
  } catch (error) {
    next(error);
  }
}

export async function getTree(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tree = await Tree.findById(req.params.id);

    if (!tree) {
      res.status(404).json({ error: "Tree not found" });
      return;
    }

    res.status(200).json(tree);
  } catch (error) {
    next(error);
  }
}

export async function createTree(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const {
      species,
      nickname,
      garden,
      plantedDate,
      heightCm,
      photoUrl,
      location,
      notes,
    } = req.body;

    if (!species || !garden || !plantedDate) {
      res
        .status(400)
        .json({ error: "species, garden, and plantedDate are required" });
      return;
    }

    const tree = await Tree.create({
      species,
      nickname,
      garden,
      plantedBy: userId,
      plantedDate,
      heightCm,
      photoUrl,
      location,
      notes,
    });

    res.status(201).json(tree);
  } catch (error) {
    next(error);
  }
}

export async function updateTree(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tree = await Tree.findById(req.params.id);

    if (!tree) {
      res.status(404).json({ error: "Tree not found" });
      return;
    }

    const updatable = [
      "nickname",
      "heightCm",
      "healthStatus",
      "photoUrl",
      "notes",
      "location",
    ] as const;

    for (const field of updatable) {
      if (req.body[field] !== undefined) {
        tree.set(field, req.body[field]);
      }
    }

    await tree.save();

    res.status(200).json(tree);
  } catch (error) {
    next(error);
  }
}

export async function uploadTreePhoto(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tree = await Tree.findById(req.params.id);

    if (!tree) {
      res.status(404).json({ error: "Tree not found" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No image file received" });
      return;
    }

    tree.photoUrl = `/uploads/${req.file.filename}`;

    await tree.save();

    res.status(200).json(tree);
  } catch (error) {
    next(error);
  }
}

export async function deleteTree(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tree = await Tree.findById(req.params.id);

    if (!tree) {
      res.status(404).json({ error: "Tree not found" });
      return;
    }

    if (tree.plantedBy !== userId) {
      res.status(403).json({
        error: "Only the person who logged this tree can delete it",
      });
      return;
    }

    await tree.deleteOne();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}