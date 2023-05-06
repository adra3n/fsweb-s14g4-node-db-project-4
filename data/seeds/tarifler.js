/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tarifler').del()
  await knex('tarifler').insert([
    {
      tarif_adi: 'Spagetti Bolonez',
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
      adim_talimati: '1 yemek kaşığı zeytinyağı ekleyin',
    },
  ])
  await knex('icindekiler').insert([{ icindekiler_adi: 'zeytinyağı' }])
  await knex('icindekiler_adimlar').insert([
    { icindekiler_id: 1, adim_id: 1, miktar: 0.014 },
    { icindekiler_id: 1, adim_id: 2, miktar: 0.025 },
  ])
}
