import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
