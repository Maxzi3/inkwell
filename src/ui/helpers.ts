import { format, formatDistanceToNow } from "date-fns";

export function slugify(str:string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(dateString:string, dateFormat = "MMMM d, yyyy") {
  return format(new Date(dateString), dateFormat);
}

export function formatTimeAgo(dateString:string) {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}