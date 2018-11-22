import { DateToStringMapper } from '../mapper/custom'
import { Config } from './config.type'

/**
 * to update the config you must do it before importing any model, basically before anything else.
 * the config cannot be changed afterwards
 */
export const dynamoEasyConfig: Config = {
  dateMapper: DateToStringMapper,
  debug: true,
}
