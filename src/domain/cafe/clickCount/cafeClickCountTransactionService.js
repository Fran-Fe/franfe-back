import { getCafeRankings } from "./cafeClickCountService.js";
import ApiError from "../../../errors/apiError.js";
import { CafeRankingDto } from "../../../routes/dtos/CafeRankingDto.js";

export async function getRankings() {
  try {

    const {sortedByUserComparisonCount, sortedDescByUserCompareWinCount} = getCafeRankings();
    const userCompareWinRank = makeUserCompareWinRank(sortedByUserComparisonCount);
    const userComparisonRank = makeUserComparisonRank(sortedByUserComparisonCount);
    return new CafeRankingDto.Response(userComparisonRank, userCompareWinRank);

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message);
  }
}

async function makeUserCompareWinRank(sortedByUserComparisonCount) {
  const listOfUserCompareWinElement = (await sortedByUserComparisonCount)
    .map((userCompareWinCount, index) => {
      new CafeRankingDto.UserCompareWinElement(index + 1, userCompareWinCount.cafeUuid);
    });

  return new CafeRankingDto.UserCompareWinRank(listOfUserCompareWinElement);
}

async function makeUserComparisonRank(sortedByUserComparisonCount) {
  const listOfUserCompareWinElement = (await sortedByUserComparisonCount)
    .map((userComparisonCount, index) => {
      new CafeRankingDto.UserComparisonElement(index + 1, userComparisonCount.cafeUuid);
    });

  return new CafeRankingDto.UserComparisonRank(listOfUserCompareWinElement);
}
