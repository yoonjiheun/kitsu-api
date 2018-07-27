export default class KitsuQueryBuilder {
  private queryString = 'https://kitsu.io/api/edge';
  private extraParams: boolean = false;
  static COMMA: string = ',';
  static DASH:string = '-';
  static WHITESPACE: string = " ";
  static SPACE:string = '%20';

  constructor(category: string) {
    this.queryString += `/${category.replace(KitsuQueryBuilder.WHITESPACE, KitsuQueryBuilder.SPACE)}?`;
  }

   addQueryParams(params: string): void {
    if(this.extraParams) this.queryString += `&${params}`;
    else {
      this.queryString += `${params}`;
      this.extraParams = true;
    }
  }

  getQueryString(): string {
    return this.queryString;
  }
}
