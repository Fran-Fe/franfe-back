import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";
import { getCafeDetailResponseAssert } from "./assertionFactory.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
});

describe('CafeInfos Connect Success Test', function () {
  it('리턴이 정해진 필드를 모두 가지고 있어야 한다.', function (done) {
    const cafeUuid = 'abc';
    const queryMap = {isWin: "0"}

    restGet(`/cafe-infos/${cafeUuid}`, queryMap).end(function (err, res) {

      getCafeDetailResponseAssert(res);
      done();
    })
  }),
    it('is win = true 로 콜을 날리면 user_compare_win_count가 1 느는 콜이 정상적으로 처리 되어야 한다.', function (done) {
      const cafeUuid = 'abc';
      const queryMap = {isWin: "1"}

      restGet(`/cafe-infos/${cafeUuid}`, queryMap).end(function (err, res) {

        getCafeDetailResponseAssert(res);


        done();
      })
    })
});

export function getCafeDetailWithWin(cafeUuid, isWin) {
  it('is win = true 로 콜을 날리면 user_compare_win_count가 1 늘어야 한다.', function (done) {
    const queryMap = {isWin: isWin}

    restGet(`/cafe-infos/${cafeUuid}`, queryMap).end(function (err, res) {

      getCafeDetailResponseAssert(res);

      done();
    })
  })
}
