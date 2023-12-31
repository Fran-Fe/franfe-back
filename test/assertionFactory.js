import { expect } from "chai";

export function getCafeDetailResponseAssert(res) {
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

export function getCafeRankingsResponseAssert(res) {
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

export function getAllCafesResponseAssert(res) {
  expect(res).to.have.status(200);
  expect(res.body[0]).to.have.property("uuid");
  expect(res.body[0]).to.have.property("address");
  expect(res.body[0]).to.have.property("placeName");
}

export function getCafeLocationResponseAssert(res) {
  expect(res).to.have.status(200);
  if (res.body.length > 0) {
    expect(res.body[0]).to.have.property('uuid');
    expect(res.body[0]).to.have.property('address');
    expect(res.body[0]).to.have.property('placeName');
    expect(res.body[0]).to.have.property('rating');
    expect(res.body[0]).to.have.property('reviewCount');
    expect(res.body[0]).to.have.property('thumbnails');
    expect(res.body[0].thumbnails[0]).to.have.property('category');
    expect(res.body[0].thumbnails[0]).to.have.property('bucketUrl');
    expect(res.body[0]).to.have.property('hashTags');
  }
}

export function getAllPhotosForCafesAssert(res) {
  expect(res).to.have.status(200);
  expect(res.body[0]).to.have.property("cafeUuid");
  expect(res.body[0]).to.have.property("bucketUrlList");
}
