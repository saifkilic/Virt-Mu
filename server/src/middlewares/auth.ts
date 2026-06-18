import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include authenticated user payload
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'user' | 'curator' | 'admin';
  };
}

interface JwtPayload {
  id: string;
  role: 'user' | 'curator' | 'admin';
}

// Authenticate user check
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  // Read Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Not authorized. No token provided.',
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_virtual_museum_jwt_key_2026'
    ) as JwtPayload;

    // Attach user payload to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Not authorized. Invalid or expired token.',
    });
  }
};

// Restrict access to specific roles
export const authorizeRoles = (...roles: Array<'user' | 'curator' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Access denied. Role '${req.user?.role || 'anonymous'}' is not authorized to access this resource.`,
      });
      return;
    }
    next();
  };
};
