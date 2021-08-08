//import and setting up middleware
var express = require('express'); //call express
var app = express(); //define our app using express

const mongoose = require('mongoose');
const Restaurant = require('./restaurant')

// Middleware 
app.use(express.urlencoded({extended:true})); 
app.use(express.json());

mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.skdnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

var port = process.env.PORT || 8080 //set our port

//Setting route and path
var router = express.Router() 
router.get('/', (req,res)=>{
	res.json({message:'Hula! my API works!!!'}) 
})

//create
router.post('/restaurants', (req,res)=>{
	let newRestaurant = new Restaurant({
		name:req.body.name,
		address:req.body.address,
		email:req.body.email,
		phone:req.body.phone,
		description:req.body.description,
		opening_time:req.body.opening_time,
		latitude:req.body.latitude,
		longitude:req.body.longitude,
		types:req.body.types

	})

	//method save by mongoose to store newRestaurant model data in db
	newRestaurant.save((err)=>{
		if (err) res.json({error:'message'+err})
			res.json({message:'Restaurant succesfully created!'})
	})
})

//read all
router.get('/restaurants', (req,res)=>{
	Restaurant.find((err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})

//read one
router.get('/restaurants/:id', (req,res)=>{
	Restaurant.findById(req.params.id, (err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})

//update
router.put('/restaurants/:id', (req,res) =>{
	Restaurant.findByIdAndUpdate(req.params.id, req.body, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Restaurant with id ' + req.params.id + 
				' data succesfully updated!'})
	})
})

//delete
router.delete('/restaurants/:id', (req,res) =>{
	Restaurant.findByIdAndDelete(req.params.id, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Restaurant with id ' + req.params.id + 
				'data succesfully deleted!' })
	})
})

//exercise
//menus
router.post('/restaurants/:id/menus', (req,res)=>{
	let newRestaurant = new Restaurant({
		menus:[
		{
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			imageUrl: req.body.imagerUrl
		},
		],
	});
	newRestaurant.save((err)=>{
		if (err) res.json({error:'message'+err})
			res.json({message:'New menu succesfully created!'})
	})
})

router.get('/restaurants/:id/menus', (req,res)=>{
	Restaurant.find((err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})

router.get('/restaurants/:res_id/menus/:menu_id', (req,res)=>{ 
	Restaurant.findById(req.params.menu_id, (err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})

router.put('/restaurants/:res_id/menus/:menu_id', (req,res)=>{
	Restaurant.findByIdAndUpdate(req.params.menu_id, req.body, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Menu with id ' + req.params.menu_id + 
				' data succesfully updated!'})
	})
})
router.delete('/restaurants/:res_id/menus/:menu_id', (req,res)=>{
	Restaurant.findByIdAndDelete(req.params.menu_id, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Restaurant with id ' + req.params.menu_id + 
				'data succesfully deleted!' })
	})
})

//Reviews
router.post('/restaurants/:id/reviews', (req,res)=>{
	let newRestaurant = new Restaurant({
		reviews:[
		{
			username: req.body.username,
			rating: req.body.rating,
			reviews: req.body.reviews,
		},
		],
	});
	newRestaurant.save((err)=>{
		if (err) res.json({error:'message'+err})
			res.json({message:'New review succesfully created!'})
	})
})
router.get('/restaurants/:id/reviews', (req,res)=>{
	Restaurant.find((err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})
router.get('/restaurants/:res_id/reviews/:review_id', (req,res)=>{
	Restaurant.findById(req.params.review_id, (err, restaurants)=>{
		if(err) res.json({error: 'message'+ err})
			res.json({message: 'OK', data:restaurants})
	})
})
router.put('/restaurants/:res_id/reviews/:review_id', (req,res)=>{
	Restaurant.findByIdAndUpdate(req.params.review_id, req.body, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Review with id ' + req.params.review_id + 
				' data succesfully updated!'})
	})
})
router.delete('/restaurants/:res_id/reviews/:review_id', (req,res)=>{ 
	Restaurant.findByIdAndDelete(req.params.review_id, (err, restaurants) =>{
		if(err) res.json({error: 'message' + err})
			res.json({message: 'Restaurant with id ' + req.params.review_id + 
				'data succesfully deleted!' })
	})
})

app.use('/api',router);

app.listen(port); // create a server that browsers can connect to 

console.log("Magic happened at port "+port);