import "../css/table.css";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Mood",
      data: labels.map(() => 400),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function WeekTable({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  useEffect(() => {
    // deal with async behavior
    if (!moods) return;
    const moodsCopy = moods.slice();

    // DONE: funcionality to show last 7 entries / days
    // reverse moods, then get entry 0 to seven
    const lastSevenMoods = moodsCopy.reverse().slice(0, 7);
    const pointStyles = lastSevenMoods.map((mood) => {
      if (mood === "happy") return "😊";
      if (mood === "in love") return "😍";
      if (mood === "sleepy") return "😴";
      if (mood === "sad") return "😔";
      if (mood === "angry") return "😡";
    });

    // draw chart
    setChart({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Mood",
          data: lastSevenMoods,
          pointStyle: pointStyles,
          pointRadius: 10,
          borderColor: "#D9FDED",
          backgroundColor: "#D9FDED33",
          fill: true,
        },
      ],
    });

    setIsLoading(false);
  }, [moods]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div>
          <h2>current week</h2>
          <p></p>
        </div>
        <Line options={options} data={data} />
      </div>
    );
  }
}

export default WeekTable;
