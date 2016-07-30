var db = require('../db_config.js');

exports.list = function(callback){
   
   db.Product.find({}, function(error, products){
      
      if(error){
         
         callback({error:'Não foi possivel retornar os produtos'});
      } else {

         callback(products);
      }
   });
};


exports.product = function(product_name, callback){
   
   db.Product.findByProductName(product_name, function(error, product){
      
      if(error){
         
         callback({error:'Não foi possivel retornar o produto'});
      } else {

         callback(product);
      }
   });
};


exports.save = function(product_name, brand, pound_kg, price, city, market, callback){
   
   new db.Product({

      'product_name': product_name,
      'brand': brand,
      'pound_kg': pound_kg,
      'price': price,
      'city': city,
      'market': market,
      'created_at': new Date()
   }).save(function(error, product){
      
      if(error){
         
         callback({error:'Não foi possivel salvar o produto'});
      } else {

         callback(product);
      }
   })
};


exports.update = function(id, product_name, brand, pound_kg, price, city, market, callback){
   
   db.Product.findByProductName(product_name, function(error, product) {

      if(product_name){
         
         product.product_name = product_name;
      }

      if(brand){
         
         product.brand = brand;
      }

      if(price){
         
         product.price = price;
      }

      if(pound_kg){
         
         product.pound_kg = pound_kg;
      }


      if(city){
         
         product.city = city;
      }

      if(market){
         
         product.market = market;
      }

      product.save(function(error, product){
      
         if(error){
         
            callback({error:'Não foi possivel salvar o produto'});
         } else {

            callback(product);
         }     
      });
   });
};

exports.list_product_name = function(product_name, callback){
   
   db.Product.find({product_name: product_name}).sort({price: 1}).exec(function(error, product_names){
      
      if(error){
      
         callback({error:'Não foi possivel retornar os produtos'});
      } else {
      
         callback(product_names);
      }
   });
};


exports.list_brand = function(brand, callback){
   
   db.Product.find({brand: brand}).sort({price: 1}).exec(function(error, brands){
      
      if(error){
      
         callback({error:'Não foi possivel retornar os produtos'});
      } else {
      
         callback(brands);
      }
   });
};

exports.save_shopping = function(item, list, brand, callback){
   
   new db.Shopping({

      'list': list,
      'item': item,
      'brand': brand,
      'created_at': new Date()
   }).save(function(error, shopping){
      
      if(error){
         
         callback({error:'Não foi possivel salvar a lista de compras'});
      } else {

         callback(shopping);
      }
   })
};

exports.list_shopping = function(callback){
   
   db.Shopping.find({}, function(error, shoppings){
      
      if(error){
         
         callback({error:'Não foi possivel retornar as listas de compra'});
      } else {

         callback(shoppings);
      }
   });
};

exports.shopping = function(item, callback){
   
   db.Shopping.findByItem(item, brand, function(error, item){
      
      if(error){
         
         callback({error:'Não foi possivel retornar a lista de compras'});
      } else {

         callback(shopping);
      }
   });
};

exports.list_market = function(market, callback){
   
   db.Product.find({market: market}).sort({product_name: 1}).exec(function(error, markets){
      
      if(error){
      
         callback({error:'Não foi possivel retornar os produtos'});
      } else {
      
         callback(markets);
      }
   });
};

exports.delete = function(id, callback){
   
   db.Product.findById(id, function(error, product){
      
      if(error){
         
         callback({error:'Não foi possivel retornar o produto'});
      } else {

         product.remove(function(error){
            if(!error){
               
               callback({response: 'produto excluído com sucesso'});
            }
         });
      }
   });   
};

exports.delete = function(id, callback){
   
   db.Shopping.findById(id, function(error, shopping){
      
      if(error){
         
         callback({error:'Não foi possivel retornar o produto'});
      } else {

         shopping.remove(function(error){
            if(!error){
               
               callback({response: 'lista excluída com sucesso'});
            }
         });
      }
   });   
};

exports.shoppingd = function(id, callback){
   
   db.Shopping.findById(id, function(error, product){

      var items = product.item.split(',');
      console.log.items,

      db.Product.aggregate([
         
         {$match: {product_name: {$in:items}}},
         

         {$group:{
            _id:{market:"$market",product_name:"$product_name"},price:{$min:"$price"}} },
               {$group:{ _id:"$_id.market",total:{$sum:"$price"}}},
         {$sort:{price:1}}
         ]).exec(function(error, product){
      
            if(error){
               
               callback({error:'Não foi possivel retornar a lista de compras'});
            } else {

               callback(product);
            }
         });
   });
};