const express = require("express");
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();
var cors = require('cors')

app.use(cors()) 
app.use(bodyParser.json())
const cards = require('./data.json');

app.post("/api", (req, res) => {
    console.log(req.body)
    // res.json({ message: "Hello from server" });
    travelSpend = req.body.travel
    diningSpend = req.body.dining
    gasSpend = req.body.gas
    streamingSpend = req.body.streaming
    otherSpend = req.body.other

    // const cards = require('./data.json');
    // console.log(cards)
    // const sortedCards = cards.sort((a, b) => {
    //     const aPoints = (a.dining/100) * diningSpend + (a.trave/100) * travelSpend;
    //     const bPoints = (b.dining/100) * diningSpend + (b.travel/100) * travelSpend;
    //     return aPoints - bPoints;
    // });

    // console.log(sortedCards)
    const cardsWithPoints = cards.map(card => ({
        ...card,
        points: Math.round(((card.dining/100 * diningSpend + card.travel/100 * travelSpend + card.gas/100 * gasSpend + card.streaming/100 * streamingSpend + card.other/100 * otherSpend)) * 100),
    }));

    const sortedCards = cardsWithPoints.sort((a, b) => {
        return b.points - a.points;
    });
    console.log(sortedCards)
    res.json(sortedCards)



  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});