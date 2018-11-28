import { Key } from 'aws-sdk/clients/dynamodb'
import { Observable, of } from 'rxjs'
import { concatMap, map } from 'rxjs/operators'
import { QueryRequest, Request, ScanRequest, ScanResponse } from '../dynamo/request'

/**
 * When we cant load all the items of a table with one request, we will fetch as long as there is more data
 * available. This can be used with scan and query requests.
 */

export function fetchAll<T>(request: ScanRequest<T> | QueryRequest<T>, startKey?: Key): Observable<T[]> {
  request.limit(Request.INFINITE_LIMIT)
  if (startKey) {
    request.exclusiveStartKey(startKey)
  }
  return request.execFullResponse().pipe(
    // tap(response => console.debug('response', response)),
    concatMap<ScanResponse<T>, T[]>(response => {
      if (response.LastEvaluatedKey) {
        return fetchAll(request, response.LastEvaluatedKey).pipe(
          map(innerResponse => response.Items!.concat(innerResponse)),
        )
      } else {
        return of(response.Items)
      }
    }),
  )
}
