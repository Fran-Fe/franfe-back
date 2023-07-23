import { getCafeRankings } from "./cafeClickCountService.js";
import ApiError from "../../errors/apiError.js";
import { CafeRankingDto } from "../../routes/dtos/CafeRankingDto.js";

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
  let rank = 1;

  const listOfUserCompareWinElement = (await sortedByUserComparisonCount)
    .map((userCompareWinCount) => {
      new CafeRankingDto.UserCompareWinElement(rank++, sortedByUserComparisonCount.cafeUuid);
    });

  return new CafeRankingDto.UserCompareWinRank(listOfUserCompareWinElement);
}

async function makeUserComparisonRank(sortedByUserComparisonCount) {
  let rank = 1;

  const listOfUserCompareWinElement = (await sortedByUserComparisonCount)
    .map((userComparisonCount) => {
      new CafeRankingDto.UserComparisonElement(rank++, sortedByUserComparisonCount.cafeUuid);
    });

  return new CafeRankingDto.UserComparisonRank(listOfUserCompareWinElement);
}
