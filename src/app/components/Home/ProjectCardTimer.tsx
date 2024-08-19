import * as React from "react";

type Props = {
  launchDate: Date;
};

const ProjectCardTimer = ({ launchDate }: Props) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: "0",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const calculateTimeLeft = React.useCallback(() => {
    const difference = +launchDate - +new Date();
    let timeLeft = {
      days: "0",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString(),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    }

    return { timeLeft, finished: difference <= 0 };
  }, [launchDate]);

  React.useEffect(() => {
    const id = setInterval(() => {
      const result = calculateTimeLeft();
      if (result.finished) {
        clearInterval(id);
        return;
      }
      setTimeLeft(result.timeLeft);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [launchDate]);

  return (
    <div className="grid grid-cols-4 gap-1">
      <div className="flex flex-col bg-[#0F0D7785] justify-evenly items-center rounded-md">
        <p className="text-white font-bold text-basev xl:text-base">
          {timeLeft.days}
        </p>
        <p className="text-white text-xsv xl:text-xs">Days</p>
      </div>
      <div className="flex flex-col bg-[#0F0D7785] justify-evenly items-center rounded-md">
        <p className="text-white font-bold text-basev xl:text-base">
          {timeLeft.hours}
        </p>
        <p className="text-white text-xsv xl:text-xs">Hours</p>
      </div>
      <div className="flex flex-col bg-[#0F0D7785] justify-evenly items-center rounded-md">
        <p className="text-white font-bold text-basev xl:text-base">
          {timeLeft.minutes}
        </p>
        <p className="text-white text-xsv xl:text-xs">Minutes</p>
      </div>
      <div className="flex flex-col bg-[#0F0D7785] justify-evenly items-center rounded-md">
        <p className="text-white font-bold text-basev xl:text-base">
          {timeLeft.seconds}
        </p>
        <p className="text-white text-xsv xl:text-xs">Seconds</p>
      </div>
    </div>
  );
};

export default ProjectCardTimer;
