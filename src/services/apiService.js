import { create, edit, exclude, read } from './httpService';

export async function getAllCities() {
  const allCities = await read('/cities').map(city => [city.name]);
  console.log(allCities);
  return allCities;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(id, title, description) {
  const newFlashCard = await create('/flashcards', {
    id,
    title,
    description,
  });
  return newFlashCard;
}

export async function apiUpdateFlashCard(cardId, title, description) {
  const updatedFlashCard = await edit(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return updatedFlashCard;
}
