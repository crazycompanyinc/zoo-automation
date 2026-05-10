import { Router, Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/serviceService.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await ServiceService.getAll();
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await ServiceService.getBySlug(req.params.slug);
    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found' });
      return;
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user!.role !== 'admin') {
      res.status(403).json({ success: false, error: 'Forbidden' });
      return;
    }
    const service = await ServiceService.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user!.role !== 'admin') {
      res.status(403).json({ success: false, error: 'Forbidden' });
      return;
    }
    const service = await ServiceService.update(req.params.id, req.body);
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user!.role !== 'admin') {
      res.status(403).json({ success: false, error: 'Forbidden' });
      return;
    }
    await ServiceService.delete(req.params.id);
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
