const express = require("express")
const { UserPolicies } = require("../policies/UserPolicies")
const { UserHighestScoreController } = require("../controller/UserHighestScoreController")
const { Renderer } = require("../utility/Renderer")
const { Messages } = require("../resource/Messages")

const UserRouter = express.Router()


UserRouter.put("/highest-score", async (req, res, next) => {
	try {
		// Followiong things needed to be done
		// 1. Validate the update highest score request body.
		// 2. Find score if there any.
		// 3. If no score found, then create the score.
		// 4. If score found, then compare with existing.
		// 5. If existing is high, then update to existing

		// #1
		const validatedBody = UserPolicies.validateUpdateHighestScoreRequestBody(req.body)

		// #2
		const userId = req.userId
		const existingScore = await UserHighestScoreController.findScoreForUser(userId)

		if(!existingScore) {
			// #3
			await UserHighestScoreController.createHighestScore(userId, validatedBody.score)
		} else {
			// #4 - #5
			if(existingScore.score < validatedBody.score) {
				await UserHighestScoreController.update(userId, validatedBody.score)
			}
		}

		res.json(Renderer(Messages.scoreUpdated, {

		}))

	} catch(error) {
		next(error)
	}
})


module.exports.UserRouter = UserRouter