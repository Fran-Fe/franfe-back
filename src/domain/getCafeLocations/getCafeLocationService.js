import { findByPosition } from './getCafeLocation.js';

export function getCafeLocationService(userLat, userLng, distance) {
  return findByPosition(userLat, userLng, distance);
}

