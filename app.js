
import express from 'express';
import bodyParser  from 'body-parser';
import {ethers} from 'ethers'
import axios  from 'axios';
// import dotenv from 'dotenv'
// import { Sample } from './Sample.js'; 

// dotenv.config();

const  app = express();
app.use(bodyParser.json());
const PORT = 5000;

const Rpc = "http://127.0.0.1:7545"
// const Rpc = "https://ethereum-goerli.publicnode.com"
const provider = new ethers.providers.JsonRpcProvider(Rpc);

const abi =  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_num",
        "type": "uint256"
      }
    ],
    "name": "addPeople",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "myNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "numToString",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "people",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_myNumber",
        "type": "uint256"
      }
    ],
    "name": "setNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const bytecode ="0x608060405234801561001057600080fd5b5061074f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063056744271461006757806323fd0e40146100975780633fb5c1cb146100b5578063795fff1d146100d15780639e7a13ad146100ed578063f2c9ecd81461011e575b600080fd5b610081600480360381019061007c91906104ba565b61013c565b60405161008e919061052b565b60405180910390f35b61009f6101dc565b6040516100ac919061054d565b60405180910390f35b6100cf60048036038101906100ca91906104ba565b6101e2565b005b6100eb60048036038101906100e69190610466565b6101ec565b005b610107600480360381019061010291906104ba565b610281565b604051610115929190610568565b60405180910390f35b61012661033d565b604051610133919061054d565b60405180910390f35b6001602052806000526040600020600091509050805461015b90610661565b80601f016020809104026020016040519081016040528092919081815260200182805461018790610661565b80156101d45780601f106101a9576101008083540402835291602001916101d4565b820191906000526020600020905b8154815290600101906020018083116101b757829003601f168201915b505050505081565b60005481565b8060008190555050565b60026040518060400160405280838152602001848152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001019080519060200190610252929190610346565b5050508160016000838152602001908152602001600020908051906020019061027c929190610346565b505050565b6002818154811061029157600080fd5b90600052602060002090600202016000915090508060000154908060010180546102ba90610661565b80601f01602080910402602001604051908101604052809291908181526020018280546102e690610661565b80156103335780601f1061030857610100808354040283529160200191610333565b820191906000526020600020905b81548152906001019060200180831161031657829003601f168201915b5050505050905082565b60008054905090565b82805461035290610661565b90600052602060002090601f01602090048101928261037457600085556103bb565b82601f1061038d57805160ff19168380011785556103bb565b828001600101855582156103bb579182015b828111156103ba57825182559160200191906001019061039f565b5b5090506103c891906103cc565b5090565b5b808211156103e55760008160009055506001016103cd565b5090565b60006103fc6103f7846105c9565b610598565b90508281526020810184848401111561041457600080fd5b61041f84828561061f565b509392505050565b600082601f83011261043857600080fd5b81356104488482602086016103e9565b91505092915050565b60008135905061046081610702565b92915050565b6000806040838503121561047957600080fd5b600083013567ffffffffffffffff81111561049357600080fd5b61049f85828601610427565b92505060206104b085828601610451565b9150509250929050565b6000602082840312156104cc57600080fd5b60006104da84828501610451565b91505092915050565b60006104ee826105f9565b6104f88185610604565b935061050881856020860161062e565b610511816106f1565b840191505092915050565b61052581610615565b82525050565b6000602082019050818103600083015261054581846104e3565b905092915050565b6000602082019050610562600083018461051c565b92915050565b600060408201905061057d600083018561051c565b818103602083015261058f81846104e3565b90509392505050565b6000604051905081810181811067ffffffffffffffff821117156105bf576105be6106c2565b5b8060405250919050565b600067ffffffffffffffff8211156105e4576105e36106c2565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561064c578082015181840152602081019050610631565b8381111561065b576000848401525b50505050565b6000600282049050600182168061067957607f821691505b6020821081141561068d5761068c610693565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61070b81610615565b811461071657600080fd5b5056fea2646970667358221220e011260a573133e7a71bad17c40fb41d653963d4ced2966a85f3c6daa460c80564736f6c63430008000033"




app.get('/', async (req, res) => {
     res.json({message: 'hello world!'});

}); 

//The route of cricket odds and its fixtures 
app.get('/cricket-api', async (req, res) => {

try {
  const optionsOdds = {
          method: 'GET',
          url: 'https://sports-api.cloudbet.com/pub/v2/odds/sports/cricket',
          headers: {
            'X-API-Key': 'eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MjAwOTg1NTk2MiwiaWF0IjoxNjk0NDk1OTYyLCJqdGkiOiI1ZTg5ZTU5Yy05Y2YwLTRjZGItYWUwZC00NWJiOWYwZjY2MDEiLCJzdWIiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMifQ.Cak7u2GKeXtWLJaDSHjhlE6GNGI8eESKJh1i4z24N5_JmlfVdTuexuCJ-mm3ZAaU4HnM8gpf5akfLByZGrKzUguKmjIGi902hrEMn6aaNCRa2WAltwjjn75JAx5Q6UsBBVQ3ywmQm9uKk-LNa3OeAInJ_J98x2bZvtkhmj-fjIX5_BO2TSb5bEZK4k6WSnQhBwEBJ9OxAXQj9J_zggqbtbTTEdH2_gZocKxEfl5w28c3riRrrRrcr7fPaENH0VyjaetAIhfnizq8UJE0ooKCu5xEMm6iYGWkrJOCQGDxJ1eIrS9fmRYZ-GuM8xsYJWerqZrU4fPk91rq3SbDkX0snw',
            'X-Host': 'https://sports-api.cloudbet.com'
          }
        };

  const optionsFixtures = {
    method: 'GET',
    url: 'https://sports-api.cloudbet.com/pub/v2/odds/events?sport=cricket&from=1694499311&to=1694556981&live=false&limit=10',
    headers: {
      'X-API-Key': 'eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MjAwOTg1NTk2MiwiaWF0IjoxNjk0NDk1OTYyLCJqdGkiOiI1ZTg5ZTU5Yy05Y2YwLTRjZGItYWUwZC00NWJiOWYwZjY2MDEiLCJzdWIiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMifQ.Cak7u2GKeXtWLJaDSHjhlE6GNGI8eESKJh1i4z24N5_JmlfVdTuexuCJ-mm3ZAaU4HnM8gpf5akfLByZGrKzUguKmjIGi902hrEMn6aaNCRa2WAltwjjn75JAx5Q6UsBBVQ3ywmQm9uKk-LNa3OeAInJ_J98x2bZvtkhmj-fjIX5_BO2TSb5bEZK4k6WSnQhBwEBJ9OxAXQj9J_zggqbtbTTEdH2_gZocKxEfl5w28c3riRrrRrcr7fPaENH0VyjaetAIhfnizq8UJE0ooKCu5xEMm6iYGWkrJOCQGDxJ1eIrS9fmRYZ-GuM8xsYJWerqZrU4fPk91rq3SbDkX0snw',
      'X-Host': 'https://sports-api.cloudbet.com'
    }
  };
  

  // Use Promise.all to send both requests concurrently
  const [responseOdds, responseFixtures] = await Promise.all([
    axios.request(optionsOdds),
    axios.request(optionsFixtures),
  ]);

  const data = {
    odds: responseOdds.data,
    fixtures: responseFixtures.data,
  };

  res.json(data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

// // cricket livematch Route
// app.get('/cricket-odds', async (req, res) => {

//   const options = {
//     method: 'GET',
//     url: 'https://sports-api.cloudbet.com/pub/v2/odds/sports/cricket',
//     headers: {
//       'X-API-Key': 'eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MjAwOTg1NTk2MiwiaWF0IjoxNjk0NDk1OTYyLCJqdGkiOiI1ZTg5ZTU5Yy05Y2YwLTRjZGItYWUwZC00NWJiOWYwZjY2MDEiLCJzdWIiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiI2Y2I4NWMxYi1lMzM3LTQwNzktYTNlOC04MzNlMGJlZTE5ZGMifQ.Cak7u2GKeXtWLJaDSHjhlE6GNGI8eESKJh1i4z24N5_JmlfVdTuexuCJ-mm3ZAaU4HnM8gpf5akfLByZGrKzUguKmjIGi902hrEMn6aaNCRa2WAltwjjn75JAx5Q6UsBBVQ3ywmQm9uKk-LNa3OeAInJ_J98x2bZvtkhmj-fjIX5_BO2TSb5bEZK4k6WSnQhBwEBJ9OxAXQj9J_zggqbtbTTEdH2_gZocKxEfl5w28c3riRrrRrcr7fPaENH0VyjaetAIhfnizq8UJE0ooKCu5xEMm6iYGWkrJOCQGDxJ1eIrS9fmRYZ-GuM8xsYJWerqZrU4fPk91rq3SbDkX0snw',
//       'X-Host': 'https://sports-api.cloudbet.com'
//     }
//   };
//         try {
//             let response = await axios.request(options);
//             console.log(response.data);
//             res.json(response.data);
          
//         } catch (error) {
//             console.error(error);
  
//         }  
      
  
//    });






 //deploying smart contract
 app.post('/deploy-smart-contract', async (req, res) => {
        try {

            ///create wallet
            const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
            // const wallet = new ethers.Wallet("0xd7fa089e5bbf9da9a7aee47cd13205202717b528d000e23ec7d1e13ad78b9c5c", provider);
            //instaniate smart contract
            const factory = new ethers.ContractFactory(abi, bytecode, wallet);

            //deploy the contract
            const contract = await factory.deploy();
            
            console.log(`deploy the contract: ${contract.address}`);
            
            
            res.status(200).json(`{address: ${contract.address}}`);


            
        } catch (error) {

            console.log('error deploying this contract', error);
            res.status(500).json({error: 'internal error occurs'});
            
        }
 });


app.listen(PORT, () => {
    console.log(`listen on the port:  + ${PORT}`);
  
})