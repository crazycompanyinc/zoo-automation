import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { registerSchema, loginSchema } from '../models/schemas.js';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await AuthService.register(data);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.getProfile(req.user!.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
