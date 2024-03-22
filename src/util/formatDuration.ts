export function formatDuration(duration: number): string {
  const days = Math.floor(duration / (24 * 60 * 60));
  const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = duration % 60;

  const parts = [];
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }
  if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  }

  if (parts.length === 0) {
    return "0 seconds";
  }

  return parts.join(" and ");
}
