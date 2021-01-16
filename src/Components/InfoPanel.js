import React from 'react';
import GlobalStats from './GlobalStats.js'
import GraphSearch from './GraphSearch.js'
import SearchBar from './SearchBar.js'

export default function FullWidthGrid({currentScreen, userId}) {
  if(currentScreen === 0)
    return <GlobalStats/>
  else  if(currentScreen === 1)
    return <SearchBar userId={userId}/>
  else 
    return <GraphSearch/>
  
}
