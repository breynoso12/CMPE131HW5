const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

let weatherData = null;

app.get('/', (req, res) => {
  res.send('Weather application');
});

app.post('/collect_data', async (req, res) => {
  const { city } = req.body;

  try {
    const weatherResponse = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06114ce334586e7b711c9759795e8dce`
    );

    const { main } = weatherResponse.data;
    weatherData = {
      temperature: main.temp,
      humidity: main.humidity,
      pressure: main.pressure,
    };

    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to collect weather data' });
  }
});

app.get('/get_data', (req, res) => {
  if (weatherData) {
    res.json(weatherData);
  } else {
    res.status(404).json({ error: 'Error: no data available.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Weather Station app listening at http://localhost:${port}`);
});

module.exports = app;
