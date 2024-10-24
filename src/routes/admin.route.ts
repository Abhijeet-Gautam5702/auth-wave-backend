import { Router } from "express";
import {
  createAccount,
  createLoginSession,
  deleteAccount,
  deleteLoginSession,
  refreshAccessToken,
} from "../controllers/admin.controller";
import { authenticateAdmin } from "../middlewares/admin-auth";

const router = Router();

router.route("/account/create").post(createAccount);
router.route("/account/login").post(createLoginSession);
router.route("/account/logout").put(authenticateAdmin, deleteLoginSession);
router.route("/account/delete").delete(authenticateAdmin, deleteAccount);

router.route("/access-token/refresh").post(refreshAccessToken);

export const adminRouter = router;
