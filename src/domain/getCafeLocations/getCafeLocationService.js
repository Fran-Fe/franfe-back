import { findByLatAndLng } from './getCafeLocation.js';

export function getCafeLocationService(userLng, userLat, distance) {
  return findByLatAndLng(userLng, userLat, distance);
}
