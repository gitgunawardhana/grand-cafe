const formatTime = (time: any): any => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  return <>{formattedTime}</>;
};

export { formatTime };
