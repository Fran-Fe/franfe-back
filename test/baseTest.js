import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import {restGet} from "./restClientFactory.js";

chai.use(chaiHttp);
