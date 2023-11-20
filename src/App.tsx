import { observer } from "mobx-react";

import { store } from "./store";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    
  }, []);

  return (
    <div className="App" style={
      {
        width: store.display[0],
        height: store.display[1],
      }
    }>
      {store.board.map((c, cI) => (
        <div className="line" key={cI}>
          {c.map((i, iI) => (
            <div key={iI} className={`item item--${i}`}>
              {i}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default observer(App);
