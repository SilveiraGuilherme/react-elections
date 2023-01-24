import Header from '../components/Header';
import Main from '../components/Main';
import { getAllCities } from '../services/apiService';

export default function ElectionsPage() {
  getAllCities();

  return (
    <div>
      <Header>React Elections</Header>

      <Main>Content</Main>
    </div>
  );
}
