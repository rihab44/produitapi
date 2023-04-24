var Cable = require('../models/cable');
var accessoire = require('../models/accessoire');
var Product = require('../models/product');
const product = require('../models/product');


var functions = {
  addNew: async function(req, res)  {
    console.log('nom:', req.body.nom);
    console.log('categorie:', req.body.categorie);
    console.log('prix:', req.body.prix);
    console.log('code:', req.body.code);
    console.log('stockinitial:', req.body.stockinitial);
    console.log('stocktompon:', req.body.stocktompon);

    console.log('unitedemesure:', req.body.unitedemesure);
    console.log("req")
    try {
      if ((!req.body.nom) ||(!req.body.categorie) || (!req.body.prix) || (!req.body.code) || (!req.body.stockinitial)|| (!req.body.stocktompon) || (!req.body.unitedemesure)) {
        console.log('Champs manquants');

        res.json({success: false, msg: 'Enter all fields'});
      } else {
        console.log('Tous les champs sont remplis');

        var newProduct = Product({
          nom: req.body.nom,
          categorie : req.body.categorie.toLowerCase(),
          prix: req.body.prix,
          code: req.body.code,
          stockinitial:req.body.stockinitial,
          stocktompon: req.body.stocktompon,
          unitedemesure: req.body.unitedemesure,

        });
        await newProduct.save();
     

        if (req.body.categorie.toLowerCase() === "cable") {
          var newCable = new Cable({
            nom: req.body.nom,
            categorie: req.body.categorie.toLowerCase(),
            prix: req.body.prix,
            code: req.body.code,
            stockinitial: req.body.stockinitial,
            stocktompon: req.body.stocktompon,
            unitedemesure: req.body.unitedemesure,
          });
          
          await newCable.save();
          res.status(201).send('Câble créé avec succès');
        } else {
          var newaccessoire = new accessoire({
            nom: req.body.nom,
            categorie: req.body.categorie.toLowerCase(),
            prix: req.body.prix,
            code: req.body.code,
            stockinitial: req.body.stockinitial,
            stocktompon: req.body.stocktompon,
            unitedemesure: req.body.unitedemesure,
          });
          await newaccessoire.save();
        
          res.status(201).send('Accessoire créé avec succès');
        }
       
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la création du produit');
    }
  } ,     

updateProduct : async function (req, res) {
  try {
      console.log(req.body)
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },
  deleteproduct : async function (req, res) {
    const id = req.params.id;

    try {
      const result = await Product.findByIdAndDelete(id);
      res.status(200).send(`produit avec l'ID ${id} supprimé avec succès`);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Erreur lors de la suppression du produit avec l'ID ${id}`);
    }
  },
}

module.exports = functions;
                                      