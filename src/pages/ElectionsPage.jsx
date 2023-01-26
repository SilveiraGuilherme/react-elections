import { useEffect, useState } from 'react';

import Loading from '../components/Loading';
import Button from '../components/Button';

import { getCities, getElectionData } from '../services/apiService';

export default function ElectionsPage() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingElections, setLoadingElections] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentElections, setCurrentElections] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    (async function getBackEndCities() {
      setLoadingPage(true);
      const backendCities = await getCities();
      setCities(backendCities);
      setLoadingPage(false);
    })();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }
    (async function getBackEndElections() {
      setLoadingElections(true);
      const backendElections = await getElectionData(selectedCity);
      setCurrentElections(backendElections);
      setLoadingElections(false);
    })();
  }, [selectedCity]);

  function handleSelectedCity(cityId) {
    setSelectedCity(cityId);
  }

  if (loadingPage) {
    return <Loading />;
  }

  let electionsJsx = <Loading />;

  if (!loadingElections) {
    console.log(currentElections);
    const { city, electionResults } = currentElections;
    const { cityName, votingPopulation, absence, presence } = city;

    electionsJsx = (
      <section className="border-2 my-6 p-4 flex flex-col items-center gap-2 ">
        <h2 className="font-semibold text-lg">Elections in {cityName}</h2>
        <ul className="flex flex-wrap justify-center items-center gap-2 text-xs">
          <li>
            Number of voters: <strong>{votingPopulation}</strong>
          </li>
          <li>
            Abstentions: <strong>{absence}</strong>
          </li>
          <li>
            Attendance: <strong>{presence}</strong>
          </li>
        </ul>
        <h3>{electionResults.length} candidates</h3>
        <ul>
          {electionResults.map(
            ({
              id,
              candidateName,
              username,
              votes,
              votesPercentage,
              isElected,
            }) => {
              return <li key={id}>{candidateName}</li>;
            }
          )}
        </ul>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-1">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {cities.map(({ id, name }) => {
            const isCitySelected = id === selectedCity;

            return (
              <li key={id}>
                <Button
                  colorClass={isCitySelected ? 'bg-blue-200' : 'bg-gray-200'}
                  onButtonClick={() => handleSelectedCity(id)}
                >
                  {name}
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
      {electionsJsx}
    </>
  );
}
