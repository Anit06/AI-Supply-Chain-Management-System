# Shopkeeper Ordering System

## Backend
- Added cart and order data models in backend-node/src/models/Cart.js and backend-node/src/models/Order.js.
- Added cart APIs in backend-node/src/controllers/cartController.js and backend-node/src/routes/cartRoutes.js.
- Added order history APIs in backend-node/src/controllers/orderController.js and backend-node/src/routes/orderRoutes.js.
- Order placement reduces inventory stock and clears the active cart.

## Frontend
- Reworked the shopkeeper product catalog in frontend-react/src/components/shopkeeper/Products/ProductCatalog.jsx.
- Added reusable shopkeeper components for cards, quantity selection, warehouse selection, cart, and checkout.
- Added shopkeeper order history and place-order flows.

## Notes
- The existing architecture and folder structure were preserved.
- Cart and order access are scoped to the logged-in user.
