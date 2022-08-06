import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../db/entity/user/User";
import { IContext } from "../../context/Context";

@Resolver()
export class MeResolver {
  @Query(() => User)
  async me(@Ctx() { req }: IContext) {
    const me = (await User.findOne({ where: { id: req.userId } })) as User;

    return me;
  }
}
