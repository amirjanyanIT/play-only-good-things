import { Route, BrowserRouter, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { GamePlay, Main, Scoreboard, Settings } from "./views";
import { Container } from "./App.styles";
import { store } from "./store";

function App() {
  return (
    <Container resolution={store.display}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/settings" Component={Settings} />
          <Route path="/play" Component={GamePlay} />
          <Route path="/scoreboard" Component={Scoreboard} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default observer(App);
