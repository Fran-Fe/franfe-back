import { findByUuid, GoogleMap } from './googleMap.js';
import BooleanDeleted from '../../utils/booleanDeleted.js';
import BooleanValidate from '../../utils/booleanValidate.js';

export function abc(request) {
  findByUuid(request.uuid, BooleanDeleted.FALSE, BooleanValidate.TRUE);
  return "";

}

export function b() {

}