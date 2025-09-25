import moment from 'moment'



export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}




export const addThousandSeparator = (num) => {
  if (num == null || isNaN(Number(num))) return "";
  return new Intl.NumberFormat("en-IN").format(num);
};




export const prepareExpenseLineChartData = (data) => {
  const safeData = Array.isArray(data) ? data : [];

  const grouped = {};
  safeData.forEach((item) => {
    const dateKey = item.date ? new Date(item.date).toISOString().split("T")[0] : "Unknown";

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        day: dateKey,     
        amount: 0,
        categories: [],
      };
    }

    grouped[dateKey].amount += Number(item.amount) || 0;
    grouped[dateKey].categories.push({
      category: item.category || "Unknown",
      amount: Number(item.amount) || 0,
    });
  });


  const chartData = Object.values(grouped)
    .sort((a, b) => new Date(a.day) - new Date(b.day))
    .map((item) => ({
      ...item,
      day: new Date(item.day).toLocaleDateString("en-US", { day: "numeric", month: "short" }),
    }));

  return chartData;
};




export const prepareExpenseChartData = (data = []) => {
  const grouped = {};

  data.forEach((item) => {
    const day = new Date(item.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

    if (!grouped[day]) {
      grouped[day] = {
        day,
        amount: 0,
        categories: [], 
      };
    }

    grouped[day].amount += Number(item.amount) || 0;
    grouped[day].categories.push({
      category: item.category || "Unknown",
      amount: Number(item.amount) || 0,
    });
  });

  const chartData = Object.values(grouped);
  return chartData.reverse();
};


export const prepareIncomeBarChartData = (transactions = []) => {
  const grouped = {};

  transactions.forEach(item => {
    const day = moment(item.date).format("DD MMM"); 
    if (!grouped[day]) {
      grouped[day] = { day, amount: 0, categories: [] };
    }
    grouped[day].amount += item.amount;
    grouped[day].categories.push({ category: item.source, amount: item.amount });
  });

  const chartData = Object.values(grouped); 
  return chartData.reverse();
};









