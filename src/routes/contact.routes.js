import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createContact, deleteContact, editContact, getAllContacts } from "../controllers/contact.controller.js";



const router = Router()





router.route('/create').post(verifyJWT, createContact)
router.route('/edit').put(verifyJWT,editContact)
router.route('/delete').delete(verifyJWT,deleteContact)
router.route('/viewAll').get(verifyJWT,getAllContacts)




export default router