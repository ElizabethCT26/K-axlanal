import express from 'express'
import {Router} from 'express'
import TestControllers from "./controllers/TestControllers.js"
import StoreControllers from "./controllers/StoreControllers.js"
import ProductControllers from "./controllers/ProductControllers.js"
import InterestController from './controllers/InterestController.js'
import FavoriteController from './controllers/FavoriteController.js'
import AuthController from './controllers/AuthController.js'
import CategoriesController from './controllers/CategoriesController.js'
import Usercontroller from './controllers/UserController.js'
import BusinessAreaController from './controllers/BusinessAreaController.js'
import multer from "multer"
import jwt from "jsonwebtoken"


import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import DirectionsController from './controllers/DirectionsController.js'
import { token } from 'morgan'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = 'C:/Users/DORER/Downloads/kaxlanal_code/K-axlanal/backend/uploads'

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        console.log(file)
        cb(null, join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-IMG.jpg`); // Set the file name
    }
})

const upload = multer({storage: storage})


const router = Router()

function token_verification(req, res, next){
    const token = req.cookies.auth_token;
    

    if(!token){
        console.log('token not provided')
        return res.status(401).send('token not provided')
        
    }

    jwt.verify(token, 'panqueque', (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(401).send('token invalid')
        }

        req.userId = decoded.id;
        req.userType = decoded.type;
        req.email = decoded.email;
        req.name = decoded.name
        next();
    })

}

    //Test controllers
        router.get('/test', AuthController.firstTestcontroller);

    //Store routes
        router.get('/stores', StoreControllers.getStores);
        router.get('/stores/latest', StoreControllers.getLatest);
        router.get('/stores/popular', StoreControllers.getPopular);
        router.get('/stores/area/:id', StoreControllers.getPopular);
        router.get('/stores/:id', StoreControllers.getStore);
        router.get('/stores/:id/edit', StoreControllers.getStoreEdit);
        router.get('/stores/owner/:id', StoreControllers.getStoreByOwner);
        router.get('/biz', StoreControllers.getBusinessArea);
        router.post('/stores', token_verification, upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'profile', maxCount: 1 }]),StoreControllers.createStore);
        router.put('/stores/:id', token_verification, upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'profile', maxCount: 1 }]),StoreControllers.updateStore);
        router.delete('/stores/:id', StoreControllers.deleteStore);

    //Product routes
        router.get('/products', ProductControllers.getProducts);
        router.get('/products/popular', ProductControllers.getPopular);
        router.get('/products/latest', ProductControllers.getLatest);
        router.get('/products/discounts', ProductControllers.getDiscounts);
        router.get('/products/categories/:name', ProductControllers.getByCategoryName);
        router.get('/products/mas-de-200', ProductControllers.getOver200);
        router.get('/products/menos-de-200', ProductControllers.getUnder200);
        router.get('/products/popular/:id', ProductControllers.getStorePopular);
        router.get('/products/latest/:id', ProductControllers.getLatestbyStore);
        router.get('/products/discounts/:id', ProductControllers.getDiscountsbyStore);
        router.get('/products/discounts', ProductControllers.getDiscounts);
        router.get('/products/:id', ProductControllers.getProduct);
        router.get('/products/favorite/:userId', ProductControllers.getFavoritesbyUser);
        router.get('/products/:id/edit', ProductControllers.getProductEdit);
        //router.get('/products/store/:id', StoreControllers.getStore);
        router.get('/products/category/:id', ProductControllers.getByCategory);
        router.post('/products', token_verification, upload.single('foto'), ProductControllers.createProduct);
        router.put('/products/:id', upload.single('foto'), ProductControllers.updateProduct);
        router.delete('/products/:id', token_verification, ProductControllers.deleteProduct);


    //Stores of interest routes
        router.get('/interest/user/', token_verification, InterestController.getInterestbyUser);
        router.get('/interest/store/:id/', InterestController.getInterestbyStore);
        router.post('/interest/', token_verification, InterestController.addInterest);
        router.delete('/interest/:id_tienda', token_verification, InterestController.deleteInterest);

    //Favorite products routes
        router.get('/favorite/user/', token_verification, FavoriteController.getFavoritesbyUser);
        router.get('/favorite/store/:id/', FavoriteController.getFavoritesbyProduct);
        router.post('/favorite/', token_verification, FavoriteController.addFavorite);
        router.delete('/favorite/:id_producto', token_verification, FavoriteController.deleteFavorite);
    
    //AuthController
        router.post('/register', AuthController.register);
        router.post('/login', AuthController.login);
        router.get('/logout', token_verification, AuthController.logout);
        router.get('/data', token_verification, AuthController.getUserData);

    //Categories routes
    router.get('/categories',CategoriesController.getCategories);
    router.get('/categories/:id', CategoriesController.getCategorie);
    router.post('/categories',CategoriesController.createCategorie);
    router.put('/categories/:id', CategoriesController.updateCategorie);
    router.delete('/categories/:id', CategoriesController.deleteCategorie);
    
    //Profile routes
    router.get('/profiles/:id', Usercontroller.getProfile)

    //Users routes
    router.get('/users',Usercontroller.getProfiles);
    router.get('/usersEdit', token_verification,Usercontroller.getUser);
    router.put('/users/',token_verification, upload.single('foto'),Usercontroller.updateProfile);
    router.delete('/users/:id',Usercontroller.deleteProfiles);

    //Directions routes
    router.get('/directions', DirectionsController.getDirections);
    router.get('/directions/:id', DirectionsController.getDirection);
    router.post('/directions', token_verification, DirectionsController.postDirection);

    //BusinessArea routes
    router.get('/business',BusinessAreaController.getAreas)
    

export default router