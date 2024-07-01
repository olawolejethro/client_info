/** @format */

const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/hello", async (req, res) => {
  const visitorName = req.query.visitor_name || "Guest";

  console.log(visitorName);
  const clientIp = req.ip;

  const clientIpDetails = clientIp.split(":");
  const clientIpAdress = clientIpDetails[clientIpDetails.length - 1];
  //   const clientIp =
  //     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(clientIpAdress, "IP");

  const IP = "105.112.197.65";
  try {
    // Get the location of the IP address
    const locationResponse = await axios.get(`http://ip-api.com/json/${IP}`);

    const locationData = locationResponse.data;
    console.log(locationData, "locationdatete");

    if (locationData.status === "fail") {
      return res.status(500).json({ error: "Could not determine location." });
    }

    const city = locationData.city;

    const country = locationData.country;

    // console.log(city, "andbdgdg", country);

    // Get the weather data
    // const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    // console.log(apiKey, "apikey");
    // const weatherResponse = await axios.get(
    //   `http://api.openweathermap.org/data/3.0/weather?q=${city}&appid=${apiKey}&units=metric`
    // );

    // console.log(weatherData, "weather");
    // const weatherData = weatherResponse.data;
    // const temperature = weatherData.main.temp;

    res.json({
      client_ip: IP,
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
