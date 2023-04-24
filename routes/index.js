const express = require('express');
const actions = require('../methodes/actions');
const router = express.Router();
var Product = require('../models/product');
var Cable = require('../models/cable');
var accessoire = require('../models/accessoire');







router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});

// Récupérer les produits depuis la base de données en utilisant le modèle
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});
router.get('/accessoire', async (req, res) => {
  try {
    const accessoires = await accessoire.find();
    return res.json(accessoires);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});
router.get('/cable', async (req, res) => {
  try {
    const cables = await Cable.find();
    return res.json(cables);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des cables' });
  }
});
router.post('/update/:id', actions.updateProduct);
router.delete('/delete/:id', actions.deleteproduct);


router.post('/addproduct', actions.addNew);




module.exports = router;
