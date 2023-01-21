/* global $ Api */
$(document).ready(function () {

	// Initial setup
	$("#hall-of-fame-btn").click(hallOfFameTapped)

	function hallOfFameTapped() {
		let scoreManager = new ScoreManager();
		let allScores = scoreManager.getAllScores();
		let hallOfFameTableBody = $("#hall-of-fame-tbody")
		hallOfFameTableBody.empty();

		let scoresElements = "";
		for(let index in allScores) {
			let score = allScores[index];
			scoresElements += "<tr>" + 
				"<td>" + score['username'] + "</td>" +
				"<td>" + score['score'] + "</td>" +
			"</tr>";
		}
		hallOfFameTableBody.append(scoresElements);

		$("#hallOfFameModal").modal("show");
	}
})