import express from 'express'
import {Router} from 'express'
import TestControllers from "./controllers/TestControllers.js"
import StoreControllers from "./controllers/StoreControllers.js"
import ProductControllers from "./controllers/ProductControllers.js"
import InterestController from './controllers/InterestController.js'
import FavoriteController from './controllers/FavoriteController.js'
import AuthController from './controllers/AuthController.js'


const router = Router()

    //Test controllers
        router.get('/2', TestControllers.firstTestcontroller);

    //Store routes
        router.get('/stores', StoreControllers.getStores);
        router.get('/stores/:id', StoreControllers.getStore);
        router.get('/stores/products/:id', StoreControllers.getStore);
        router.post('/stores', StoreControllers.createStore);
        router.put('/stores/:id', StoreControllers.updateStore);
        router.delete('/stores/:id', StoreControllers.deleteStore);

    //Product routes
        router.get('/products', ProductControllers.getProducts);
        router.get('/products/:id', ProductControllers.getProduct);
        router.post('/products', ProductControllers.createProduct);
        router.put('/products/:id', ProductControllers.updateProduct);
        router.delete('/products/:id', ProductControllers.deleteProduct);

    //Stores of interest routes
        router.get('/interest/user/:id/', InterestController.getInterestbyUser);
        router.get('/interest/store/:id/', InterestController.getInterestbyStore);
        router.post('/interest/:id_usuario/:id_tienda', InterestController.addInterest);
        router.delete('/interest/:id_usuario/:id_tienda', InterestController.deleteInterest);

    //Favorite products routes
        router.get('/favorite/user/:id/', FavoriteController.getFavoritesbyUser);
        router.get('/favorite/store/:id/', FavoriteController.getFavoritesbyProduct);
        router.post('/favorite/:id_usuario/:id_producto', FavoriteController.addFavorite);
        router.delete('/favorite/:id_usuario/:id_producto', FavoriteController.deleteFavorite);
    
    //AuthController
        router.post('/register', AuthController.register);
        router.post('/login', AuthController.login);

export default router