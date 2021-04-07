import { OrderModule } from "../modules/order/order.module";
import { PagesModule } from "../modules/pages/pages.module";
import { PaymentModule } from "../modules/payment/payment.module";
import { SharedModule } from "../modules/shared/shared.module";

export const AppModules = [
  OrderModule,
  PaymentModule,
  SharedModule,
  PagesModule
]
