import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { getCities, getElectionData } from '../services/apiService';

export default function ElectionsPage() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingElections, setLoadingElections] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentElections, setCurrentElections] = useState([]);
  const [selectedCity, setSelectedCity] = useState(
    'a27c86ce-d99a-4f4f-8cbb-37302754734e'
  );

  useEffect(() => {
    (async function getBackEndCities() {
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

  let electionsJsx = '';

  if (loadingElections) {
    electionsJsx = <Loading />;
  }

  if (!loadingElections && selectedCity) {
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
        <ul className="flex flex-wrap justify-center items-center gap-3 my-4">
          {electionResults.map(
            ({
              id,
              candidateName,
              username,
              votes,
              votesPercentage,
              isElected,
            }) => {
              const electColor = isElected
                ? 'text-green-600'
                : 'text-yellow-600';

              return (
                <li
                  className="w-52 h-48 flex flex-col items-center justify-around border-2 shadow-lg p-3"
                  key={id}
                >
                  <div className="flex justify-between items-center gap-4">
                    <img
                      className="rounded-full w-12 h-12"
                      src={`/img/${username}.png`}
                      alt={candidateName}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <span className={`text-lg font-semibold ${electColor}`}>
                        {votesPercentage.toFixed(2)}%
                      </span>
                      <span className="text-sm">{votes} votes</span>
                    </div>
                  </div>
                  <div className="font-semibold">{candidateName}</div>
                  <div className={`font-semibold ${electColor}`}>
                    {isElected ? 'Elected' : 'Not Elected'}
                  </div>
                </li>
              );
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
