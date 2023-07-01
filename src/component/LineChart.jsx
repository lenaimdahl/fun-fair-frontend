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

const cpHappy = new Image(20, 20);
cpHappy.src = imgHappy;

const cpInLove = new Image(20, 20);
cpInLove.src = imgInLove;

const cpSleepy = new Image(20, 20);
cpSleepy.src = imgSleepy;

const cpSad = new Image(20, 20);
cpSad.src = imgSad;

const cpAngry = new Image(20, 20);
cpAngry.src = imgAngry;

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
    },
    title: {
      display: true,
      text: "Your mood of the week!",
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

  function generateDays() {
    const today = new Date();
    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return [
      ...weekDay.slice(today.getDay() + 1),
      ...weekDay.slice(0, today.getDay() + 1),
    ];
  }

  useEffect(() => {
    if (!moods) return;
    const moodsCopy = moods.slice();
    const lastSevenMoods = moodsCopy.reverse().slice(0, 7);
    const moodsAsNumbers = lastSevenMoods.map((mood) => {
      return convertEmoji(mood.title);
    });

    const pointStyles = moodsAsNumbers.map((mood) => {
      if (mood === 5) {
        return cpHappy;
      }
      if (mood === 4) {
        return cpInLove;
      }
      if (mood === 3) {
        return cpSleepy;
      }
      if (mood === 2) {
        return cpSad;
      }
      if (mood === 1) {
        return cpAngry;
      }
      return null;
    });

    setChart({
      labels: generateDays().reverse(),
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
        <div className="chart-container">
          <Line options={options} data={chart} />
        </div>
      </div>
    );
  }
}

export default WeekTable;
