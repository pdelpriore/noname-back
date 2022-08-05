import { Request, Response } from "express";

interface IRequest extends Request {
  userId: number;
}

export interface IContext {
  req: IRequest;
  res: Response;
}
