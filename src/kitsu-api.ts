import * as request from 'request-promise';
import KitsuQueryBuilder from './kitsu-query-builder';
import KitsuApiModel from './kitsu-api-model';


export default class KitsuApi {
  private KitsuQueryBuilder: KitsuQueryBuilder;
  private headers = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  };

  query(keyword: string): KitsuApi {
    this.KitsuQueryBuilder = new KitsuQueryBuilder(keyword);
    return this;
  }

  paginationOffset(offset: number): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`page[offset]=${offset}`);
    return this;
  }

  paginationLimit(limit: number): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`page[limit]=${limit}`);
    return this;
  }

  filter(filterKey: string, filterValue: string): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`filter[${filterKey}]=${filterValue}`);
    return this;
  }

  sort(attributes: string[]): KitsuApi {
    attributes = attributes.map( a => {
      return KitsuQueryBuilder.DASH + a;
    });
    this.KitsuQueryBuilder.addQueryParams(`sort=${attributes.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

  includes(relationship: string[]): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`includes=${relationship.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

  sparse(fieldKey: string, fieldValues: string[]): KitsuApi {
    this.KitsuQueryBuilder.addQueryParams(`fields[${fieldKey}]=${fieldValues.join(KitsuQueryBuilder.COMMA)}`);
    return this;
  }

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
