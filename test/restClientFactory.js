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

export function restPost(url, body){
    return chai.request(app).post(url).send(body);
}

export function restDelete(url){
    return chai.request(app).delete(url);
}

export function restPatch(url){
    return chai.request(app).patch(url);
}