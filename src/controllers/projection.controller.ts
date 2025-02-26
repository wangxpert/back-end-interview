/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Request, Response } from "express";
import { projectionService } from "../services";

const getHistogram = async (req: Request, res: Response): Promise<any> => {
  const column = req.params.column;

  try {
    // Query the database for the column histogram
    const histogramItems = await projectionService.queryHistogram(column);

    // Convert histogram items to HTML
    let html = `<h1>Histogram for ${column}</h1><ul>`;
    histogramItems.forEach(({ value, count }) => {
      html += `<li>${value}: ${count}</li>`;
    });
    html += "</ul>";

    return res.status(httpStatus.OK).send(html);
  } catch (error) {
    console.error("Error fetching histogram:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send("<h1>Server Error</h1>");
  }
};

export default {
  getHistogram,
};
