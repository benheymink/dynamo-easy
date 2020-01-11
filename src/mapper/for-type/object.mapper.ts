/**
 * @module mapper
 */
import { hasType, PropertyMetadata } from '../../decorator/metadata/property-metadata.model'
import { fromDb, toDb } from '../mapper'
import { Attributes, MapAttribute } from '../type/attribute.type'
import { MapperForType } from './base.mapper'

function objectFromDb(val: MapAttribute, propertyMetadata?: PropertyMetadata<any, MapAttribute>): any {
  // todo: shouldn't we check for existence off 'M' here? (and throw if undefined)
  if (hasType(propertyMetadata)) {
    return fromDb(val.M, propertyMetadata.typeInfo.type)
  } else {
    return fromDb(val.M)
  }
}

function objectToDb(modelValue: any, propertyMetadata?: PropertyMetadata<any, MapAttribute>): MapAttribute {
  let value: Attributes
  if (hasType(propertyMetadata)) {
    value = toDb(modelValue, propertyMetadata.typeInfo.type)
  } else {
    value = toDb(modelValue)
  }

  return { M: value }
}

export const ObjectMapper: MapperForType<any, MapAttribute> = {
  fromDb: objectFromDb,
  toDb: objectToDb,
}
