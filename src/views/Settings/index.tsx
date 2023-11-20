import { observer } from "mobx-react";
import { Container } from "./styles";
import { store } from "../../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Settings = observer(() => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<{
    player: string;
    display: [number, number];
    itemsAtLine: number;
    speed: number;
  }>({
    player: store.player,
    display: store.display,
    itemsAtLine: store.itemsAtLine,
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
                  player: target.value ? target.value : settings.player,
                })
              }
            />
          </div>
        </li>
        <li>
          <span>display:</span>
          <div>
            <input
              value={settings.display[0]}
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  display: [
                    target.value ? Number(target.value) : store.display[0],
                    settings.display[1],
                  ],
                })
              }
            />
            <span>x</span>
            <input
              value={settings.display[1]}
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  display: [
                    settings.display[0],
                    target.value ? Number(target.value) : store.display[1],
                  ],
                })
              }
            />
          </div>
        </li>
        <li>
          <span>Items at line:</span>
          <div>
            <input
              value={settings.itemsAtLine}
              type="number"
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  itemsAtLine: target.value
                    ? Number(target.value)
                    : store.itemsAtLine,
                })
              }
            />
          </div>
        </li>
        <li>
          <span>Start Speed:</span>
          <div>
            <input
              value={settings.speed}
              onChange={({ target }) =>
                setSettings({
                  ...settings,
                  speed: target.value ? Number(target.value) : store.speed,
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
