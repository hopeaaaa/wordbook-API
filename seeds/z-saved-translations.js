/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("saved-translations").del();
  await knex("saved-translations").insert([
    {
      user_id: 1,
      id: 1,
      en_word: "apple",
      fr_word: "pomme",
      audio_url: "/audio/pronunciation_pomme.mp3",
    },
    {
      user_id: 1,
      id: 2,
      en_word: "banana",
      fr_word: "banane",
      audio_url: "/audio/pronunciation_banane.mp3",
    },
    {
      user_id: 1,
      id: 3,
      en_word: "strawberry",
      fr_word: "fraise",
      audio_url: "/audio/pronunciation_fraise.mp3",
    },
    {
      user_id: 1,
      id: 4,
      en_word: "lemon",
      fr_word: "citron",
      audio_url: "/audio/pronunciation_citron.mp3",
    },
    {
      user_id: 1,
      id: 5,
      en_word: "grape",
      fr_word: "raisin",
      audio_url: "/audio/pronunciation_raisin.mp3",
    },
  ]);
}
