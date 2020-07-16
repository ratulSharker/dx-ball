/* global $ Api */
$(document).ready(function () {

	// Initial setup
	showHideRegisterPlay()
	$("#login-btn").click(handleLogin)
	$("#register-btn").click(handleRegister)
	$("#reset-password-btn").click(handleResetPassword)
	$("#play-btn").click(gameplayTapped)
	$("#logout-btn").click(handleLogout)
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

	function handleLogout() {
		localStorage.removeItem("token")
		showHideRegisterPlay()
	}
})