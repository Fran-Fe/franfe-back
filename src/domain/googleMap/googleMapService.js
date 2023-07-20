import { findByUuid, GoogleMap } from './googleMap.js';
import BooleanDeleted, from '../../util/booleanDeleted.js';
import BooleanValidate from '../../util/booleanValidate.js';

export function abc(request) {
  findByUuid(request.uuid, BooleanDeleted.FALSE, BooleanValidate.TRUE);
  return "";

}

export function b() {

}