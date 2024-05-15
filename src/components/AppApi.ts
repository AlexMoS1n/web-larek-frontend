import { Api, ApiListResponse } from "./base/Api";
import { IAppApi, IProduct, ICustomer, IOrderSuccessfulData } from "../types"

class AppApi extends Api implements IAppApi {
  protected cdn: string; 

  constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProducts(): Promise<IProduct[]> {
    return this.get('/product').then((list: ApiListResponse<IProduct>) => {
      return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
    })
  }

  getProductById(id: string): Promise<IProduct> {
    return this.get('/product/' + id).then((product: IProduct) => {
      return {...product, image: this.cdn + product.image}
    })
  }

  postOrder(order: ICustomer): Promise<IOrderSuccessfulData> {
    return this.post('/order', order).then((success: IOrderSuccessfulData) => {
      return success
    })
  }
}  

