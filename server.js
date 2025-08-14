const http =require("http");
const getReq = require ("./methods/get-request");
const postReq = require ("./methods/post-request");
const putReq = require ("./methods/put-request");
const deleteReq = require ("./methods/delete-request");
let books = require("./data/books.json");
//require("dotenv").config();

const PORT = process.env.PORT || 5001;

const server = http.createServer((req,res) => {
    req.books = books;
    switch(req.method){
        case  "GET":
            getReq(req,res);
            break;

        case  "POST":
            postReq(req,res);
            break;

        case  "PUT":
            putReq(req,res);
            break;

        case  "DELETE":
            deleteReq(req,res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type","application/json");
            res.write 
            res.end (JSON.stringify({tittle: "Not found", message : "Route not found"}));
 }
});

server.listen(PORT, ( ) =>  {
    console.log(`Server started on port : ${PORT}`);
});