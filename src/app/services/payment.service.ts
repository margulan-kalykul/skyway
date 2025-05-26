import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CustomPaymentIntent} from '../models/interfaces';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    BASE_URL = 'http://localhost:8000/v1/tours';
    STRIPE_PUBLIC_KEY = 'pk_test_51RJTVQIvMkUocj5Eecr83VrhiauEWEzkk2NuWUUpMdcuHPOPrgXghkvGIJLIZjLuDDlWkdJ9LtAVNrqyOgVlYlUf00FHIQN4Mz';
    httpOptions = {};

    constructor(private http: HttpClient, private authService: AuthService) {
        if (this.authService.isLoggedIn()) {
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authService.getToken()!}`
                }),
                withCredentials: true,
            };
        }
    }

    createPaymentIntent(amount: number, currency: string='USD'): Observable<CustomPaymentIntent> {
        return this.http.post<CustomPaymentIntent>(
            `${this.BASE_URL}/payment/create-payment-intent/`,
            { amount: amount, currency: currency },
            this.httpOptions,
        );
    }
}
