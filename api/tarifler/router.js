const TariflerModel = require('./model')
const middleware = require('./middleware')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const tarifler = await TariflerModel.getAll()
    res.json(tarifler)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', middleware.checkTarif, (req, res, next) => {
  try {
    res.json(req.tarifExists)
  } catch (error) {
    next(error)
  }
})

module.exports = router
