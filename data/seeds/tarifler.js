/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('miktar').truncate()
  await knex('icindekiler').truncate()
  await knex('adimlar').truncate()
  await knex('tarifler').truncate()
  await knex('tarifler').insert([
    {
      tarif_adi: 'Spagetti Bolonez',
      kayit_tarihi: '2021-01-01 08:23:19.120',
    },
  ])
  await knex('adimlar').insert([
    {
      tarif_id: 1,
      adim_sirasi: 1,
      adim_talimati: 'Büyük bir tencereyi orta ateşe koyun',
    },
    {
      tarif_id: 1,
      adim_sirasi: 2,
      adim_talimati: 'Yumurta ve jambonu karıştırın',
    },
  ])
  await knex('icindekiler').insert([
    { icindekiler_adi: 'yumurta' },
    { icindekiler_adi: 'jambon' },
  ])
  await knex('miktar').insert([
    { tarif_id: 1, adim_id: 2, icindekiler_id: 1, miktar: 2 },
    { tarif_id: 1, adim_id: 2, icindekiler_id: 2, miktar: 250 },
  ])
}
