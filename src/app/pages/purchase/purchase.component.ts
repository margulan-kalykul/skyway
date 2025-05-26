import {Component, OnInit, signal, ViewChild} from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Purchase, PurchaseRequest, TourEvent} from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
    injectStripe,
    StripeCardComponent,
    StripeElementsDirective,
    StripePaymentElementComponent,
    StripeServiceInterface
} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions, StripePaymentElementOptions} from '@stripe/stripe-js';
import {PaymentService} from '../../services/payment.service';
import {UserService} from '../../services/user.service';
import {ToursService} from '../../services/tours.service';
import {dateTimestampProvider} from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
    selector: 'app-purchase',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, CurrencyPipe, MatButton, StripeElementsDirective, StripePaymentElementComponent],
    templateUrl: './purchase.component.html',
    styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
    imageNames = {
        clock: "assets/images/clock.svg",
        people: "assets/images/users.svg",
        globe: "assets/images/language.svg",
        loading: "assets/images/loading-icon.gif",
        check: "assets/images/check.svg",
    };
    cardForm: FormGroup;
    tourEventId: string;
    tourEvent: TourEvent | null = null;
    tourDate: Date | null = null;
    requestStage = 0;
    // Stripe variables
    @ViewChild(StripeCardComponent) card!: StripeCardComponent;
    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0',
                },
            },
        },
    };
    elementsOptions: StripeElementsOptions = {
        locale: 'en',
        appearance: {
            theme: 'stripe',
            labels: 'floating',
            variables: {
                colorPrimary: '#673ab7',
            },
        },
    };
    paymentElementForm!: FormGroup;
    // Stripe confirm payment variables
    @ViewChild(StripePaymentElementComponent)
    paymentElement!: StripePaymentElementComponent;
    paymentElementOptions: StripePaymentElementOptions = {
        layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: true,
        }
    };
    stripe!: StripeServiceInterface;
    paying = signal(false);

    constructor(
        private fb: FormBuilder,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService,
        private paymentService: PaymentService,
        private toursService: ToursService,
        private userService: UserService,
    ) {
        this.cardForm = this.fb.group({
            name: [''],
            cardNumber: [''],
            validDate: [''],
            CVV: [''],
        });

        this.tourEventId = this.activatedRouter.snapshot.paramMap.get('tourId')!;

        this.stripe = injectStripe(this.paymentService.STRIPE_PUBLIC_KEY);
        this.paymentElementForm = this.fb.group({
            name: ['Angular v10',
                // [Validators.required]
            ],
            amount: [1000,
                // [Validators.required, Validators.pattern(/d+/)]
            ],
        });
    }

    // get amount() {
    //     const amount = this.paymentElementForm.get('amount')?.value;
    //     if (!amount || amount < 0)
    //         return 0;
    //     return amount;
    // }

    ngOnInit(): void {
        this.toursService.getTourEventById(this.tourEventId)
            .subscribe((tourEvent) => {
                this.tourEvent = tourEvent;
                this.tourDate = new Date(this.tourEvent.date);
            })
        this.paymentService
            .createPaymentIntent(
                this.paymentElementForm.get('amount')!.value,
                'USD',
            )
            .subscribe(pi => {
                this.elementsOptions.clientSecret = pi.clientSecret as string;
            })
        // .pipe(
        //     switchMap((pi) =>
        //         this.stripeService.confirmCardPayment(pi.clientSecret, {
        //             payment_method: {
        //                 card: this.card.element,
        //                 billing_details: {
        //                     name: this.paymentElementForm.get('name')!.value,
        //                 },
        //             },
        //         })
        //     )
        // )
        // .subscribe((result) => {
        //     if (result.error) {
        //         // Show error to your customer (e.g., insufficient funds)
        //         console.error(result.error);
        //         console.log(result.error.message);
        //     } else {
        //         console.log(result.paymentIntent);
        //         // The payment has been processed!
        //         switch (result.paymentIntent.status) {
        //             case 'succeeded':
        //                 // Show a success message to your customer
        //                 alert('Success! Payment received.');
        //                 break;
        //             case 'processing':
        //                 alert('Processing...');
        //                 break;
        //             case 'requires_payment_method':
        //                 alert('Payment failed. Please try another payment method.');
        //                 // Redirect your user back to your payment page to attempt collecting
        //                 // payment again
        //                 break;
        //             default:
        //                 alert('Something went wrong.');
        //                 break;
        //         }
        //     }
        // });
    }

    // clear() {
    //     this.paymentElementForm.patchValue({
    //         name: '',
    //         amount: '',
    //     });
    // }

    pay() {
        if (this.paying() || this.paymentElementForm.invalid) return;
        this.paying.set(true);

        // const { name, amount } = this.paymentElementForm.getRawValue();

        this.stripe
            .confirmPayment({
                elements: this.paymentElement.elements,
                confirmParams: {
                    // payment_method_data: {
                    //     billing_details: {
                    //         name: name as string,
                    //         address: {
                    //             line1: address as string,
                    //             postal_code: zipcode as string,
                    //             city: city as string
                    //         }
                    //     }
                    // },
                    return_url: 'http://localhost:4200/home',  // TODO: redirect to purchased tours
                },
                // redirect: 'if_required'  // Makes it so no redirect happen (I think)
            })
            .subscribe(result => {
                this.paying.set(false);
                console.log('Result', result);
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.error(result.error);
                    alert({ success: false, error: result.error.message });
                }
            });
    }

  submit() {
    let cardData = {
      name: this.cardForm.value.name,
      cardNumber: this.cardForm.value.cardNumber,
      validDate: this.cardForm.value.validDate,
      CVV: this.cardForm.value.CVV
    };
    console.log(cardData);
    this.http.post<Purchase>(
      'http://localhost:8000/v1/tours/payment/',
      {tour_event_id: this.tourEventId} as PurchaseRequest,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()!}`
        })
      }
    );

    this.requestStage = 1;
    setTimeout(() => {
      this.requestStage = 2;
    }, 2000);
  }

  goToHome() {
    console.log('Home');
    this.router.navigate(['home']);
  }
}
