import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppLayout from './layouts/AppLayout';

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>

          <Route index element={<HomePage />} />

        </Route>
        
        
      )
    );
  return (
    <RouterProvider router={router} />
    
  )
}

export default App