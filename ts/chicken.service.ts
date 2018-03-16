import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class ElasticService {

  constructor(private http: HttpClient) { }

  search(){
    return this.http.get<any>("http://localhost:9200/social/personMeta/_search?size=100&q=aalst");
  }
}
