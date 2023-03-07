exports.seed = async function (knex) {

  await knex("roles")
    .insert([
      { name: "admin" },
      { name: "user" },
    ])
  await knex("users")
    .insert({
      username: 'admin',
      password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe', // 1234
      role: 1,
    })
}
