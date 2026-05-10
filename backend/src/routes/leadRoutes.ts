import { Router, Request, Response, NextFunction } from 'express';
import { LeadService } from '../services/leadService.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { createLeadSchema, updateLeadSchema } from '../models/schemas.js';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const leads = await LeadService.getAll(req.user!.role === 'admin' ? undefined : req.user!.id);
    res.json({ success: true, data: leads });
  } catch (err) {
    next(err);
  }
});

router.get('/stats', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await LeadService.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const lead = await LeadService.getById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createLeadSchema.parse(req.body);
    const lead = await LeadService.create(data);
    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = updateLeadSchema.parse(req.body);
    const lead = await LeadService.update(req.params.id, data);
    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await LeadService.delete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
