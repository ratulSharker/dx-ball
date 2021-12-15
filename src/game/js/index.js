/* global $ Api */
$(function () {

	// Initial setup
	showHideRegisterPlay()
	$("#login-btn").on("click", handleLogin)
	$("#register-btn").on("click", handleRegister)
	$("#reset-password-btn").on("click", handleResetPassword)
	$("#play-btn").on("click", gameplayTapped)
	$("#hall-of-fame-btn").on("click", hallOfFameTapped)
	$("#logout-btn").on("click", handleLogout)
	var api = new Api()

	// Event handler
	function handleRegister() {
		api.register($("#register-form").serializeArray(),
			function (res) {
				localStorage.setItem("token", res.data.token)
				showHideRegisterPlay()
			},
			function (errMsg) {
				window.alert(errMsg)
			})
	}

	function handleLogin() {
		api.login($("#login-form").serializeArray(),
			function (res) {
				localStorage.setItem("token", res.data.token)
				showHideRegisterPlay()
			},
			function (errMsg) {
				window.alert(errMsg)
			})
	}

	function handleResetPassword() {
		api.resetPassword($("#reset-password-form").serializeArray(),
			function (res) {
				const msg = res.messages.en
				window.alert(msg)
			},
			function (errMsg) {
				window.alert(errMsg)
			})
	}

	function showHideRegisterPlay() {
		var token = localStorage.getItem("token")
		if (token) {
			$("#register-grp").hide().removeClass("d-none")
			$("#play-grp").show().removeClass("d-none")
		} else {
			$("#register-grp").show().removeClass("d-none")
			$("#play-grp").hide().removeClass("d-none")
		}
	}

	function gameplayTapped() {
		window.location = "/gameplay.html"
	}

	function hallOfFameTapped() {
		var token = localStorage.getItem("token")
		api.getTopScores(token,
			function (res) {
				console.log(res.data.topScores)

				var tbody = $("#hall-of-fame-tbody")
				tbody.empty()

				for(var index = 0; index < res.data.topScores.length; index++) {
					var tr = $("<tr>")

					$("<td>").html(res.data.topScores[index].user.name).appendTo(tr)
					$("<td>").html(res.data.topScores[index].score).appendTo(tr)
					$("<td>").html(new Date(res.data.topScores[index].updatedAt).toLocaleString()).appendTo(tr)

					tbody.append(tr)
				}

			},
			function (errMsg) {
				window.alert(errMsg)
			})
	}

	function handleLogout() {
		localStorage.removeItem("token")
		showHideRegisterPlay()
	}
})