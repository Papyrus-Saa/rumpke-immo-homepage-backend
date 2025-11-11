/**
 * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine
 * @param lat1 Latitud del punto 1
 * @param lon1 Longitud del punto 1
 * @param lat2 Latitud del punto 2
 * @param lon2 Longitud del punto 2
 * @returns Distancia en kilómetros
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Redondear a 2 decimales
}

/**
 * Convierte grados a radianes
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Verifica si un punto está dentro de un rectángulo (bounds del mapa)
 * @param lat Latitud del punto
 * @param lng Longitud del punto
 * @param bounds Límites del rectángulo {north, south, east, west}
 */
export function isPointInBounds(
  lat: number,
  lng: number,
  bounds: { north: number; south: number; east: number; west: number },
): boolean {
  return (
    lat <= bounds.north &&
    lat >= bounds.south &&
    lng <= bounds.east &&
    lng >= bounds.west
  );
}

/**
 * Calcula bounds (rectángulo) alrededor de un punto con un radio dado
 * @param lat Latitud central
 * @param lng Longitud central
 * @param radiusKm Radio en kilómetros
 * @returns Bounds {north, south, east, west}
 */
export function getBoundsFromRadius(
  lat: number,
  lng: number,
  radiusKm: number,
): { north: number; south: number; east: number; west: number } {
  const latDelta = radiusKm / 111.32; // 1 grado de latitud ≈ 111.32 km
  const lngDelta = radiusKm / (111.32 * Math.cos(toRadians(lat))); // Ajustado por latitud

  return {
    north: lat + latDelta,
    south: lat - latDelta,
    east: lng + lngDelta,
    west: lng - lngDelta,
  };
}
