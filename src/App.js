import React, {useState} from 'react';
import NavBar from './Components/NavBar.js'
import InfoPanel from './Components/InfoPanel.js'
import FootNav from './Components/FootNav.js'

const userId = Math.floor(Math.random() * 1000000);
function App() {
  const screenConfig = useState(0)
  return (
    <div className="App">
      <NavBar userId={userId}/>
      <InfoPanel currentScreen={screenConfig[0]} userId={userId}/>
      <FootNav screenConfig={screenConfig} id="navTabs"/>
    </div>
    )
}
export default App;
