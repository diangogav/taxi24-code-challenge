import { Express } from "express";

export function loadRoutes(app: Express): void {
  app.get("/health", (_req, res) => (res.status(200).json({})))
}