import { addSchool , listSchools } from '../controllers/schoolController.js';
import { Router } from 'express';
const router = Router();

// TWO ROUTES OF API
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);

export default router;