const express = require('express');
const multer = require('multer');
const File = require ('./fileModel');
const db = require('./db');

const app = express();
const PORT = 2000;

//set up to storage engine 
const storage = multer.diskStorage(
{
    destination:'./uploads',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);

    
    },
});

const upload = multer ({storage});



//uplopad route http://localhost:2000/upload

app.post('/upload',upload.single('file'),async(req,res)=>{
    const {
        filename,path,originalname,mimetype,size}= req.file;
        const newFile = new File({filename,path,originalname,mimetype,size});

        try{
            await newFile.save();
            res.status(201).send(`File uploaded:${req.file.filename}`)

        }catch(err){
            res.status(500).send(err);

        }
     });


     //save the file 

      app. get('/download/:filename',async (req,res)=>{
        console.log(req.params)
        try{
            const file = await File.findOne({filename: req.params.filename});
            if(!file){
                return res.status(404).send('fie not found ');
            }
            res.download(file.path,file.originalname);
        }catch(err){
            res.status(500).send(err);

        }

      });








app.get ('/',(req,res)=>
{
    res.send("heyy")
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING on http://localhost:${PORT}`);

});




