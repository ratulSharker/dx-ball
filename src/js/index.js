
$(document).ready(function () {

	const game = new Game(window.innerWidth, window.innerHeight, $("#canvas")[0], $("#bat_canvas")[0], $("#stage_canvas")[0])

	// Initial setup
	$("#hall-of-fame-btn").click(function () {
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
	});

	$("#play-button").click(function() {
		hideMainMenu();
		showGamePlayScreen();
		$("#main_menu_btn").addClass("d-none");
		startGamePlay(game);
	});

	$("#main_menu_btn").click(function() {
		showMainMenu();
		hideGamePlayScreen();
		$("#main_menu_btn").addClass("d-none");
	});

	$("#usernamePromptModal").on("hidden.bs.modal", function() {
		let username = $("#username").val() || "No Name";
		let score = $("#score").val();

		let scoreMgr = new ScoreManager();
		scoreMgr.addScore(username, score);

		$("#main_menu_btn").removeClass("d-none");
	});

});

// Main menu and gameplay switching functionalities
function showGamePlayScreen() {
	$("#gameplay").removeClass("d-none");
}

function hideGamePlayScreen() {
	$("#gameplay").addClass("d-none");
}

function showMainMenu() {
	$("#main-menu").removeClass("d-none");
}

function hideMainMenu() {
	$("#main-menu").addClass("d-none");
}

// Gameplay related functions
function startGameplay(game) {
	game.reset();
	bindGameplayRelatedEvents(game)

	window.requestAnimationFrame(gameloop);

	// Events
	function gameloop() {
		game.draw()
		if(game.continueGameLoop()) {
			window.requestAnimationFrame(gameloop);
		}
	}
}

function bindGameplayRelatedEvents(game) {
	$(window).resize(function () {
		game.windowResized(window.innerWidth, window.innerHeight)
	})

	$("body").mousemove(function (event) {
		game.mouseMoved(event.clientX)
	})

	$("body").mouseup(function () {
		game.startGame()
	});

	// These events are idempotent
	// Applying twice will replace previous
	game.on("all_stage_finished", gameCompletedEitherAllStageCompletedOrNoMoreLife)
	game.on("no_more_life", gameCompletedEitherAllStageCompletedOrNoMoreLife)
}

function unbindGameplayDOMRelatedEvents() {
	$("body").off("mousemove");
	$("body").off("mouseup");
	$(window).off("resize");
}

function gameCompletedEitherAllStageCompletedOrNoMoreLife(score) {
	unbindGameplayDOMRelatedEvents()
	updateScore(score);
}

function updateScore(score) {
	$("#score").val(score);
	$("#label-for-username").text(`You scored ${score} on the last game. State your name to store the score.`);
	$("#usernamePromptModal").modal("show");
}