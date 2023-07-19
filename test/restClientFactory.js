import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

export function restGet(url){
    return chai.request(app).get(url);
}

export function restGetAssertFail(url, message){
    expect(restGet(url)).to.be.throw(message);
}

export function restPost(url){
    return chai.request(app).get(url);
}

export function restDelete(url){
    return chai.request(app).get(url);
}

export function restPatch(url){
    return chai.request(app).get(url);
}