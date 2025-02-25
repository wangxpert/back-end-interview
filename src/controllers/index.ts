import { RequestHandler, Request, Response } from "express";

export const getHistogram: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const column = req.params.column;
  res.send(`<h1>Histogram for ${column} (to be implemented)</h1>`);
};
