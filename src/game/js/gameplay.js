/* global $ Game Api */


$(document).ready(function () {
	isTokenNotFoundMoveToIndex()

	// setup gameplay
	var game = new Game(window.innerWidth, window.innerHeight, $("#canvas")[0])
	const fps = 60
	var intervalId = setInterval(gameloop, 1000 / fps)
	var api = new Api()


	// Events
	function gameloop() {
		game.draw()
	}

	$(window).resize(function () {
		game.windowResized(window.innerWidth, window.innerHeight)
	})

	$("#canvas").mousemove(function (event) {
		game.mouseMoved(event.clientX)
	})

	$("#canvas").mouseup(function () {
		game.startGame()
	})

	$("#main_menu_btn").click(function () {
		window.location = "/index.html"
	})

	game.on("all_stage_finished", function (score) {
		setTimeout(function () {
			clearInterval(intervalId)
			updateScore(score)
			$("#main_menu_btn").show().removeClass("d-none")
		}, 500)

		// Alternate interesting implementation,
		// clearInterval(intervalId)
		// setTimeout(function () {
		// 	game.draw()
		// 	updateScore(score)
		// 	$("#main_menu_btn").show().removeClass("d-none")
		// }, 1000)
	})

	game.on("no_more_life", function (score) {
		setTimeout(function () {
			clearInterval(intervalId)
			updateScore(score)
			$("#main_menu_btn").show().removeClass("d-none")
		}, 500)
	})

	function updateScore(score) {
		var token = localStorage.getItem("token")
		api.updateScore(score, token,
			function (res) {
				const msg = res.messages.en
				window.alert(msg)
			},
			function (errMsg) {
				window.alert(errMsg)
			})
	}

	function isTokenNotFoundMoveToIndex() {
		var token = localStorage.getItem("token")

		if (!token) {
			window.location = "/"
		}
	}
})