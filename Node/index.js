const express = require('express');
const config = require("config");
const quoteRelatedRoutes = require('./routes/quotes');
const myQuoteRelatedRoutes = require('./routes/myquotes');
const registerRelatedRoutes = require('./routes/register');
const loginRelatedRoutes = require('./routes/login');
const profileRelatedRoutes = require('./routes/profile');
const favouriteRelatedRoutes = require('./routes/favourites');
const app = express();

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Methods', "*"),
        response.setHeader('Access-Control-Allow-Origin', "*"),
        response.setHeader('Access-Control-Allow-Headers', "*"),
        next();
})

app.use(express.json());
app.use(express.static('public'))
app.use('/quotes', quoteRelatedRoutes);
app.use('/myquotes', myQuoteRelatedRoutes);
app.use('/register', registerRelatedRoutes);
app.use('/login', loginRelatedRoutes);
app.use('/profile', profileRelatedRoutes);
app.use('/favourite', favouriteRelatedRoutes);

const portNo = config.get("PORT");
app.listen(portNo, () => {
    console.log("Server is listening to " + portNo);
});