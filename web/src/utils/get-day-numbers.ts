export function getDayNumbers(dayNames: string[]): number[] {
  const daysOfWeek: { [key: string]: number } = {
    Domingo: 1,
    Segunda: 2,
    Terça: 3,
    Quarta: 4,
    Quinta: 5,
    Sexta: 6,
    Sábado: 7,
  };

  const allDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const providedDaySet = new Set(dayNames);

  const missingDays = allDays
    .filter((day) => !providedDaySet.has(day))
    .map((day) => daysOfWeek[day] - 1);

  return missingDays;
}
