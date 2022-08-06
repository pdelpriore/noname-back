import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../db/entity/user/User";
import { IContext } from "../../context/Context";
import { ErrorResponse } from "../../errors/Errors";

@Resolver()
export class MeResolver {
  @Query(() => User)
  async me(@Ctx() { req }: IContext) {
    const me = await User.findOne({ where: { id: req.userId } });

    if (!me) {
      throw new Error(ErrorResponse.UNAUTHORIZED);
    }

    return me;
  }
}
