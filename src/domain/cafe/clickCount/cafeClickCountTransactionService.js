import { getCafeRankings } from "./cafeClickCountService.js";
import ApiError, { throwApiError } from "../../../errors/apiError.js";
import { CafeRankingDto } from "../../../routes/dtos/CafeRankingDto.js";

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
