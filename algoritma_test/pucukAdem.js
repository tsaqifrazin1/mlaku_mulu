function climbingLeaderboard(arrRanked, player) {
    let result = [];
    let uniqueScores = [...new Set(arrRanked)];
    for (const score of player) {
        if (score >= uniqueScores[0]) {
            result.push(1);
        } else if (score < uniqueScores[uniqueScores.length - 1]) {
            result.push(uniqueScores.length + 1);
        } else {
            result.push(rankBinarySearch(score, uniqueScores));
        }
    }
    return result;
}
function rankBinarySearch(score, uniqueScores) {
    let start = 0;
    let end = uniqueScores.length - 1;
    while (true) {
        let mid = Math.floor((start + end) / 2);
        if (uniqueScores[mid] === score) {
            return mid + 1;
        } else if (uniqueScores[mid] > score && uniqueScores[mid + 1] < score) {
            return mid + 2;
        } else if (uniqueScores[mid] < score && uniqueScores[mid - 1 > score]) {
            return mid - 1;
        }
        if (score < uniqueScores[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
}

console.log(climbingLeaderboard([100,100,50,40,40,20,10], [5,25,50,120]))
