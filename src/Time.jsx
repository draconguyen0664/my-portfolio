import { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const vnTime = now.toLocaleTimeString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(vnTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h2>Việt Nam</h2>
        <p>(GMT+7) {time}</p>
      </div>
    </>
  );
};

export default Time;
