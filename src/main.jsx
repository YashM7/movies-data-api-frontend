import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"

if(process.env.NODE_ENV != 'production'){
  console.log("NOT IN PRODUCTION");
  console.log(process.env.NODE_ENV);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
