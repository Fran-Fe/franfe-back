import { addComparisonCount, getCafeRankings } from "./cafeClickCountService.js";
import { throwApiError } from "../../../errors/apiError.js";
import { CafeRankingDto } from "../../../routes/dtos/CafeRankingDto.js";
import BooleanValidate from "../../../utils/booleanValidate.js";
import { findByUuid as findCafeByUuid } from "../cafeService.js";
import { findOneInteriorPhotoByCafeUuid } from "../photo/cafePhotoUrlService.js";
import async from "async";

export async function getRankings() {
  try {

    const {sortDescByUserComparisonCount, sortedDescByUserCompareWinCount} = await getCafeRankings();
    const userComparisonRank = await makeUserComparisonRank(sortDescByUserComparisonCount);
    const userCompareWinRank = await makeUserCompareWinRank(sortedDescByUserCompareWinCount);
    return new CafeRankingDto.Response(userComparisonRank, userCompareWinRank);

  } catch (error) {
    throwApiError(error);
  }
}

export async function chooseAsCompare(cafeUuids) {
  try {

    for (const cafeUuid of cafeUuids) {
      const _ = await findByUuid(cafeUuid, BooleanValidate.TRUE)

      await addComparisonCount(cafeUuid, BooleanValidate.FALSE);
    }

  } catch (error) {
    throwApiError(error);
  }
}

async function makeUserCompareWinRank(sortedByUserComparisonCount) {
  const listOfUserCompareWinListPromises = (await sortedByUserComparisonCount)
    .map(async (userCompareWinCount, index) => {
      const cafeName = (await findCafeByUuid(userCompareWinCount.cafeUuid, BooleanValidate.TRUE)).placeName;
      const imageUrl = (await findOneInteriorPhotoByCafeUuid(userCompareWinCount.cafeUuid, BooleanValidate.TRUE)).url;

      return new CafeRankingDto.UserCompareWinElement(index + 1, userCompareWinCount.cafeUuid, cafeName, imageUrl);
    });
  const listOfUserCompareWinList = await Promise.all(listOfUserCompareWinListPromises);

  return new CafeRankingDto.UserComparisonRank(listOfUserCompareWinList);
}

async function makeUserComparisonRank(sortedByUserComparisonCount) {
  const listOfUserCompareListPromises = sortedByUserComparisonCount.map(async (userComparisonCount, index) => {
    const cafeName = (await findCafeByUuid(userComparisonCount.cafeUuid, BooleanValidate.TRUE)).placeName;
    const imageUrl = (await findOneInteriorPhotoByCafeUuid(userComparisonCount.cafeUuid, BooleanValidate.TRUE)).url;

    return new CafeRankingDto.UserComparisonElement(index + 1, userComparisonCount.cafeUuid, cafeName, imageUrl);
  });

  const listOfUserCompareList = await Promise.all(listOfUserCompareListPromises);

  return new CafeRankingDto.UserComparisonRank(listOfUserCompareList);
}
