var express = require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mycrudapp'
});

connection.connect();

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

var dataResults;


app.get('/api/customers',function(req,res){
    var sql="SELECT * FROM `customers`";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      res.send(results);
      console.log(results);
    }); 


});




app.get('/api/readData',function(req,res){
    var sql="SELECT * FROM `customers`";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
         dataResults=results;
         res.send(dataResults) ;

    }); 
    app.get('/api/readRecords',function(req,res){
    /*var sql="SELECT * FROM `customers`";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
    */     
         res.send(dataResults) ;

    }); 


});



app.get('/api/customers/:id', function(req, res){
    console.log("customer to  be searched "+req.params.id);
    var sql="SELECT * FROM `customers` where customerCode=?";
    connection.query(sql,[req.params.id] ,function (error, results, fields) {
      if (error) throw error;
      res.send(results);
      console.log(results);
    }); 
   
});

app.post('/api/customers', function(req, res){
    //Insert Customer
    var insertRecord="INSERT INTO `customers`(`customerName`, `lastName`,`mobileNumber`, `emailId`) VALUES (?,?,?,?)";
  connection.query(insertRecord,[req.body.firstName, req.body.lastName,req.body.mobileNumber,req.body.emailId], function(err,results){
    if(err) throw err;
    else {
        console.log('A new customer has been added.');
        res.send(results);
    }
  });
  
   console.log("firstName ="+req.body.firstName+" "+req.body.code+" "+req.body.mobileNumber+" "+req.body.emailId);
});

app.delete('/api/customers/:id', function(req, res){
    console.log("customer to  be deleted "+req.params.id);
   var deleteRecord="DELETE FROM `customers` WHERE `customerCode` = ?";
  connection.query(deleteRecord,[req.params.id], function(err,res){
    if(err) throw err;
    else {
        console.log('customer has been deleted '+req.params.id);
        //res.send(results);
    }
  });
});

app.put('/api/customers/:id', function(req, res){
  console.log("customer to  be updated "+req.params.id);
   var updateRecord="UPDATE `customers` SET `customerName`=?,`customerCode`=?,`mobileNumber`=?,`emailId`=? WHERE `customerCode`=?";
  connection.query(updateRecord,[req.body.customerName,req.body.customerCode,req.body.mobileNumber,req.body.emailId,req.params.id], function(err,res){
    if(err) throw err;
    else {
        console.log('customer has been updated '+req.params.id);
        //res.send(results);
    }
  });

});

app.listen(3000, function(){
    console.log('Server is listening on port number 3000');
});