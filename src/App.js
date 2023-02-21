import { Route, Routes } from 'react-router-dom';
import './App.css';

import { MainPage } from './pages/MainPage.page';
import { NotFound } from './pages/NotFound.page';
import { ShopItems } from './pages/ShopItems.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'
          element={<MainPage />}>
          <Route index element={<ShopItems />} />
          <Route path='/profile' element={<NotFound />}/>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
