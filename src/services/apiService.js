import { read } from './httpService';

async function getCities() {
  const cities = await read('/cities');
  cities.sort((a, b) => a.name.localeCompare(b.name));
  return cities;
}

async function getCandidates() {
  const candidates = await read('/candidates');
  return candidates;
}

async function getElectionData(cityId) {
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

      const votesPercentage = ((votes / presence) * 100).toFixed(2);

      return { id, candidateName, username, votes, votesPercentage };
    })
    .sort((a, b) => b.votes - a.votes)
    .map((item, index) => {
      return { ...item, isElected: index === 0 };
    });

  const electionData = {
    city: { cityName, votingPopulation, absence, presence },
    electionResults: optimizedElectionData,
  };
  return electionData;
}

export { getCities, getElectionData };
