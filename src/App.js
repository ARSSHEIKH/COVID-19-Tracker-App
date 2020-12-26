import React, {useState} from 'react';
import NavBar from './Components/NavBar.js'
import InfoPanel from './Components/InfoPanel.js'
import FootNav from './Components/FootNav.js'

function App() {
  const screenConfig = useState(0)
  return (
    <div className="App">
      <NavBar/>
      <InfoPanel currentScreen={screenConfig[0]}/>
      <FootNav screenConfig={screenConfig} id="navTabs"/>
    </div>
    )
}
export default App;
