
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

const bookRoutes = require('./express2000/src/routes/bookRoutes');



app.set('views', path.join(__dirname, 'templates'));

app.set('view engine', 'pug');
app.set('views', './templates');

app.use('/bouquins', bookRoutes);
app.use(express.static('public'))


app.get('/bienvenue', (req, res) => {
  res.send("Bienvenue");
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/acces-interdit', (req,res) => {
  res.status(403).send("Interdit");
})

app.get('/info', (req, res) => {
  res.json({
    "nom": "John",
    "age": "32",
    "etc":"..."

  });
  res.status(500).json('erreur serveur');
})

app.get('/redirection-accueil', (req, res) => {
  res.redirect('/bienvenue');
})

app.get('*', (req, res) => {
  res.status(404).send("Non trouvé");
})






app.listen(PORT, () => {
  console.log('Serveur en écoute sur le port' , PORT)
})



