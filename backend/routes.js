import express from 'express'
import {Router} from 'express'
import TestinControllers from "./controllers/TestControllers.js"

const testControllers = TestinControllers;
const router = Router()

router.get('/2', testControllers.firstTestcontroller)

export default router