const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var axios = require('axios');
const { json } = require('express/lib/response');

const app = express();
const port = 3000;


let results = [];
let returnData

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/knn3', (req, res) => {
    //
});

app.get('/test/:address', (req, res) => {
    
    const address = req.params.address;
    res.json(address);
    return;
});

app.get('/FromFollow/:address', (req, res) => {
    
    const address = req.params.address;
    var data = JSON.stringify({
        "query": `query {\n  addrs(where:{address:\"${address}\"}) {\n    address\n    addrsFollow {\n      address\n    }\n    followAddrs {\n      address\n    }\n  }\n}`
      });
      
      var config = {
        method: 'post',
        url: 'https://mw.graphql.knn3.xyz/',
        headers: { 
          'Accept-Encoding': 'gzip, deflate, br', 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Connection': 'keep-alive', 
          'DNT': '1', 
          'Origin': 'https://mw.graphql.knn3.xyz'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        
        
        console.log(response.data.data.addrs);
        //const following = JSON.parse(response.data.addrs.addrsFollow);
        const followers = response.data.data.addrs[0].followAddrs;
        console.log(followers)
        const following = response.data.data.addrs[0].addrsFollow;
        
        res.json(getDifferenceFF(followers,following))
      })
      .catch(function (error) {
        console.log(error);
      });

    //const address = req.params.address;
    //res.json(address);
    
});

app.get('/SimilarNFTs/:address', (req, res) => {
    
  const address = req.params.address;
  var data = JSON.stringify({
    "query": `query {\n  addrs(where:{address:\"${address}\"}) {\n    address\n    holdnfts {\n      contract\n    }\n  }\n}\n\n`
  });
    
    var config = {
      method: 'post',
      url: 'https://mw.graphql.knn3.xyz/',
      headers: { 
        'Accept-Encoding': 'gzip, deflate, br', 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Connection': 'keep-alive', 
        'DNT': '1', 
        'Origin': 'https://mw.graphql.knn3.xyz'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      const lengthArray = response.data.data.addrs[0].holdnfts.length
      let arrayNum
      let contractAddress
      let similarNFTsArray
      if (lengthArray > 0){
        arrayNum = Math.floor(Math.random() * lengthArray);
      }
      //console.log(response.data.data.addrs[0]);
      contractAddress = response.data.data.addrs[0].holdnfts[arrayNum].contract
      const sa = similarNFTsArrayFunc(contractAddress)
      //console.log(similarNFTsArray)
      // res.json(response.data.data.addrs[0].holdnfts[arrayNum].contract)
      res.json(sa)
    })
    .catch(function (error) {
      console.log(error);
    });

  
});

function similarNFTsArrayFunc(contractAddress){
  
  var data = JSON.stringify({
    "query": `query {\n  nfts(where:{contract: \"${contractAddress}\"}) {\n    addrsHold {\n      address\n    }\n  }\n}`
  });
  
  var config = {
    method: 'post',
    url: 'https://mw.graphql.knn3.xyz/',
    headers: { 
      'Accept-Encoding': 'gzip, deflate, br', 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'Connection': 'keep-alive', 
      'DNT': '1', 
      'Origin': 'https://mw.graphql.knn3.xyz'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    // console.log(response.data)
    returnData = response.data.data.nfts[0].addrsHold
    console.log(returnData)
    sleep(500)
    return returnData
    
    
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log("1st")
  return returnData
}

app.get('/DAOToken/:address', (req, res) => {
    

  
});

app.get('/DAOActivity/:address', (req, res) => {
  res.json("Coming soon")
});

app.get('/POAP/:address', (req, res) => {
  res.json("Coming soon")
});

app.get('/Overall/:address', (req, res) => {
  res.json("Coming soon")
});


function getDifferenceFF(followers, following) {
    return followers.filter(object1 => {
      return !following.some(object2 => {
        return object1.address === object2.address;
      });
    });
  }

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));