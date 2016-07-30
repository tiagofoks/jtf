var db_string = 'mongodb://127.0.0.1/jtf_restful';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'))

db.once ('open', function(){
	
	var userSchema = mongoose.Schema({
		
		fullname: String,
		email: String,
		password: String,
		created_at: Date
	});

	exports.User = mongoose.model('User', userSchema);

	var productSchema = mongoose.Schema({
		
		product_name: String,
		brand: String,
		pound_kg: Number,
		price: Number,
		city: String,
		market: String,
		created_at: Date
	});

	exports.Product = mongoose.model('Product', productSchema);


	var shoppingSchema = mongoose.Schema({
		
		list: Number,
		item: String,
		brand: String,
		created_at: Date
	});

	exports.Shopping = mongoose.model('Shopping', shoppingSchema);
});