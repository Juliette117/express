const express = require('express');

const router = express.Router();

router.use(express.json());

const path = require('path');

const fs = require('fs');

const allBooksPath = path.join(__dirname, '../data/livres.json')


router.get('/', (req, res) => {
    res.send("Bienvenue les livres");
});



// router.get('/liste-bouquins', (req, res) => {
//      res.send('Liste livre')
// })

router.get('/liste-bouquins', (req, res) => {
    fs.readFile(allBooksPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur:', err);
            res.status(500).send('erreur serveur');
            return;
        }
        const allBooks = JSON.parse(data);
        res.json({ allBooks });
    })

})



router.get('/:id', (req, res) => {
    fs.readFile(allBooksPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur:', err);
            res.status(500).send('erreur serveur');
            return;
        }
        const allBooks = JSON.parse(data);
        const livreById = allBooks.find(livre => livre.id === parseInt(req.params.id))
        res.json(livreById);
       
    })

})

router.get('/ajout-bouquin', (req, res) => {
    res.send('Ajout livre');
})

router.post('/ajout-bouquin', (req, res) => {
    let addData = req.body;
    res.render({ addData })
})

router.use('/find', (req, res) => {


})






// let bestBook;

// router.use(
//     (req, res) => {
//       bestBook = allBooks.find( book => book.author.includes('JRR Tolkien') );

//     }
//   );



module.exports = router;

