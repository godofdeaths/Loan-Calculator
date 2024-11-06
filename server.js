const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { amount, interest, years } = req.body;
    const monthlyInterest = interest / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments));
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - amount;

    res.json({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

async function calculateLoan() {
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    const response = await fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, interest, years })
    });

    const result = await response.json();
    document.getElementById('result').innerHTML = `
        Monthly Payment: $${result.monthlyPayment} <br>
        Total Payment: $${result.totalPayment} <br>
        Total Interest: $${result.totalInterest}
    `;
}
