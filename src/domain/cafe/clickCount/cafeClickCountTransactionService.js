import { addComparisonCount, getCafeRankings } from "./cafeClickCountService.js";
import ApiError, { throwApiError } from "../../../errors/apiError.js";
import { CafeRankingDto } from "../../../routes/dtos/CafeRankingDto.js";
import BooleanValidate from "../../../utils/booleanValidate.js";
import { findByUuid } from "../cafeService.js";

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
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}

async function makeUserCompareWinRank(sortedByUserComparisonCount) {
  const listOfUserCompareWinList = (await sortedByUserComparisonCount)
    .map((userCompareWinCount, index) => {
      return new CafeRankingDto.UserCompareWinElement(index + 1, userCompareWinCount.cafeUuid);
    });

  return new CafeRankingDto.UserCompareWinRank(listOfUserCompareWinList);
}

async function makeUserComparisonRank(sortedByUserComparisonCount) {
  const listOfUserCompareWinList = (await sortedByUserComparisonCount)
    .map((userComparisonCount, index) => {
      return new CafeRankingDto.UserComparisonElement(index + 1, userComparisonCount.cafeUuid);
    });
  return new CafeRankingDto.UserComparisonRank(listOfUserCompareWinList);
}
