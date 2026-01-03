export function calculatePrice(
  vehicleType: "BIKE" | "MINI_TRUCK" | "TRUCK",
  distanceKm: number
): number {
  const baseRates = {
    BIKE: 10,
    MINI_TRUCK: 25,
    TRUCK: 40,
  };

  return Math.round(baseRates[vehicleType] * distanceKm);
}
