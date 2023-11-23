import { Container } from "./styles";
import { observer } from "mobx-react";
import { ObjectsT, store } from "../../store";
import { FaHeart, FaBomb } from "react-icons/fa";
import { FaAppleWhole } from "react-icons/fa6";
import { IoMdBasket } from "react-icons/io";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const GamePlay = observer(() => {

  const navigate = useNavigate();
  const gameRef = useRef<{ endGameImmeditely: () => void }>();

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft": {
          console.log("Moving Left");
          store.movePlayer("left");
          break;
        }
        case "ArrowRight": {
          console.log("Moving Right");
          store.movePlayer("right");
          break;
        }
      }
    });

    gameRef.current = store.start(() => {
      navigate('/scoreboard');
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLifes = () => {
    const lifes = [];

    for (let i = 0; i < store.lifes; i++) {
      lifes.push(<FaHeart key={i} />);
    }

    return lifes;
  };

  const renderItemByType = (type: ObjectsT) => {
    switch (type) {
      case "e": {
        return <></>;
      }

      case "o": {
        return <FaAppleWhole size={20} />;
      }

      case "x": {
        return <FaBomb size={20} />;
      }
    }
  };

  const goMenu = () => {
    const confirmed = window.confirm('Are you sure?, Game progress will be losed');

    if(confirmed) {
      gameRef.current?.endGameImmeditely();
      navigate('/')
    }
  }

  return (
    <Container>
      <div className="gameplay">
        <div className="board">
          {store.board.map((line, index) => (
            <div className="line" key={index}>
              {line.map((e, itemIndex) => (
                <div
                  className="item"
                  style={{
                    width: (store.display[1] - 100) / (store.scale * 3),
                    height: (store.display[1] - 100) / (store.scale * 3),
                  }}
                  key={index + itemIndex}
                >
                  {renderItemByType(e)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="player">
          {store.playerLine.map((c, index) => {
            if (c === "p") {
              return (
                <div className="item" key={index}>
                  <IoMdBasket size={40} />
                </div>
              );
            }
            return <div key={index} className="item"></div>;
          })}
        </div>
        <div className="black-box"></div>
      </div>
      <div className="action-bar">
        <div className="main-info">
          <div className="lifes">{renderLifes()}</div>
          <div className="score">{store.score}</div>
        </div>
        <div className="info">
          <div>Try your look!</div>
          
          <div>Noth: Move with arrow keys</div>
        </div>
        <div className="actions">
          <button onClick={() => goMenu()}>Go Menu</button>
        </div>
      </div>
    </Container>
  );
});
