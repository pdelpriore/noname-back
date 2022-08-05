import { MiddlewareFn } from "type-graphql";
import { IContext } from "../../context/Context";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../../errors/Errors";

const userAuth: MiddlewareFn<IContext> = async (
  { context: { req }, info },
  next
) => {
  if (
    [
      process.env.FIRST_TARGET_FIELD_NAME,
      process.env.SECOND_TARGET_FIELD_NAME,
    ].includes(info.fieldName)
  ) {
    return await next();
  }

  const userToken = req.cookies.jwt;

  if (!userToken) {
    throw new Error(ErrorResponse.UNAUTHORIZED);
  }

  jwt.verify(
    userToken,
    process.env.JWT_SECRET as string,
    (_: any, decoded: any) => {
      if (!decoded) {
        throw new Error(ErrorResponse.UNAUTHORIZED);
      }
      req.userId = decoded.userId;
    }
  );

  return await next();
};

export default userAuth;
