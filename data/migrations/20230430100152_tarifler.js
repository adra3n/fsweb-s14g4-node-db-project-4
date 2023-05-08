/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('tarifler', (table) => {
      table.increments()
      table.string('tarif_adi').unique().notNullable()
      table.timestamp('kayit_tarihi').notNullable()
    })
    .createTable('adimlar', (table) => {
      table.increments()
      table.integer('adim_sirasi').unsigned().notNullable()
      table.string('adim_talimati').notNullable()
      table
        .integer('tarif_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tarifler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('icindekiler', (table) => {
      table.increments()
      table.string('icindekiler_adi')
    })
    .createTable('miktar', (table) => {
      table
        .integer('tarif_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tarifler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('adim_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('adimlar')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('icindekiler_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('icindekiler')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('miktar')
      table.primary(['tarif_id', 'adim_id', 'icindekiler_id'])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('miktar')
    .dropTableIfExists('icindekiler')
    .dropTableIfExists('adimlar')
    .dropTableIfExists('tarifler')
}
