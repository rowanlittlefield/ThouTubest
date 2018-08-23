export const resourceAge = createdAtString => {
    const dateString = createdAtString.slice(0,10);
    const [year, month, day] = dateString.split('-');
    const today = new Date();
    const [currentYear, currentMonth, currentDay] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
    const age = (((currentYear - year) * 365) +
     ((currentMonth - month) * 30) + (currentDay - day));
    return (age > 0 ? age : 0);
}
