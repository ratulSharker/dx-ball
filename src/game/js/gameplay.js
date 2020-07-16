/* global $ Game */

function gameSession(game, intervalId) {
	this.game = game
	this.intervalId = intervalId
}

$(document).ready(function () {
	isTokenNotFoundMoveToIndex()

	// setup gameplay
	var session = function() {
		var game = new Game(window.innerWidth, window.innerHeight, $("#canvas")[0])
		const fps = 60
		var intervalId = setInterval(gameloop, 1000 / fps)
		return new gameSession(game, intervalId)
	}()


	function gameloop() {
		session.game.draw()
	}


	// Events
	$(window).resize(function () {
		session.game.windowResized(window.innerWidth, window.innerHeight)
	})

	$("#canvas").mousemove(function (event) {
		session.game.mouseMoved(event.clientX)
	})

	$("#canvas").mouseup(function() {
		session.game.startGame()
	})

	$("#main_menu_btn").click(function() {
		window.location = "/index.html"
	})

	session.game.on("all_stage_finished", function(score) {
		clearInterval(session.intervalId)
		session.game.draw()
		console.log(score)
		$("#main_menu_btn").show().removeClass("d-none")
	})

	session.game.on("no_more_life", function (score) {
		clearInterval(session.intervalId)
		session.game.draw()
		console.log(score)
		$("#main_menu_btn").show().removeClass("d-none")
	})
})

// Helper
function isTokenNotFoundMoveToIndex() {
	var token = localStorage.getItem("token")

	if (!token) {
		window.location = "/"
	}
}