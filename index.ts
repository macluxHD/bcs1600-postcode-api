import express from "express";
import csv from "csv-parser";
import fs from "fs";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'info'; // set your logging level here

const app = express();

app.use(express.json()); // for parsing application/json

const postcodes: { [key: string]: { lat: string; long: string } } = {};

fs.createReadStream("data/data.csv")
  .pipe(csv())
  .on("data", (row) => {
    postcodes[row.Zip] = { lat: row.Lat, long: row.Lon };
  });

app.post("/get_coordinates", (req: express.Request, res: express.Response) => {
  let { postcode } = req.body;

  logger.trace("Request from ip address: ", req.ip);
  
  const postcodeRegex = /^[0-9]{4}[A-Z]{2}$/i;
  if (!postcode) {
    logger.trace("No postcode provided");
    res.status(400).send({"error": "No postcode provided"});
    return;
  }

  postcode = postcode.toUpperCase();

  if (!postcodes[postcode] || !postcodeRegex.test(postcode)) {
    logger.trace(`Failed to fetch coordinates for postcode ${postcode}`);
    res.status(404).send({"error": "Failed to fetch coordinates"});
    return;
  }
  
  logger.trace(`Fetched coordinates for postcode ${postcode}`);
  res.status(200).send({
    "latitude": postcodes[postcode].lat,
    "longitude": postcodes[postcode].long,
    "postcode": postcode
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info("Server is running on port " + port);
});