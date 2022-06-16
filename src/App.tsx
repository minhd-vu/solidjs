import axios from "axios";
import { Badge, Button, Card } from "solid-bootstrap";
import { Component, createSignal, For } from "solid-js";

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

const oddBadge = {
  color: "black",
  background: "#e9c9c9",
  "background-color": "#e9c9c9",
};

const evenBadge = {
  color: "black",
  background: "#d1a9b8",
  "background-color": "#d1a9b8",
};

const CreateRating = (rating: number, scalar=10) => {
  rating *= scalar;
  return rating + "/" + scalar
}

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
        <br />
        {activity() && (
          <Card style={{ width: "30rem", color: "black" }}>
            <Card.Body>
              <Card.Title>{activity()?.activity}</Card.Title>
              <Card.Text>
                <For
                  each={[
                    activity()?.type,
                    CreateRating(activity()?.accessibility!) + " accessibility",
                    activity()?.participants +
                      " participant" +
                      (activity()?.participants! > 1 ? "s" : ""),
                    CreateRating(activity()?.price!) + " price",
                  ]}
                  fallback={<div>Loading...</div>}
                >
                  {(item, index) => (
                    <Badge
                      class="mx-1"
                      bg=""
                      style={index() % 2 ? oddBadge : evenBadge}
                    >
                      {item}
                    </Badge>
                  )}
                </For>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </header>
    </div>
  );
};

export default App;
