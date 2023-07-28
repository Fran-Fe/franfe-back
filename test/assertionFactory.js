import { expect } from "chai";

export function getCafeDetailResponseAssert(res){
  expect(res).to.have.status(200);
  expect(res.body).to.have.property('uuid');
  expect(res.body).to.have.property('address');
  expect(res.body).to.have.property('lat');
  expect(res.body).to.have.property('lng');
  expect(res.body).to.have.property('placeName');
  expect(res.body).to.have.property('rating');
  expect(res.body).to.have.property('options');
  expect(res.body.options[0]).to.have.property('option');
  expect(res.body.options[0]).to.have.property('optionOn');
  expect(res.body).to.have.property('hashtags');
  expect(res.body).to.have.property('reviews');
  expect(res.body.reviews[0]).to.have.property('authorName');
  expect(res.body.reviews[0]).to.have.property('rating');
  expect(res.body.reviews[0]).to.have.property('relativeTimeDescription');
  expect(res.body).to.have.property('thumbnailS3List');
  expect(res.body.thumbnailS3List[0]).to.have.property('bucketUrl');
  expect(res.body.thumbnailS3List[0]).to.have.property('category');
}

export function getCafeRankingsResponseAssert(res){
  expect(res).to.have.status(200);
  expect(res.body).to.have.property('userComparisonRank');
  expect(res.body.userComparisonRank).to.have.property('list');
  expect(res.body.userComparisonRank.list[0]).to.have.property('rank');
  expect(res.body.userComparisonRank.list[0]).to.have.property('cafeUuid');
  expect(res.body).to.have.property('userCompareWinRank');
  expect(res.body.userCompareWinRank).to.have.property('list');
  expect(res.body.userCompareWinRank.list[0]).to.have.property('rank');
  expect(res.body.userCompareWinRank.list[0]).to.have.property('cafeUuid');
}

export function getCafeLotationResponseAssert(res) {
  expect(res).to.have.status(200);
  expect(res.body);
  console.log(res.body);
  // expect(res.body).to.have.property('uuid');
  // expect(res.body).to.have.property('address');
  // expect(res.body).to.have.property('placeName');

}
