import { findAll } from './cafeClickCount.js';

export function getCafeRankings() {
  const cafeClickCounts = findAll();

  return {
    sortedByUserComparisonCount: cafeClickCounts.sort(sortDescByUserComparisonCount),
    sortedDescByUserCompareWinCount: cafeClickCounts.sort(sortDescByUserCompareWinCount)
  };
}

function sortDescByUserComparisonCount(first, second) {
  return first.userComparisonCount - second.userComparisonCount;
}

function sortDescByUserCompareWinCount(first, second) {
  return first.userCompareWinCount - second.userCompareWinCount;
}
