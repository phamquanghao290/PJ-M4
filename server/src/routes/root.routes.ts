import { Express } from 'express';
 import { userRouter } from './users.routes';
import { productRoutes } from './product.routes';
import { categoryRoutes } from './category.routes';
import { orderRoutes } from './order.routes';
import { orderDetailRoutes } from './orderDetail.routes';
import { cartRoutes } from './cart.routes';

 export const rootRouter = (app:Express)=>{
    userRouter(app),
    productRoutes(app)
    categoryRoutes(app)
    cartRoutes(app)
    orderRoutes(app)
    orderDetailRoutes(app)
}