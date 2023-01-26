import Header from './components/Header';
import Main from './components/Main';
import ElectionsPage from './pages/ElectionsPage';

export default function App() {
  return (
    <>
      <Header>React Elections</Header>
      <Main>
        <ElectionsPage></ElectionsPage>
      </Main>
    </>
  );
}
