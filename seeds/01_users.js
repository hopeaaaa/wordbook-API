/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      user_name: "John Smith",
      email: "123@gmail.com",
    },
    {
      id: 2,
      user_name: "Manhattan",
      email: "456@gmail.com",
    },
    {
      id: 3,
      user_name: "Jersey",
      email: "789@gmail.com",
    },
  ]);
}
