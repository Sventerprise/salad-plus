import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { asyncData, asyncError } from 'src/app/helpers/async-observable-helpers';
import { OrderStaticData, testData } from 'src/app/modules/order/models/OrderStaticData';

import { OrderStaticDataService } from '../OrderStaticData.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderStaticDataService', () => {
  let sDService: OrderStaticDataService;
  let httpClientSpy: { get: jasmine.Spy }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sDService = new OrderStaticDataService(httpClientSpy as any);
  });

  it('should return a data object (HttpClient called once)', (done: DoneFn) => {
    let testData = { name: 'test data' }
    const expectedData: any = testData

    httpClientSpy.get.and.returnValue(asyncData(expectedData));

    sDService.getOrderStaticData().subscribe(
      data => {
        expect(data).toEqual(expectedData, 'expected data');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // *** the below doesn't work, I think because it tries to call a
  // the normal backend rather than the mock.


  // it('should return an error when the server returns 404',
  //   (done: DoneFn) => {
  //     const errorResponse = new HttpErrorResponse({
  //       error: 'test 404 Error',
  //       status: 404,
  //       statusText: 'Not Found'
  //     });

  //     httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  //     sDService.getOrderStaticData().subscribe(
  //       (result) => done.fail('expected an error, not data'),
  //       error => {
  //         expect(error.message).toContain('test 404 Error');
  //         done();
  //       }
  //     );
  //   })
});

describe('OrderStaticData HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Test will now hit the testing backend instead of the 'normal' backend

    it('can test HttpClient.get', () => {
      const testData = { name: 'Test Data' };
      const testUrl = 'https://localhost:3000/orderStaticData/'

      // Make an HTTP GET request
      httpClient.get<any>(testUrl).subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );
    })

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/data');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests
    httpTestingController.verify();

    it('can test for 404 error', () => {
      const emsg = 'deliberate 404 error';
      let testUrl = 'https://localhost:3000/orderStaticData/'

      httpClient.get<any[]>(testUrl).subscribe(data =>
        fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

      const requ = httpTestingController.expectOne(testUrl);

      // respond w/ mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' })
    })

  })
})
