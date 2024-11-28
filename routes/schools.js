import { addSchool , listSchools } from '../controllers/schoolController.js';
import { addSchoolMiddleware , listSchoolsMiddleware } from '../middlewares/middleware.js';
import { Router } from 'express';
const router = Router();

// TWO ROUTES OF API
router.post('/addSchool', addSchoolMiddleware, addSchool);
router.get('/listSchools', listSchoolsMiddleware, listSchools);

export default router;