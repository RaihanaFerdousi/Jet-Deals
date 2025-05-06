import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Pages/Main/Main';
import Home from './Pages/Home/Home';
import SavedDeals from './Component\'s/SavedDeals/SavedDeals';
import { SavedDealsProvider } from './SavedDealsContext';
import SearchResults from './Component\'s/Search/SearchResults';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/searchResults',
        element: <SearchResults/>
      },
      {
        path: '/savedDeals',
        element: <SavedDeals/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SavedDealsProvider>
      <RouterProvider router={router} />
   </SavedDealsProvider>
  </StrictMode>,
)
