import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";
import { getCafeRankingsResponseAssert } from "./assertionFactory.js";
import { getCafeDetailWithWin } from "./getCafeDetailTest.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
});

describe('getCafeRankings Connect Success Test', function () {
  it('리턴이 정해진 필드를 모두 가지고 있어야 한다.', function (done) {
    restGet('/cafe-rankings').end(function (err, res) {

      getCafeRankingsResponseAssert(res);
      done();
    })
  }),
    it('is win = true 로 콜을 날리면 user_compare_win_count가 1 느는 콜이 정상적으로 처리 되어야 한다. 다른건 다 0 이니 가장 처음 것이 true 날린 cafeUuid 일것이다.', function (done) {
      const cafeUuid = 'abc';

      getCafeDetailWithWin('abc', "1");

      restGet('/cafe-rankings').end(function (err, res) {
        expect(res.body.userCompareWinRank.list[0].cafeUuid).is.equal(cafeUuid);

        done();
      })
    });
});