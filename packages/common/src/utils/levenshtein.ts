/**
 * Calculate the Levenshtein distance between two strings
 */
export const getLevenshteinDistance = (a: string, b: string) => {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0)
  );

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }

  return dp[a.length][b.length];
};

const getValidLevenshteinDistance = (searchText: string, itemText?: string) =>
  getLevenshteinDistance(
    itemText?.toLowerCase() || '',
    searchText.toLowerCase()
  );

/**
 * Sort two strings by their Levenshtein distance to a search text
 */
export const sortByLevenshteinDistance = (
  searchText: string,
  a?: string,
  b?: string
) =>
  getValidLevenshteinDistance(searchText, a) -
  getValidLevenshteinDistance(searchText, b);

/**
 * Sort two strings by their first character and their Levenshtein distance to a search text
 */
export const sortByFirstCharAndLevenshteinDistance = (
  searchText: string,
  a: string,
  b: string
) => {
  const normalizedSearchText = searchText.toLowerCase();
  const normalizedA = a.toLowerCase();
  const normalizedB = b.toLowerCase();
  if (normalizedA === normalizedB) {
    return 0;
  } else if (
    normalizedA[0] === normalizedSearchText[0] &&
    normalizedB[0] !== normalizedSearchText[0]
  ) {
    return -1;
  } else if (
    normalizedB[0] === normalizedSearchText[0] &&
    normalizedA[0] !== normalizedSearchText[0]
  ) {
    return 1;
  } else {
    return sortByLevenshteinDistance(
      normalizedSearchText,
      normalizedA,
      normalizedB
    );
  }
};
