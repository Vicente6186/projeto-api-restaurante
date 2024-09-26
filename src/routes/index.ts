import { Router } from "express"
import ProductsController from "../controllers/products-controller"
import TablesController from "../controllers/tables-controller"
import OrdersController from "../controllers/orders-controller"
import TableSessionsController from "../controllers/table_sessions"

function execAsync(request, response, next, callback) {
   callback(request, response, next).catch(next)
}

const productRoutes = Router()
productRoutes.get('/', (...params)=> execAsync(...params, ProductsController.index))
productRoutes.get('/:id', (...params)=> execAsync(...params, ProductsController.show))
productRoutes.post('/', (...params)=> execAsync(...params, ProductsController.store))
productRoutes.put('/:id', (...params)=> execAsync(...params, ProductsController.update))
productRoutes.delete('/:id', (...params)=> execAsync(...params, ProductsController.destroy))

const tableRoutes = Router()
tableRoutes.get('/', (...params)=> execAsync(...params, TablesController.index))
tableRoutes.post('/', (...params)=> execAsync(...params, TablesController.store))
tableRoutes.put('/:id', (...params)=> execAsync(...params, TablesController.update))
tableRoutes.delete('/:id', (...params)=> execAsync(...params, TablesController.destroy))

const orderRoutes = Router()
orderRoutes.get('/', (...params)=> execAsync(...params, OrdersController.index))
orderRoutes.post('/', (...params)=> execAsync(...params, OrdersController.store))
orderRoutes.put('/:id', (...params)=> execAsync(...params, OrdersController.update))
orderRoutes.delete('/:id', (...params)=> execAsync(...params, OrdersController.destroy))

const tableSessionsRoutes = Router()
tableSessionsRoutes.get('/', (...params)=> execAsync(...params, TableSessionsController.index))
tableSessionsRoutes.post('/', (...params)=> execAsync(...params, TableSessionsController.store))
tableSessionsRoutes.put('/:id', (...params)=> execAsync(...params, TableSessionsController.update))
tableSessionsRoutes.delete('/:id', (...params)=> execAsync(...params, TableSessionsController.destroy))

const routes = Router()
routes.use('/products', productRoutes)
routes.use('/tables', tableRoutes)
routes.use('/orders', orderRoutes)
routes.use('/table-sessions', tableSessionsRoutes)

export default routes