
//import { Outlet } from 'react-router-dom';

import Game from './components/Game.jsx';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import WinView from './views/winView/WinView';
function App() {
  const componente = 1;
  let componenteRenderizado;
  switch (componente) {
    case 1:
      componenteRenderizado = <Game />
      break;
    case 2:
      componenteRenderizado = <WinView />
      break;
  }
  return (
    <>
      <Header />
      {componenteRenderizado}
      <Footer />
    </>
  )
}

export default App;
