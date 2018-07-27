import * as request from 'request-promise';
import KitsuQueryBuilder from './kitsu-query-builder';
import KitsuApiModel from './kitsu-api-model';


export default class KitsuApi {
  private KitsuQueryBuilder: KitsuQueryBuilder;
  private headers = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  };

  // Creates a kitsu query builder with what you want to query.
  // Ex anime, database-lib, etc. Types can be found on kitsu documentation.
  query(keyword: string): KitsuApi {
    this.KitsuQueryBuilder = new KitsuQueryBuilder(keyword);
    return this;
  }

  // Below adds filters to query params.

  // Page offset.
  paginationOffset(offset: number): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`page[offset]=${offset}`);
    return this;
  }

  // Page limit
  paginationLimit(limit: number): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`page[limit]=${limit}`);
    return this;
  }

  // Filters based on key and values.
  filter(filterKey: string, filterValue: string): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`filter[${filterKey}]=${filterValue}`);
    return this;
  }

  // Sorts based on certain keys. Need to figure out which keys are avaliable from discord or documentation.
  sort(attributes: string[]): KitsuApi {
    attributes = attributes.map( a => {
      return KitsuQueryBuilder.DASH + a;
    });
    this.KitsuQueryBuilder.addQueryParams(`sort=${attributes.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

  // Can filter based on relationships.
  includes(relationship: string[]): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`includes=${relationship.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

  // Filters based on certain attributes in object.
  sparse(fieldKey: string, fieldValues: string[]): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`fields[${fieldKey}]=${fieldValues.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

  // Executes the api call. Must be called or nothing will happen.
  async execute(): Promise<KitsuApiModel> {
    return new Promise<KitsuApiModel>((resolve, reject) => {
      const options = {
        uri: this.KitsuQueryBuilder.getQueryString(),
        headers: this.headers
      };
      request(options)
        .then((resp: KitsuApiModel) => {
          return resolve(resp);
        })
        .catch(e => {
          return reject(e);
        })
    })
  }
}
