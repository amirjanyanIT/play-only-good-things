import { observer } from "mobx-react";
import { Container } from "./styles";
import { store } from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Settings = observer(() => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<{
    player?: string;
    speed?: number;
  }>({
    player: store.player,
    speed: store.speed,
  });

  const onApply = () => {
    const confirmed = window.confirm(
      "Are you sure?,do you want apply new settings?"
    );

    if (confirmed) {
      store.applySettings(settings);
      navigate("/");
    }
  };

  const onCancel = () => {
    const confirmed = window.confirm(
      "Changed settings will be losed, are you sure?"
    );

    if (confirmed) {
      navigate("/");
    }
  };

  return (
    <Container className="action-view">
      <div className="title">Settings</div>
      <ul className="settings-list">
        <li>
          <span>Player Name:</span>
          <div>
            <input
              value={settings.player}
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  player: target.value,
                })
              }
            />
          </div>
        </li>
        <li>
          <span>Start Speed:</span>
          <div>
            <input
              type="number"
              value={settings.speed}
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  speed: Number(target.value),
                })
              }
            />{" "}
            <span>:ms</span>
          </div>
        </li>
      </ul>
      <div className="actions">
        <button onClick={() => onApply()}>Apply</button>
        <button onClick={() => onCancel()}>Go Back</button>
      </div>
    </Container>
  );
});
