const express = require("express");
const path = require("path");
const fs = require('fs');

const productsPath = path.join(__dirname, "../data/products.json");
function getProducts() {
  return JSON.parse(fs.readFileSync(productsPath));
}

const controller = {
  productDetail: (req, res) => {
    const id = req.params.id;

    const products = getProducts();

    const product = products.find(product => product.id == id);    

    res.render("product/productDetail", { product })
  },
  productList: (req, res) => {
    
    if (req.query.category) {
      if (req.query.category == "computadoras") {
        let allProducts = getProducts();
        let categoryToShow = allProducts.filter (product => product.category == req.query.category)
        let categoryTitle = "Computadoras";
        return res.render("product/listaDeProducto", { products: categoryToShow, categoryTitle });
      } else if (req.query.category == "celulares") {
        let allProducts = getProducts();
        let categoryToShow = allProducts.filter (product => product.category == req.query.category)
        let categoryTitle = "Celulares";
        return res.render("product/listaDeProducto", { products: categoryToShow, categoryTitle });
      } else if (req.query.category == "accesorios") {
        let allProducts = getProducts();
        let categoryToShow = allProducts.filter (product => product.category == req.query.category)
        let categoryTitle = "Accesorios";
        return res.render("product/listaDeProducto", { products: categoryToShow, categoryTitle });
      } else if (req.query.category == "electrodomésticos") {
        let allProducts = getProducts();
        let categoryToShow = allProducts.filter (product => product.category == req.query.category)
        let categoryTitle = "Electrodomésticos";
        return res.render("product/listaDeProducto", { products: categoryToShow, categoryTitle });
      } 
    } else {
      let products = getProducts();
      let categoryTitle = "Todos los productos";
      return res.render("product/listaDeProducto", { products, categoryTitle });
    }
    
  },
  productCart: (req, res) => {
    res.render("product/productCart")
  },
};

module.exports = controller;
