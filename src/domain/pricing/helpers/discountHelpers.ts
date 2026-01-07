export const isBlackFriday = (date: Date) => {
  const d = new Date(date);
  const month = d.getMonth(); // 10 = November
  if (month !== 10) return false;

  const day = d.getDate();
  const weekday = d.getDay(); // 5 = Friday

  return weekday === 5 && day >= 23 && day <= 29;
};

export const isPolishHoliday = (date: Date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const holidays = [
    '1-1',
    '1-6',
    '5-3',
    '5-1',
    '11-1',
    '11-11',
    '12-25',
    '12-26',
  ];

  return holidays.includes(`${month}-${day}`);
};