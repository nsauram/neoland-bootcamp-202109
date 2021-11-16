const express=require('express')
const server=express()

server.use(express.static('public'))//middleware

server.get('/hello', function(req,res){ 
    const name=req.query.name
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> hello?name?=Noelia
        <title>Hello ${name}</title>
    </head>
    <body>
        <h1>hello ${name}!</h1>
    </body>
    </html>`)
})

server.listen(8000)