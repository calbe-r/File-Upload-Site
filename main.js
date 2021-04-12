const express = require("express");
const path = require('path')
const fileUpload = require('express-fileupload');
const app = express()	
console.log("Hello World")

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/FUS/index.html',console.error)
})

app.use(fileUpload({createParentPath: true}));

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
