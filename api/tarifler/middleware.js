const TariflerModel = require('./model')

const checkTarif = async (req, res, next) => {
  try {
    // console.log('>>>>>>', req)

    const { id } = req.params
    const tarif = await TariflerModel.idyeGoreTarifGetir(id)

    if (
      !tarif.tarif_id ||
      tarif.tarif_id === undefined ||
      tarif.tarif_id === null
    ) {
      res.status(404).json({ message: `tarif_id:${id} bulunamadi.` })
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
