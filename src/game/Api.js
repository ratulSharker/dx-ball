/* global $*/
/* eslint-disable no-unused-vars */


var Api = {

}

Api.objectifyForm = function (formArray) {

	var returnObj = {
	}
	for (var i = 0; i < formArray.length; i++){
		returnObj[formArray[i]["name"]] = formArray[i]["value"]
	}
	return returnObj
}

Api.getErrorMsg = function getErrorMsg(xhr) {
	const res = JSON.parse(xhr.responseText)
	return res.messages.en
}

Api.jsonPostRequest = function (url, data, success, error) {
	$.post({
		url: url,
		data: JSON.stringify(data),
		contentType : "application/json; charset=utf-8",
		dataType: "json",
		success: success,
		error: error
	})
}

/* eslint-enable no-unused-vars */

