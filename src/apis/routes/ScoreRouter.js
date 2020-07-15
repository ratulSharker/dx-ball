const express = require("express")
const { UserHighestScoreController } = require("../controller/UserHighestScoreController")
const { Renderer } = require("../utility/Renderer")
const { Messages } = require("../resource/Messages")

const ScoreRouter = express.Router()


ScoreRouter.get("/top", async (req, res, next) => {
	try {
		// Following things needed to be done
		// 1. Get top 5 scores

		const topScores = await UserHighestScoreController.topScores(0, 5)

		res.json(Renderer(Messages.scoreFeched, {
			topScores: topScores
		}))

	} catch(error) {
		next(error)
	}
})



module.exports.ScoreRouter = ScoreRouter