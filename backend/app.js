const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Fun facts about donuts
const funFacts = [
    "Donuts were first made in the mid-19th century.",
    "The largest donut ever made weighed over 1.7 tons!",
    "There’s a National Donut Day in the U.S., celebrated every June.",
    "Donuts were originally called 'olykoeks', or 'oily cakes'.",
    "Homer Simpson made donuts a pop culture icon!"
];

// Endpoint to get a random fun fact
app.get('/funfact', (req, res) => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    res.json({ fact: randomFact });
});

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
