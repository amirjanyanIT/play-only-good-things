import { observer } from "mobx-react";

import { store } from "./store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    store.initialize();
    window.addEventListener("keyup", (e) => {
      if(e.key === 'e') {
        store.moveBoard();
      }
    });
  }, []);

  return (
    <div className="App">
      {store.board.map((c, cI) => (
        <div className="line" key={cI}>
          {c.map((i, iI) => (
            <div key={iI} className="item">
              {i}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default observer(App);
