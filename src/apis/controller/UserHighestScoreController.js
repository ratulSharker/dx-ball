const { UserHighestScoreModel } = require("../model/UserHighestScoreModel")


const UserHighestScoreController = {

}

UserHighestScoreController.findScoreForUser = (userId) => {
	return UserHighestScoreModel.findOne({
		where: {
			userId: userId
		}
	})
}

UserHighestScoreController.createHighestScore = (userId, score) => {
	return UserHighestScoreModel.create({
		userId: userId,
		score: score
	})
}

UserHighestScoreController.update = (userId, score) => {
	return UserHighestScoreModel.update({
		score: score
	}, {
		where : {
			userId: userId
		}
	})
}

UserHighestScoreController.topScores = (offset, limit) => {
	return UserHighestScoreModel.findAll({
		offset: offset,
		limit: limit,
		order: [
			["score", "DESC"]
		]
	})
}


module.exports.UserHighestScoreController = UserHighestScoreController