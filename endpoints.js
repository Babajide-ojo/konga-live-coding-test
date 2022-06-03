const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())
//const port = 5000

let port = process.env.PORT

app.listen(port, () => console.log(`App is listening on ${port}`))


let products = [
  { id: 1, name: 'Odessa moisturising creme' },
  { id: 2, name: 'Odessa moisturising' },
]
//let products;
let cart = []

// get all products

app.get('/getAllProducts', (req, res) => {
  if (products === undefined) {
    res.status(500)
    res.send('server error')
    process.exit(0);
  }
  console.log(products.length)
  if (products.length === 0) {
    res.status(404)
    res.send('no product exists')
    process.exit(0)
  } else res.send(products)
})

// add product to cart

app.post('/addProductToCart', (req, res) => {
  //  req.body = {id ,name}
  const data = req.body
  for(i = 0; i < products.length; i++){
      if(products[i].id === req.body.id && products[i].name === req.body.name){
        cart.push(data)
        res.send(data)
      } else {
          //res.status(400);
          res.send('this product does not exists');
      }
  }


})

// update cart

app.put('/updateCart/:id', (req, res) => {
  const singleCart = cart.find((x) => x.id === req.params.id)
  console.log(singleCart, req.params.id)
  if (!singleCart) {
    res.status(404)
  } else {
    res.send(singleCart)
  }
})
