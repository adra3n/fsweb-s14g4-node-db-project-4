const TariflerModel = require('./model')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const tarifler = await TariflerModel.getAll()
    res.json(tarifler)
  } catch (error) {
    next(error)
  }
})

router.get('/tarif_id', async (req, res, next) => {
  try {
    const { tarif_id } = req.params
    const tarif = await TariflerModel.idyeGoreTarifGetir(tarif_id)
    if (tarif) {
      res.json(tarif)
    } else {
      res.status(400).json({ message: 'tarif bulunamadi' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
