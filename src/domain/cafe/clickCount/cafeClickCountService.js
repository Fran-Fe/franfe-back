import { findAll, findOneByCafeUuid, createWhenWin, createWhenCompare } from './cafeClickCount.js';
import CafeClickCountNotFoundError from "../../../errors/cafeClickCountNotFoundError.js";
import ApiError from "../../../errors/apiError.js";
import { findByUuid } from "../cafeService.js";
import BooleanValidate from "../../../utils/booleanValidate.js";

export async function getCafeRankings() {
  let cafeClickCounts;
  try {
    cafeClickCounts = await findAll();
  }
  catch(error) {
    throw ApiError(error.message);
  }

  return {
    sortDescByUserComparisonCount: cafeClickCounts.sort(sortDescByUserComparisonCount).slice(0, 3),
    sortedDescByUserCompareWinCount: cafeClickCounts.sort(sortDescByUserCompareWinCount).slice(0, 3)
  };
}

export async function addComparisonCount(cafeUuid, booleanValidate) {
  const cafeClickCount = await findOneByCafeUuid(cafeUuid);

  if (booleanValidate && cafeClickCount == null) {
    throw new CafeClickCountNotFoundError(cafeUuid);
  } else if (!booleanValidate && cafeClickCount == null) {
    await createWhenCompare(cafeUuid);
    return;
  }

  await cafeClickCount.increment('userComparisonCount');
}

export async function addCompareWinCount(cafeUuid, booleanValidate) {
  const cafeClickCount = await findOneByCafeUuid(cafeUuid);

    if (booleanValidate && cafeClickCount == null) {
        throw new CafeClickCountNotFoundError(cafeUuid);
    } else if (!booleanValidate && cafeClickCount == null) {
      await createWhenWin(cafeUuid);
      return;
    }

    await cafeClickCount.increment('userCompareWinCount');
}

function sortDescByUserComparisonCount(first, second) {
  return first.userComparisonCount - second.userComparisonCount;
}

function sortDescByUserCompareWinCount(first, second) {
  return first.userCompareWinCount - second.userCompareWinCount;
}
