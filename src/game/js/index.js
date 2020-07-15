/* global $ Api */
$( document ).ready(function() {
	showHideRegisterPlay()
	$("#login-btn").click(handleLogin)
	$("#register-btn").click(handleRegister)
	$("#reset-password-btn").click(handleResetPassword)
	$("#logout-btn").click(handleLogout)
})


function showHideRegisterPlay() {
	var token = localStorage.getItem("token")
	if(token) {
		$("#register-grp").hide().removeClass("d-none")
		$("#play-grp").show().removeClass("d-none")
	} else {
		$("#register-grp").show().removeClass("d-none")
		$("#play-grp").hide().removeClass("d-none")
	}
}

function handleRegister() {
	var registerData = Api.objectifyForm($("#register-form").serializeArray())
	Api.jsonPostRequest(
		"/api/v1/register",
		registerData,
		function(res) {
			localStorage.setItem("token", res.data.token)
			showHideRegisterPlay()
		},
		function (xhr) {
			const errMsg = Api.getErrorMsg(xhr)
			window.alert(errMsg)
		}
	)
}

function handleLogin() {
	var loginData = Api.objectifyForm($("#login-form").serializeArray())
	Api.jsonPostRequest(
		"/api/v1/authentication/login",
		loginData,
		function(res) {
			localStorage.setItem("token", res.data.token)
			showHideRegisterPlay()
		},
		function(xhr) {
			const errMsg = Api.getErrorMsg(xhr)
			window.alert(errMsg)
		}
	)
}

function handleResetPassword() {
	var resetPasswordData = Api.objectifyForm($("#reset-password-form").serializeArray())
	Api.jsonPostRequest(
		"/api/v1/authentication/reset-password",
		resetPasswordData,
		function(res) {
			const msg = res.messages.en
			window.alert(msg)
		},
		function(xhr) {
			const errMsg = Api.getErrorMsg(xhr)
			window.alert(errMsg)
		}
	)
}

function handleLogout() {
	localStorage.removeItem("token")
	showHideRegisterPlay()
}