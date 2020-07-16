/* global $*/

function Api() {

}

Api.prototype.objectifyForm = function (formArray) {

	var returnObj = {
	}
	for (var i = 0; i < formArray.length; i++){
		returnObj[formArray[i]["name"]] = formArray[i]["value"]
	}
	return returnObj
}

Api.prototype.getErrorMsg = function getErrorMsg(xhr) {
	const res = JSON.parse(xhr.responseText)
	return res.messages.en
}

Api.prototype.jsonPostRequest = function(url, data, success, error) {
	$.post({
		url: url,
		data: JSON.stringify(data),
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: success,
		error: error
	})
}

Api.prototype.register = function(serializedArrayData, successCallback, errorCallback) {
	var registerData = this.objectifyForm(serializedArrayData)
	var self = this
	this.jsonPostRequest(
		"/api/v1/register",
		registerData,
		successCallback,
		function (xhr) {
			const errMsg = self.getErrorMsg(xhr)
			errorCallback(errMsg)
		}
	)
}

Api.prototype.login = function(serializedArrayData, successCallback, errorCallback) {
	var loginData = this.objectifyForm(serializedArrayData)
	var self = this
	this.jsonPostRequest(
		"/api/v1/authentication/login",
		loginData,
		successCallback,
		function(xhr) {
			const errMsg = self.getErrorMsg(xhr)
			errorCallback(errMsg)
		}
	)
}

Api.prototype.resetPassword = function(serializedArrayData, successCallback, errorCallback) {
	var resetPasswordData = this.objectifyForm(serializedArrayData)
	var self = this
	this.jsonPostRequest(
		"/api/v1/authentication/reset-password",
		resetPasswordData,
		successCallback,
		function(xhr) {
			const errMsg = self.getErrorMsg(xhr)
			errorCallback(errMsg)
		}
	)
}

Api.prototype.updateScore = function(score, token, successCallback, errorCallback) {
	var self = this
	$.ajax({
		type: "put",
		url: "api/v1/users/me/highest-score",
		data: JSON.stringify({
			score: score
		}),
		contentType : "application/json; charset=utf-8",
		headers: {
			"Authorization" : token,
		},
		dataType: "json",
		success: successCallback,
		error: function (xhr) {
			var errMsg = self.getErrorMsg(xhr)
			errorCallback(errMsg)
		}
	})
}