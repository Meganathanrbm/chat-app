export function formatTime(dateTimeString: string): string {
  const date: Date = new Date(dateTimeString);
  const hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");
  const ampm: "AM"| "PM" = hours >= 12 ? "PM" : "AM";

  // Adjust hours to 12-hour format
  const formattedHours: number = hours % 12 || 12;

  return `${formattedHours}:${minutes} ${ampm}`;
}

export const formatDate = (dateString: string): string => {
  const date: Date = new Date(dateString); // Parse the date-time string

  // Extract day, month, and year components
  const day: number = date.getDate();
  const month: string = date.toLocaleString("en-US", { month: "long" }); // Get full month name
  const year: number = date.getFullYear();

  // Format the date in the desired format
  return `${day} ${month} ${year}`;
};
