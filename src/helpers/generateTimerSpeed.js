export default (score) => {
  const speed = 10;
  if (score < 10) return 50;
  if (score >= 10 && score < 20) return 40;
  if (score >= 20 && score < 30) return 30;
  if (score >= 30 && score < 40) return 20;
  return speed;
};

