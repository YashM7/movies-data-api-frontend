import React from "react"
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import WatchList from "./components/WatchList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="watchlist" element={<WatchList />} />
      </Route>
    </Routes>
  )
}
export default App
