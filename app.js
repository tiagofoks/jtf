var app = require('./app_config.js');

var userController = require('./controller/userController.js');

var validator = require('validator');

var productCollections = require('./collections/productCollections.js');

app.get('/', function(req, res){
	
	res.end('Servidor ON!');
});

app.get('/users', function(req, res){
	
	userController.list(function(resp){
		
		res.json(resp);
	});
});

app.get('/users/:id', function(req, res){
	
	var id = validator.trim(validator.escape(req.param('id')));

	userController.user(id, function(resp){
		
		res.json(resp);
	});
});

app.post('/users', function(req, res){

	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));

	userController.save(fullname, email, password, function(resp){
		
		res.json(resp);
	});
});

app.put('/users', function(req, res){

	var id = req.param('id');
	var fullname = req.param('fullname');
	var email = req.param('email');
	var password = req.param('password');

	userController.update(id, fullname, email, password, function(resp){
		
		res.json(resp);
	});
});

app.delete('/users/:id', function(req, res){
	
	var id = req.param('id');

	userController.delete(id, function(resp){
		
		res.json(resp);
	});
});

app.get('/products', function(req, res){
	
	productCollections.list(function(resp){
		
		res.json(resp);
	});
});

app.get('/products/:product_name', function(req, res){
	
	var product_name = validator.trim(validator.escape(req.param('product_name')));

	productCollections.product(product_name, function(resp){
		
		res.json(resp);
	});
});

app.post('/products', function(req, res){

	var product_name = req.param('product_name');
	var brand = req.param('brand');
	var pound_kg = req.param('pound_kg');
	var price = req.param('price');
	var city = req.param('city');
	var market = req.param('market');

	productCollections.save(product_name, brand, pound_kg, price, city, market, function(resp){
		
		res.json(resp);
	});
});

app.put('/products', function(req, res){

	var id = req.param('id');
	var product_name = req.param('product_name');
	var brand = req.param('brand');
	var pound_kg = req.param('pound_kg');
	var price = req.param('price');
	var city = req.param('city');
	var market = req.param('market');
	
	productCollections.update(id, product_name, brand, pound_kg, price, city, market, function(resp){
		
		res.json(resp);
	});
});

app.get('/product_name/:product_name', function(req, res){
	
	var product_name = validator.trim(validator.escape(req.param('product_name')));

	productCollections.list_product_name(product_name, function(resp){
		
		res.json(resp);
	});
});

app.get('/brand/:brand', function(req, res){
	
	var brand = validator.trim(validator.escape(req.param('brand')));

	productCollections.list_brand(brand, function(resp){
		
		res.json(resp);
	});
});

app.post('/shopping', function(req, res){

	var item = req.param('item');
	var list = req.param('list');
	var brand = req.param('brand');

	productCollections.save_shopping(item, list, brand, function(resp){
		
		res.json(resp);
	});
});

app.get('/shoppings', function(req, res){
	
	productCollections.list_shopping(function(resp){
		
		res.json(resp);
	});
});

app.get('/market/:market', function(req, res){
	
	var market = validator.trim(validator.escape(req.param('market')));

	productCollections.list_market(market, function(resp){
		
		res.json(resp);
	});
});

app.delete('/products/:id', function(req, res){
	
	var id = req.param('id');

	productCollections.delete(id, function(resp){
		
		res.json(resp);
	});
});

app.delete('/shoppings/:id', function(req, res){
	
	var id = req.param('id');

	productCollections.delete(id, function(resp){
		
		res.json(resp);
	});
});

app.get('/shopping/:id', function(req, res){

	var id = req.param('id');
	
	productCollections.shoppingd(id, function(resp){
		
		res.json(resp);
	});
});