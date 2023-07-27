import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
})

describe('postLog Connect Success Test' function(){
  it('DB')
})
