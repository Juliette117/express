const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

const bookRoutes = require('./express2000/src/routes/bookRoutes');

app.set('view engine', 'pug') // Configuration du moteur de modèle
app.set('views', path.join(__dirname, './express2000/views')); // Spécification du répertoire des views



// const User = require('./user'); // Importer le modèle

app.get('/', (req, res) => {
  res.render('index', {title: 'HomePage', message: 'Bienvenue sur mon site'})
})


mongoose.connect('mongodb://localhost:27017/films', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;



// const User = mongoose.model('User', userSchema);



// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const newUser = new User({ username: 'john_doe', email: 'john@example.com', password: 'securepassword' });
// newUser.save()
//   .then(user => {
//     console.log('Utilisateur enregistré avec succès :', user);
//   })
//   .catch(error => {
//     console.error("Erreur lors de l'enregistrement de l\\'utilisateur :", error);
//   });

 



// const Films = mongoose.model('Films', movieSchema);

// const movieSchema = new mongoose.Schema({
//   titre: { type: String, required: true },
//   description: { type: String, required: true, unique: true },
//   realisateur: { type: String, required: true },
//   realeaseDate: { type: String, required:true }
// });


// const newFilm = new Films({ titre: 'john_doe', description: 'blabla', realisateur: 'JD', realeaseDate: 1954 });
// newFilm.save()
//   .then(film => {
//     console.log('Film enregistré avec succès :', film);
//   })
//   .catch(error => {
//     console.error("Erreur lors de l'enregistrement du film :", error);
//   });

// movieSchema.pre('save', async function(next) {
//   // Effectuer des actions avant l'enregistrement, par exemple, hash du mot de passe
//   // ...
//   next();
// });

app.get("/films", (req, res) => {
  res.render("films");
}
)



db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Créer un utilisateur (Create)
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtenir tous les utilisateurs (Read - All)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtenir un utilisateur par son ID (Read - One)
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un utilisateur par son ID (Update)
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur par son ID (Delete)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







app.use('/bouquins', bookRoutes);
app.use(express.static('public'))


app.get('/bienvenue', (req, res) => {
  res.send("Bienvenue");
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/acces-interdit', (req, res) => {
  res.status(403).send("Interdit");
})

app.get('/info', (req, res) => {
  res.json({
    "nom": "John",
    "age": "32",
    "etc": "..."

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
  console.log('Serveur en écoute sur le port', PORT)
})



