import { Request, Response } from "express";

type TUser = {
  id: number;
};

export interface IContext {
  req: Request;
  res: Response;
  user: TUser;
}
