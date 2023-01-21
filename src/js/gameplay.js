$(document).ready(function () {

	// setup gameplay
	var game = new Game(window.innerWidth, window.innerHeight, $("#canvas")[0], $("#bat_canvas")[0], $("#stage_canvas")[0])
	const fps = 60
	var intervalId = setInterval(gameloop, 1000 / fps)

	// Events
	function gameloop() {
		game.draw()
	}

	$(window).resize(function () {
		game.windowResized(window.innerWidth, window.innerHeight)
	})

	$("body").mousemove(function (event) {
		game.mouseMoved(event.clientX)
	})

	$("body").mouseup(function () {
		game.startGame()
	});

	game.on("all_stage_finished", gameCompletedEitherAllStageCompletedOrNoMoreLife)

	game.on("no_more_life", gameCompletedEitherAllStageCompletedOrNoMoreLife)

	function gameCompletedEitherAllStageCompletedOrNoMoreLife(score) {
		// TODO: Why need this inside of a `setTimeout` ?
		setTimeout(function () {
			clearInterval(intervalId)
			updateScore(score)
		}, 500)
	}

	function updateScore(score) {
		$("#score").val(score);
		$("#usernamePromptModal").modal("show");
	}

	$("#usernamePromptModal").on("hidden.bs.modal", function() {
		let username = $("#username").val() || "No Name";
		let score = $("#score").val();

		let scoreMgr = new ScoreManager();
		scoreMgr.addScore(username, score);

		$("#main_menu_btn").removeClass("d-none");
	});

})