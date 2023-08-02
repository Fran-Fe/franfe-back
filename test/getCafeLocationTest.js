import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {resetTestDb} from './baseTest.js';
import {restGet } from './restClientFactory.js';
import { getCafeLocationResponseAssert } from './assertionFactory.js';

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
})

describe('getCafeLocation Connect Success Test', function() {
  it('check all returns', function(done) {
    const queryMap = {userLat: "13", userLng: "13", distance: ""}
    restGet('/cafe/location', queryMap).end(function(err,res){
      getCafeLocationResponseAssert(res);

      done();
    })
  })
})
