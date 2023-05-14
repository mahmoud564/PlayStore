/* eslint-disable no-dupe-keys */

import './App.css';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import { Provider } from 'react-redux'
import { store } from './Resux/Store';
import ProviderReact from './components/ProviderReact/ProviderReact';
import GameDetails from './components/GameDetails/GameDetails';
import All from './components/All/All';
import Categories from './components/Categories/Categories';
import SortBy from './components/SortBy/SortBy';
import Platforms from './components/Platforms/Platforms';





function App() {  
let router=createBrowserRouter([{path:"",element:<Layout/>,children:[
  {index:true , element:<ProviderReact><Home/></ProviderReact> },
  {path:"" , element: <ProviderReact><Home/></ProviderReact>},
  {path:"" , element: <ProviderReact><Home/></ProviderReact>},
  { path:"register" , element: <Register/>},
  { path:"SortBy/:id" , element:<ProviderReact> <SortBy/></ProviderReact>},
  { path:"Platforms/:id" , element:<ProviderReact> <Platforms/></ProviderReact>},
  { path:"Categories/:id" , element:<ProviderReact> <Categories/></ProviderReact>},
  { path:"login" , element: <Login/>},
  { path:"All" , element:<ProviderReact> <All/></ProviderReact>},
  { path:"GameDetails/:id" , element:<ProviderReact> <GameDetails/></ProviderReact>},
  { path:"*",element:<ProviderReact><NotFound/></ProviderReact>}
  
]}])
  return (
   <>
   <Provider store={store}>
    <RouterProvider router={router} />
 </Provider>
   </>
  );
}

export default App;
