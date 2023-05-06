/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable('tarifler', (table) => {
      table.increments('tarif_id'),
        table.string('tarif_adi').notNullable().unique()
      table.timestamp('kayit_tarihi').defaultTo(knex.fn.now())
    })
    .createTable('adimlar', (table) => {
      table.increments('adim_id')
      table.integer('adim_sirasi').unsigned().notNullable()
      table.string('adim_talimati').notNullable()
      table
        .integer('tarif_id')
        .notNullable()
        .unsigned()
        .references('tarif_id')
        .inTable('tarifler')
    })
    .createTable('icindekiler', (table) => {
      table.increments('icindekiler_id')
      table.string('icindekiler_adi').notNullable()
    })
    .createTable('icindekiler_adimlar', (table) => {
      table.increments('icindekiler_adimlar_id')
      table.float('miktar').notNullable()
      table.integer('adim_id').references('adim_id').inTable('adimlar')
      table
        .integer('icindekiler_id')
        .references('icindekiler_id')
        .inTable('icindekiler')
    })
  return all
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('icindekiler_adimlar')
    .dropTableIfExists('icindekiler')
    .dropTableIfExists('adimlar')
    .dropTableIfExists('tarifler')
}
