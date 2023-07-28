import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {resetTestDb} from './baseTest.js';
import {restGet } from './restClientFactory.js';
import { getCafeLotationResponseAssert } from './assertionFactory.js';



beforeEach(async () => {
  await resetTestDb();
})

describe('getCafeLocation Connect Success Test', function() {
  it('check all returns', function(done) {
    restGet('/cafeLocation').end(function(err,res){
      if(err) console.error(err);
      getCafeLotationResponseAssert(res);
      done();
    })
  })
})
