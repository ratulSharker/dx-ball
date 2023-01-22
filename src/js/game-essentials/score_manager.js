
function ScoreManager() {

}

ScoreManager.prototype.getStorageKey = function() {
	return "score";
}

ScoreManager.prototype.maxNumberOfScoreToScore = function() {
	return 5;
}

ScoreManager.prototype.getAllScores = function() {
	const storageKey = this.getStorageKey();
	let storedValue = localStorage.getItem(storageKey);
	if(storedValue) {
		return JSON.parse(storedValue);
	} else {
		return [];
	}
}

ScoreManager.prototype.saveAllScores = function(allScores) {
	let storageKey = this.getStorageKey();
	let value = JSON.stringify(allScores);
	localStorage.setItem(storageKey, value);
}

ScoreManager.prototype.addScore = function(username, score) {
	let scores = this.getAllScores();
	scores.push({
		username: username,
		score: score
	});

	scores.sort(function(first, second) {
		return second.score - first.score;
	});

	scores = scores.slice(0, Math.min(scores.length, this.maxNumberOfScoreToScore()));
 
	this.saveAllScores(scores);
}
