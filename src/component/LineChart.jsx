import "../css/App.css";
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

import imgHappy from "../assets/moods/happy.png";
import imgInLove from "../assets/moods/inLove.png";
import imgSleepy from "../assets/moods/sleepy.png";
import imgSad from "../assets/moods/sad.png";
import imgAngry from "../assets/moods/angry.png";

const cpHappy = new Image();
cpHappy.src = imgHappy;
cpHappy.width = 20;
cpHappy.height = 20;

const cpInLove = new Image();
cpInLove.src = imgInLove;
cpInLove.width = 20;
cpInLove.height = 20;

const cpSleepy = new Image();
cpSleepy.src = imgSleepy;
cpSleepy.width = 20;
cpSleepy.height = 20;

const cpSad = new Image();
cpSad.src = imgSad;
cpSad.width = 20;
cpSad.height = 20;

const cpAngry = new Image();
cpAngry.src = imgAngry;
cpAngry.width = 20;
cpAngry.height = 20;

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
      display: false,
      title: {
        display: false,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          weight: "normal",
        },
        beginAtZero: true,
        stepSize: 1,
        padding: 5,
      },
      suggestedMin: 1,
      suggestedMax: 5,
    },
    x: {
      ticks: {
        font: {
          weight: "bold",
        },
        color: "#F5F2FF",
        beginAtZero: true,
      },
      reverse: true,
    },
  },
};

function convertEmoji(type) {
  switch (type) {
    case "😊":
      return 5;
    case "😍":
      return 4;
    case "😴":
      return 3;
    case "😔":
      return 2;
    case "😡":
      return 1;
    default:
      return "";
  }
}

function WeekTable({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  useEffect(() => {
    if (!moods) return;
    const moodsCopy = moods.slice();
    const lastSevenMoods = moodsCopy.reverse().slice(0, 7);
    const moodsAsNumbers = lastSevenMoods.map((mood) => {
      return convertEmoji(mood.title);
    });

    const pointStyles = moodsAsNumbers.map((mood) => {
      if (mood === 5) return cpHappy;
      if (mood === 4) return cpInLove;
      if (mood === 3) return cpSleepy;
      if (mood === 2) return cpSad;
      if (mood === 1) return cpAngry;
    });
    console.log("last seven", lastSevenMoods);
    console.log("point]", pointStyles);

    setChart({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Mood",
          data: moodsAsNumbers,
          pointRadius: 10,
          pointStyle: pointStyles,
          borderColor: "#D9FDED",
          backgroundColor: "#D9FDED33",
          fill: true,
        },
      ],
    });

    setIsLoading(false);
  }, [moods]);

  if (isLoading) {
    // return <Spinner />;
  } else {
    return (
      <div className="chart-flex">
        <div className="chart-heading">
          <h2>current week</h2>
          <p></p>
        </div>
        <div className="chart-container">
          <Line options={options} data={chart} />
        </div>
      </div>
    );
  }
}

export default WeekTable;
