import { Route, Routes, useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AdminPage } from './pages/AdminPage.page';
import { MainPage } from './pages/MainPage.page';
import { NotFound } from './pages/NotFound.page';
import { ShopItems } from './pages/ShopItems.page';
import { UpsertItem } from './pages/UpsertItem.page';

function App() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path='/'
          element={<MainPage />}>
          <Route index element={<ShopItems />} />
          <Route path='/profile' element={<NotFound />} />
          <Route path='office' element={<AdminPage />} />
          <Route path='create-item' element={<UpsertItem navigate={navigate} />} />
          <Route path='items/:id' element={<UpsertItem edit navigate={navigate} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
