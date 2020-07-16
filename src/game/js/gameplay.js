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
		console.log("game started")
		session.game.startGame()
	})

	session.game.on("all_stage_finished", function() {
		clearInterval(session.intervalId)
		window.alert("all stage finished")
	})

	session.game.on("no_more_life", function () {
		clearInterval(session.intervalId)
		window.alert("No more life left")
	})
})

// Helper
function isTokenNotFoundMoveToIndex() {
	var token = localStorage.getItem("token")

	if (!token) {
		window.location = "/"
	}
}