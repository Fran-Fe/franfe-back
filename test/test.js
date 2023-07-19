import express from "express";
import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import {restGet} from "./restClientFactory.js";
import {ApiError} from "../errors/apiError.js";
import {User} from "../errors/errorMessages.js";

chai.use(chaiHttp);

export const app = express();

describe('Connect Success Test', function () {
    it('Server Connected Complete', function (done) {
        restGet('/index').end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        })
    });
    it('should fail', function () {
        restGet('/index').end(function (err, res) {
            expect(res).to.have.status(404);
            done();
        })
    });
});