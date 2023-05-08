const db = require('../../data/db-config')

async function getAll() {
  const tarifler = await db('tarifler')
  return tarifler
}

async function idyeGoreTarifGetir(tarif_id) {
  const tarif = await db('tarifler').where('tarifler.id', tarif_id)

  const adimlar = await db('tarifler')
    .leftJoin('adimlar', 'tarifler.id', 'adimlar.tarifler_id')
    .select('adimlar.id', 'adimlar.adim_sirasi', 'adimlar.adim_talimati')
    .where('tarifler.id', tarif_id)

  const miktar = await db('miktar')
    .leftJoin('tarifler', 'tarifler.id', 'miktar.tarifler_id')
    .leftJoin('icindekiler', 'icindekiler.id', 'miktar.icindekiler_id')
    .leftJoin('adimlar', 'adimlar.id', 'miktar.adimlar_id')
    .select(
      'tarifler.id as tarif_id',
      'adimlar.id as adim_id',
      'adimlar.adim_sirasi as adim_sirasi',
      'icindekiler.id as icindekiler_id',
      'icindekiler.icindekiler_adi as icindekiler_adi',
      'miktar.miktar as miktar'
    )
    .where('tarifler.id', tarif_id)

  const tarifModel = {
    tarif_id: tarif[0].id,
    tarif_adi: tarif[0].tarif_adi,
    kayit_tarihi: tarif[0].kayit_tarihi,
    adimlar: [],
  }

  adimlar.forEach((adim) => {
    adimModel = {
      adim_id: adim.id,
      adim_sirasi: adim.adim_sirasi,
      adim_talimati: adim.adim_talimati,
      icindekiler: [],
    }
    tarifModel.adimlar.push(adimModel)
  })

  for (let i = 0; i < miktar.length; i++) {
    for (let k = 0; k < tarifModel.adimlar.length; k++) {
      if (miktar[i].adim_sirasi == tarifModel.adimlar[k].adim_sirasi) {
        tarifModel.adimlar[k].icindekiler.push({
          icindekiler_id: miktar[i].icindekiler_id,
          icindekiler_adi: miktar[i].icindekiler_adi,
          miktar: miktar[i].miktar,
        })
      }
    }
  }

  return tarifModel
}

module.exports = { getAll, idyeGoreTarifGetir }
