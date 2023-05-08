const TariflerModel = require('./model')

const checkTarif = async (req, res, next) => {
  try {
    const { id } = req.params
    const tarif = await TariflerModel.idyeGoreTarifGetir(id)

    if (!tarif || tarif === undefined || tarif === null) {
      res.status(404).json({ message: `${id} id'li tarif bulunamadi` })
    } else {
      req.tarifExists = tarif
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkTarif,
}
