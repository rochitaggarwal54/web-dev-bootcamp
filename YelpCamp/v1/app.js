var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var campgrounds = [
        {name: "Salmon Creek",image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
        {name: "Granite Hill",image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144592f6c67ea2e4bc_340.jpg"},
        {name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Salmon Creek",image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
        {name: "Granite Hill",image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144592f6c67ea2e4bc_340.jpg"},
        {name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Salmon Creek",image: "https://farm1.staticflickr.com/82/225912054_690e32830d.jpg"},
        {name: "Granite Hill",image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144592f6c67ea2e4bc_340.jpg"},
        {name: "Mountain Goat's Rest",image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
        
    ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp Server Has Started!");
});