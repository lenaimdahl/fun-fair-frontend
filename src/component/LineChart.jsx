import "../css/App.css";
import { useEffect, useState } from "react";
import moment from "moment";

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
  spanGaps: true,
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      color: "white",
      display: true,
      text: "Your mood from last week!",
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

const convertEmojiToImage = (title) => {
  switch (title) {
    case "😊": {
      return cpHappy;
    }
    case "😍": {
      return cpInLove;
    }
    case "😴": {
      return cpSleepy;
    }
    case "😔": {
      return cpSad;
    }
    case "😡": {
      return cpAngry;
    }
    default: {
      return null;
    }
  }
};

const convertEmojiToNumber = (title) => {
  switch (title) {
    case "😊": {
      return 5;
    }
    case "😍": {
      return 4;
    }
    case "😴": {
      return 3;
    }
    case "😔": {
      return 2;
    }
    case "😡": {
      return 1;
    }
    default: {
      return null;
    }
  }
};

function WeekTable({ moods }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState();

  function generateWeekDays() {
    const today = new Date();
    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return [
      ...weekDay.slice(today.getDay() + 1),
      ...weekDay.slice(0, today.getDay() + 1),
    ];
  }

  function generateLast14Days() {
    const today = new Date();
    return [...new Array(13)].map((_, index) =>
      moment(today).subtract(index, "day").format("YYYY-MM-DD")
    );
  }

  useEffect(() => {
    if (!moods) return;
    const moodsCopy = moods.slice();

    const moodDataWithGaps = [];

    for (const date of generateLast14Days()) {
      const moodEntry = moodsCopy.find((mood) => mood.date === date);
      if (moodEntry) {
        moodDataWithGaps.push(moodEntry);
      } else {
        moodDataWithGaps.push(null);
      }
    }

    const lastSevenMoods = moodDataWithGaps.slice(0, 7);
    const weekBeforeMoods = moodDataWithGaps.slice(7, 14);
    console.log({
      generateLast14Days: generateLast14Days(),
      lastSevenMoods,
      weekBeforeMoods,
    });

    setChart({
      labels: generateWeekDays().reverse(),
      datasets: [
        {
          label: "Mood last 7 days",
          data: lastSevenMoods.map((mood) =>
            mood ? convertEmojiToNumber(mood.title) : null
          ),
          pointRadius: 10,
          pointStyle: lastSevenMoods.map((mood) =>
            mood ? convertEmojiToImage(mood.title) : null
          ),
          borderColor: "#C82567",
          backgroundColor: "#D9FDED33",
        },
        {
          label: "week before",
          data: weekBeforeMoods.map((mood) =>
            mood ? convertEmojiToNumber(mood.title) : null
          ),
          pointRadius: 10,
          pointStyle: weekBeforeMoods.map((mood) =>
            mood ? convertEmojiToImage(mood.title) : null
          ),
          borderColor: "#D9FDED",
          backgroundColor: "#D9FDED33",
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
