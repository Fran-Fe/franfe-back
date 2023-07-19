import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import {restGet} from "./restClientFactory.js";

chai.use(chaiHttp);

export function restGetAssertFail(app, url){
    expect(restGet(app, url)).to.have.status(200);
    return chai.request(app).get(url);
}