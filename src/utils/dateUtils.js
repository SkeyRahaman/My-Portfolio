export const getMonthsSince = (startDateStr) => {
  const start = new Date(startDateStr);
  const now = new Date();
  
  if (isNaN(start.getTime())) return 0;
  
  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  return (years * 12) + months;
};

export const formatExperience = (totalMonths) => {
  const roundedMonths = Math.floor(totalMonths);
  const years = Math.floor(roundedMonths / 12);
  const months = roundedMonths % 12;
  
  if (years > 0 && months > 0) return `${years} yrs ${months} mos`;
  if (years > 0) return `${years} yrs`;
  return `${months} mos`;
};

export const formatExperienceShort = (totalMonths) => {
  const roundedMonths = Math.floor(totalMonths);
  const years = Math.floor(roundedMonths / 12);
  const months = roundedMonths % 12;
  
  if (years > 0 && months > 0) return `${years}y ${months}m`;
  if (years > 0) return `${years}y`;
  return `${months}m`;
};
