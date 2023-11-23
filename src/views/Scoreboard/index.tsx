import { observer } from "mobx-react";
import { Container } from "./styles";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";

export const Scoreboard = observer(() => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="title">Scoreboard</div>
      <div className="board">
        {store.scoreboard.map((score, index) => (
          <div className="line" key={index}>
            <div className="name">{score.name}</div>
            <div className="score">{score.score}</div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => navigate("/")}>Go Menu</button>
      </div>
    </Container>
  );
});
