import axios from "axios";
import { Button } from "solid-bootstrap";
import { Component, createSignal } from "solid-js";

import styles from "./App.module.css";

interface Activity {
  accessibility: number;
  activity: string;
  key: string;
  link: string;
  participants: number;
  price: number;
  type: string;
}

const [activity, setActivity] = createSignal<Activity>();

const GenerateActivity = async () => {
  const response = await axios.get<Activity>(
    "https://www.boredapi.com/api/activity"
  );
  setActivity(response.data);
  console.log(activity());
};

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>Rine Rine 💖 Minh Minh</p>
        <Button
          style={{
            background: "#73a1a5",
            "border-color": "#73a1a5",
          }}
          onClick={GenerateActivity}
        >
          Generate Activity
        </Button>
        <h3>{activity()?.activity}</h3>
      </header>
    </div>
  );
};

export default App;
