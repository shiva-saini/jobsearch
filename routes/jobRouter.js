import { Router } from "express";
const router = Router();
import { validateJobInput , validateIdParam} from "../middleware/validationMiddleware.js";

import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
} from "../controllers/jobController.js";
// import { route } from "express/lib/router";


//one way to call routers
// router.get('/',getAllJobs)
// router.post('/',createJob);

//modern approach

router.route('/').get(getAllJobs).post(validateJobInput,createJob)
router.route('/:id').get(validateIdParam,getJob).patch(validateJobInput,validateIdParam,updateJob).delete(validateIdParam,deleteJob);

export default router;