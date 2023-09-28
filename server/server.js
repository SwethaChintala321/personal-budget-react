const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Groceries',
        budget: 90
    },
    {
        title: 'College',
        budget: 200
    },
    {
        title: 'Movies',
        budget: 30
    },
    {
        title: 'Aesthetics',
        budget: 40
    },
    {
        title: 'Travel',
        budget: 50
    },
    {
        title: 'Gadgets',
        budget: 100
    },
    {
        title: 'Trash',
        budget: 10
    },
    {
        title: 'Washroom Products',
        budget: 10
    },
    {
        Title: 'Miscellaneous',
        budget: 10
    }
]
};

app.get('/budget', (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});