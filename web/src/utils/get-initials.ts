export function getInitials(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .splice(0.2)
    .join("");

  return initials;
}