import { Request, Response } from "express";

type TUser = {
  id: string;
};

export interface IContext {
  req: Request;
  res: Response;
  user: TUser;
}
