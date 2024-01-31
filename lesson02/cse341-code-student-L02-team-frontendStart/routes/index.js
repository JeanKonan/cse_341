const routes = require('express').Router();
const cors = require('cors').Router();


routes.get('/professional', (req, res) => {
  res.json({
    "professionalName": "BYU-Idaho",
    "base64Image": "IMG_1138.JPG",
    "PrimaryDescription": "lorem bbhadbku biubvbvkfubkhvd",
    "WorkDescription": "ezrsxtdcyfvgubhn",
    "LinkTitleText": "tashxckjbuib mnn cd",
    "LinkedInLink": "zdfxhjckuv lkvhxdxhv lkvjc",
    "GitHubLink": "https://github.com/JeanKonan/cse_341"
  });
});

module.exports = routes;
