const express =  require('express');
const hbs = require('hbs')
const _function = require('./function')
const fs = require('fs')
const port = process.env.PORT || 4000
var app = express();

app.set('view engine', 'hbs')
app.use((req, res, next) => {
    var date = new Date().toString()
    fs.appendFile('date.txt', date, (err) => {
        if(err) console.log(err)
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs')

})
app.use(express.static(__dirname + '/public'))
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('uppercase', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
     pageTitle: "Home",
     curYear: _function.getYear
 })
})

app.get('/api/customers', (req, res) => {
    res.send({
        id: 1234,
        name: "Ronaldo"
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        curYear: _function.getYear
    })
})

app.listen(port, () => console.log(`server running in ${port}`))