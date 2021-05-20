import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { trxnResult } from './models/TrxnResult';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('#getPayment should return a transactionId', (done: DoneFn) => {
    service.getPayResultsDB('emptyData').subscribe(value => {
      expect(value.transactionId).toBeTruthy()
    })
  })


  it('#getPayment should return a status', (done: DoneFn) => {
    service.getPayResultsDB('emptyData').subscribe(value => {
      expect(value.status).toBeTruthy()
    })
  })


  it('#getPayment should return a dateTime', (done: DoneFn) => {
    service.getPayResultsDB('emptyData').subscribe(value => {
      expect(value.dateTime).toBeTruthy()
    })
  })

  it('#getPayment should return a amount', (done: DoneFn) => {
    service.getPayResultsDB('emptyData').subscribe(value => {
      expect(value.amount).toBeTruthy()
    })
  })

})

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

  // httpClientSpy.get.and.returnValue(    // asyncData(
  //   expectedResults
  //   ))

  paymentService.getPayResultsDB('nothing').subscribe(results =>
    expect(expectedResults).toEqual(expectedResults, "expected results"),
    fail
  )
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call')
})

it('should return an error when the server returns 404', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    // status: '404', statusText: 'Not found'
  })
  httpClientSpy.get.and.returnValue(errorResponse)

  paymentService.getPayResultsDB('nothing').subscribe(result =>
    fail('expected an error, not a response'),
    error => expect(error.message).toContain('test 404 error')
  )
})

