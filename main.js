const express = require("express");
const path = require('path')
const fileUpload = require('express-fileupload');
const app = express()	
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:Password123@cluster0.wt1jg.mongodb.net/Test?retryWrites=true&w=majority"
console.log("Hello World")

//Start up the Website
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/FUS/index.html',console.error)
})

//Forces the program to create the pathways needed to upload the File
app.use(fileUpload({createParentPath: true}));

MongoClient.connect(uri, function (err, client) {
  if (err) throw err

  const db = client.db('Test')

  db.collection('messages').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})

//Handles the file uploads
app.post('/FUS/uploads', function(req,res) {
	let sampleFile;
	let uploadPath;
	
	if(!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No Files were uploaded.')
	}
	
	sampleFile = req.files.sampleFile;
	console.log(sampleFile);
	uploadPath = __dirname + '/FUS/uploads/'+sampleFile.mimetype+'/' + sampleFile.name;
	
	sampleFile.mv(uploadPath, function(err) {
		if (err)
			return res.status(500).send(err);
			
		res.sendFile(uploadPath);
	});
});

app.listen(3000,()=>{})
