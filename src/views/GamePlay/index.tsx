import { Container } from "./styles";
import { observer } from "mobx-react";
import { ObjectsT, store } from "../../store";
import { FaHeart, FaBomb } from "react-icons/fa";
import { FaAppleWhole } from "react-icons/fa6";
import { IoMdBasket } from "react-icons/io";
import { useEffect } from "react";


export const GamePlay = observer(() => {

  useEffect(() => {
    window.addEventListener('keyup', (e) => {
      if(e.key === "ArrowLeft") {
        store.movePlayer('left')
      }
      
      if(e.key === "ArrowRight") {
        store.movePlayer('right')
      }
    })
  }, []);

  const renderLifes = () => {
    const lifes = [];

    for (let i = 0; i < store.lifes; i++) {
      lifes.push(<FaHeart key={i} />);
    }

    return lifes;
  };

  const renderItemByType = (type: ObjectsT) => {
    switch(type) {
        case "e": {
            return <></>
        }

        case 'o': {
            return <FaAppleWhole size={20} />
        }

        case 'x': {
            return <FaBomb size={20} />
        }
    }
  };

  return (
    <Container>
      <div className="action-bar">
        <div className="lifes">{renderLifes()}</div>
        <div className="score">{store.score}</div>
      </div>
      <div className="board">
        {store.board.map((line, index) => (
          <div className="line" key={index}>
            {line.map((e, itemIndex) => (
              <div
                className="item"
                style={{ height: (store.display[1] - 100) / (store.scale * 3) }}
                key={index + itemIndex}
              >
                {renderItemByType(e)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="player">
        {store.playerLine.map((c,index) => {
          if(c === "p") {
            return <div className="item"  key={index}><IoMdBasket size={40} /></div>
          }
          return <div key={index} className="item"></div>
        })}
      </div>
    </Container>
  );
  
});
