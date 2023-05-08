const db = require('../../data/db-config')

async function getAll() {
  const tarifler = await db('tarifler')
  return tarifler
}

async function idyeGoreTarifGetir(tarif_id) {
  const tarif = await db('tarifler as t')
    .where('t.tarif_id', parseInt(tarif_id))
    .first()
  const adimlar = await db('tarifler as t')
    .leftJoin('adimlar as a', 't.tarif_id', 'a.tarif_id')
    .select('a.adim_id', 'a.adim_sirasi', 'a.adim_talimati')
    .where('t.tarif_id', parseInt(tarif_id))

  const miktar = await db('miktar as m')
    .leftJoin('tarifler as t', 't.tarif_id', 'm.tarif_id')
    .leftJoin('icindekiler as i', 'i.icindekiler_id', 'm.icindekiler_id')
    .leftJoin('adimlar as a', 'a.adim_id', 'm.adim_id')
    .select(
      't.tarif_id',
      'a.adim_id',
      'a.adim_sirasi',
      'i.icindekiler_id',
      'i.icindekiler_adi',
      'm.miktar'
    )
    .where('t.tarif_id', parseInt(tarif_id))

  const tarifModel = {
    tarif_id: tarif ? tarif.tarif_id : undefined,
    tarif_adi: tarif ? tarif.tarif_adi : undefined,
    kayit_tarihi: tarif ? tarif.kayit_tarihi : undefined,
    adimlar: [],
  }
  adimlar.forEach((adim) => {
    adimModel = {
      adim_id: parseInt(adim.adim_id),
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
          icindekiler_id: parseInt(miktar[i].icindekiler_id),
          icindekiler_adi: miktar[i].icindekiler_adi,
          miktar: miktar[i].miktar,
        })
      }
    }
  }

  return tarifModel
}

module.exports = { getAll, idyeGoreTarifGetir }
