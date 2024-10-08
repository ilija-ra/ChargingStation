import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { lastValueFrom, Observable } from "rxjs";
import { ChargerGetAllDto, ChargerGetByIdDto, ChargerSaveDto, ChargerSearchDto } from "./chargers.model";

@Injectable()
export class ChargersService {
    constructor(private http: HttpClient) { }

    save(model: ChargerSaveDto): Observable<any> {
        return this.http.post(`${environment.apiUrl}/chargers/save`, model);
    }

    getById(id?: string): Observable<ChargerGetByIdDto> {
        return this.http.get(`${environment.apiUrl}/chargers/getbyid/${id}`);
    }

    getAll(): Observable<ChargerGetAllDto> {
        return this.http.get(`${environment.apiUrl}/chargers/getall`);
    }

    search(query?: string): Observable<ChargerSearchDto> {
        return this.http.get(`${environment.apiUrl}/chargers/search/${query}`);
    }

    async delete(id?: string): Promise<any> {
        return await lastValueFrom<void>(this.http.delete<void>(`${environment.apiUrl}/chargers/delete/${id}`));
    }
}