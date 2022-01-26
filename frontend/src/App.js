import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { poolService } from './services/poolService';

import { PoolList } from './CMPS/PoolList';

function App() {
  const [pools, setPools] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(async () => {
    let pools = await poolService.query(page);
    console.log('get pools', pools)
    setPools(pools)
  }, [!pools]);

  useEffect(async () => {
    let pools = await poolService.query(page);
    setPools(pools)
  }, [page]);

  const handleNextPage = () => {
    if (page < 2) setPage(page + 1)
  }
  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1)
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div class="actions">
        <button onClick={handlePrevPage}>Prev Oage</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
      {pools && <PoolList pools={pools} />}
    </div>
  );
}

export default App;
