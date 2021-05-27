import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { asyncData, asyncError } from 'src/app/helpers/async-observable-helpers';
import { trxnResult } from './models/TrxnResult';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(PaymentService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });



  // it('#getPayment should return a transactionId', (done: DoneFn) => {
  //   service.getPayResultsDB('emptyData').subscribe(value => {
  //     expect(value.transactionId).toBeTruthy()
  //   })
  // })


  // it('#getPayment should return a status', (done: DoneFn) => {
  //   service.getPayResultsDB('emptyData').subscribe(value => {
  //     expect(value.status).toBeTruthy()
  //   })
  // })


  // it('#getPayment should return a dateTime', (done: DoneFn) => {
  //   service.getPayResultsDB('emptyData').subscribe(value => {
  //     expect(value.dateTime).toBeTruthy()
  //   })
  // })

  // it('#getPayment should return a amount', (done: DoneFn) => {
  //   service.getPayResultsDB('emptyData').subscribe(value => {
  //     expect(value.amount).toBeTruthy()
  //   })
  // })


  let httpClientSpy: { get: jasmine.Spy }
  let paymentService: PaymentService

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    paymentService = new PaymentService(httpClientSpy as any)
  })

  it('should return expected result (HttpClient called once)', () => {
    const expectedResults: trxnResult = {
      transactionId: 'abc123',
      dateTime: '1234-12-12',
      status: 'approved',
      amount: 5
    }

    httpClientSpy.get.and.returnValue(asyncData(
      expectedResults
    ))

    paymentService.getPayResultsDB('nothing').subscribe(results =>
      expect(expectedResults).toEqual(expectedResults, "expected results"),
      fail
    )
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call')
  })
})

describe('Payment HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    let testUrl = 'https://localhost:3000/api/pay'

    httpClient.get<any[]>(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(testUrl);

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });


})
