import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Args, ArgsType, Field, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../../db/entity/user/User";
import { ErrorResponse } from "../../errors/Errors";

@ArgsType()
class UserSignupArgs {
  @MinLength(5)
  @MaxLength(20)
  @Field()
  name!: string;

  @IsEmail()
  @Field()
  email!: string;

  @MinLength(5)
  @Field()
  password!: string;
}

@Resolver()
export class UserSignupResolver {
  @Mutation(() => Boolean)
  async userSignup(@Args() { password, ...rest }: UserSignupArgs) {
    const userPasswordHashed = await argon2.hash(password);

    const user = User.create({
      ...rest,
      password: userPasswordHashed,
    });
    await user.save();

    return true;
  }
}
