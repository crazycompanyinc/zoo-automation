import { Router, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { createProjectSchema, updateProjectSchema } from '../models/schemas.js';

const router = Router();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await ProjectService.getAll(req.user!.role === 'admin' ? undefined : req.user!.id);
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await ProjectService.getById(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = createProjectSchema.parse(req.body);
    const project = await ProjectService.create(data, req.user!.id);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = updateProjectSchema.parse(req.body);
    const project = await ProjectService.update(req.params.id, data);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await ProjectService.delete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
