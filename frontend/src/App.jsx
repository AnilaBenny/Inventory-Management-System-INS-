import { Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import InventoryDashboard from './components/Dashboard';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
    <InventoryProvider>
      <div>
        <Routes>
          <Route path="/" element={<InventoryDashboard/>} />
          <Route path="/item/:id" element={<ItemDetails/>} />
        </Routes>
      </div>
    </InventoryProvider>
  );
}

export default App;