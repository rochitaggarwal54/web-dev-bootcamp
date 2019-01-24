var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoose    =   require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");



//SCHEMA SETUP
var campgroundsSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});
var Campground = mongoose.model("Campground",campgroundsSchema);

Campground.create(
    {
       name: "Granite Hill",
       image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104491f8c371a1eebcba_340.jpg",
       description: "This is a huge granite hill,no bathrooms. No water.Beautiful granite"
    },function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("NEWLY CREATED CAMPGROUND: ")
            console.log(campground);
        }
    });


app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //Get all campgrounds from database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var newCampground = {name:name,image:image,description:desc}
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    //redirect back to campgrounds page
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundCampground});
        }
    });
    
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp Server Has Started!");
});