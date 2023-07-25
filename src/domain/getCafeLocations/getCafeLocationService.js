import { findByPosition } from './getCafeLocation.js';

export function getCafeLocationService(userLng, userLat, distance) {
  return findByPosition(userLng, userLat, distance);
}
