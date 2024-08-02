export function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Adjust hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes} ${ampm}`;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the date-time string

  // Extract day, month, and year components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); // Get full month name
  const year = date.getFullYear();

  // Format the date in the desired format
  return `${day} ${month} ${year}`;
};
