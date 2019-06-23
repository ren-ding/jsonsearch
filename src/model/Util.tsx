import * as _ from 'lodash';

export const indexedByField = (content:Array<Object>, uidFieldName: string) => 
                                    _.chain(content)
                                     .groupBy(uidFieldName)
                                     .value();