import { IsEmail } from "class-validator";
import { Args, ArgsType, Ctx, Field, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "../../../db/entity/user/User";
import { ErrorResponse } from "../../errors/Errors";
import { IContext } from "../../context/Context";

@ArgsType()
class UserSigninArgs {
  @IsEmail()
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserSigninResolver {
  @Query(() => Boolean)
  async userSignin(
    @Args() { email, password }: UserSigninArgs,
    @Ctx() { req, res }: IContext
  ) {
    const user = (await User.findOne({ where: { email } })) as User;

    const userPasswordVerified = await argon2.verify(user.password, password);

    if (!userPasswordVerified) {
      throw new Error(ErrorResponse.WRONG_PASSWORD);
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );
    res.cookie("jwt", accessToken, { httpOnly: true });

    return true;
  }
}
