import { read } from './httpService';

export async function getCities() {
  const cities = await read('/cities');
  cities.sort((a, b) => a.name.localeCompare(b.name));
  return cities;
}

export async function getCandidates() {
  const candidates = await read('/candidates');
  return candidates;
}

export async function getElectionData(cityId) {
  const [rawElectionData, cityData, candidates] = await Promise.all([
    read(`/election?cityId=${cityId}`),
    read(`/cities?id=${cityId}`),
    getCandidates(),
  ]);

  const { name: cityName, votingPopulation, absence, presence } = cityData[0];

  const optimizedElectionData = rawElectionData
    .map(electionItem => {
      const { id, candidateId, votes } = electionItem;

      const { name: candidateName, username } = candidates.find(
        candidate => candidate.id === candidateId
      );

      return { id, candidateName, username, votes };
    })
    .sort((a, b) => b.votes - a.votes);

  const electionData = {
    city: { cityName, votingPopulation, absence, presence },
    electionResults: optimizedElectionData,
  };
  return electionData;
}
