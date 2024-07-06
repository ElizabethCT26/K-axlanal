import express from 'express'
import {Router} from 'express'
import TestControllers from "./controllers/TestControllers.js"
import StoreControllers from "./controllers/StoreControllers.js"
import ProductControllers from "./controllers/ProductControllers.js"


const router = Router()

    //Test controllers
        router.get('/2', TestControllers.firstTestcontroller);

    //Store routes
        router.get('/stores', StoreControllers.getStores);
        router.get('/stores/:id', StoreControllers.getStore);
        router.post('/stores', StoreControllers.createStore);
        router.put('/stores/:id', StoreControllers.updateStore);
        router.delete('/stores/:id', StoreControllers.deleteStore);
        //Stores of interest routes
            router.post('/stores/interest/:id_usuario/:id_tienda', StoreControllers.addInterest);
            router.delete('/stores/interest/:id_usuario/:id_tienda', StoreControllers.deleteInterest);

    //Product routes
        router.get('/products', ProductControllers.getProducts);
        router.get('/products/:id', ProductControllers.getProduct);
        router.post('/products', ProductControllers.createProduct);
        router.put('/products/:id', ProductControllers.updateProduct);
        router.delete('/products/:id', ProductControllers.deleteProduct);

export default router