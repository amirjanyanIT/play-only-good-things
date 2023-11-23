import { observer } from "mobx-react";
import { store } from "../../store";

import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
export const Main = observer(() => {
  const navigate = useNavigate();

  return (
    <Container className="action-view">
      <div className="title">{store.gameTitle}</div>
      <div className="welcome">
        <div>
          Hello <u>{store.player}</u>
        </div>
        <div>(You can change you'r name in Settings)</div>
      </div>
      <div className="actions">
        <button onClick={() => navigate("/play")}>Play</button>
        <button onClick={() => navigate('/scoreboard')}>ScoreBoard</button>
        <button onClick={() => navigate("/settings")}>Settings</button>
      </div>
    </Container>
  );
});
