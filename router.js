/** @format */

const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/hello", async (req, res) => {
  const visitorName = req.query.visitor_name || "Guest";
  // const clientIp = req.ip;

  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const clientIpDetails = clientIp.split(":");
  const clientIpAdress = clientIpDetails[clientIpDetails.length - 1];

  console.log(clientIpAdress, "clinet");
  // const IP = "105.112.197.65";
  try {
    // Get the location of the IP address
    const locationResponse = await axios.get(
      `http://ip-api.com/json/${clientIpAdress}`
    );

    const locationData = locationResponse.data;

    if (locationData.status === "fail") {
      return res.status(500).json({ error: "Could not determine location." });
    }

    const city = locationData.city;

    const country = locationData.country;

    res.json({
      client_ip: clientIpAdress,
      location: `${city}, ${country}`,
      greeting: `Hello, ${visitorName}! The temperature is 38 degrees Celsius in ${city}.`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

module.exports = router;
