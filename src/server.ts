import * as express from 'express';
import * as bodyParser from 'body-parser';
import KitsuApi from './kitsu-api';
import KitsuApiModel from './kitsu-api-model';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


app.get('/anime/season', async (req: express.Request, res: express.Response) => {
  const api = new KitsuApi();
  const season = req.query.season
  const year = req.query.year;
  const subtype = req.query.subtype;
  let result: KitsuApiModel = await api.query('anime').filter('season', season).filter('seasonYear', year).filter('subtype', subtype).execute();
  return res.send(result);
});
