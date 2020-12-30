import React from 'react';
import GlobalStats from './GlobalStats.js'
import GraphStats from './GraphStats.js'
import SearchBar from './SearchBar.js'

export default function FullWidthGrid({currentScreen}) {
  if(currentScreen === 0)
    return <GlobalStats/>
  else  if(currentScreen === 1)
    return <SearchBar/>
  else 
    return <GraphStats/>
  
}
