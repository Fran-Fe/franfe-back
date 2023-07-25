import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.use(chaiHttp);

export function restGet(url,queryMap){
    let req = chai.request(app).get(url);
    if (queryMap) {
        req = req.query(queryMap);
    }

    return req;
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