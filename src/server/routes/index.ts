import { Express } from "express";
import { DriverController } from "../../modules/driver/infrastructure/DriverController";
import { PassengerController } from "../../modules/passenger/infrastructure/PassengerController";

export function loadRoutes(app: Express): void {
  app.get("/health", (_req, res) => (res.status(200).json({})))
  app.get("/drivers", (req, res) => new DriverController().get(req, res))
  app.get("/drivers/availables", (req, res) => new DriverController().availables(req, res))
  app.get("/drivers/:id", (req, res) => new DriverController().find(req, res))

  app.get("/passengers", (req, res) => new PassengerController().get(req, res))
  app.get("/passengers/:id", (req, res) => new PassengerController().find(req, res))
}