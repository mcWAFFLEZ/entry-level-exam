import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get(APIPath, (req, res) => {

  //### this is for me, to understand the concept
  /* console.log("*********************************");
  console.log("object: " + JSON.stringify(req.query));
  console.log('data: ' + req.query);
  console.log("is empty: " + (Object.keys(req.query).length == 0)); */


  // @ts-ignore
  const searchedString: string = req.query.search || '';
  // @ts-ignore
  const page: number = parseInt(req.query.page) || 1;

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = page * PAGE_SIZE;

  //filter and paginate
  const filteredData = tempData.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(searchedString));
  const paginatedData = filteredData.slice(startIndex, endIndex);

  //coating additional data
  const results: any = {};
  results.results = paginatedData;
  const pageLimit = Math.round(filteredData.length / PAGE_SIZE)
  
  //client will always get the upperbound
  results.pageUpperBound = pageLimit

  /* console.log(searchedString);
  console.log(pageLimit); */
  
  res.send(results);
});

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

