import Header from '../components/Header';
import Main from '../components/Main';
import { getElectionData } from '../services/apiService';

export default function ElectionsPage() {
  getElectionData('d2dab6a2-3029-45a5-89f2-fcbaee387758');

  return (
    <div>
      <Header>React Elections</Header>

      <Main>Content</Main>
    </div>
  );
}
