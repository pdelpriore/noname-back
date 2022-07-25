import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../db/entity/user/User";
import { IContext } from "../../context/Context";

@Resolver()
export class MeResolver {
  @Query(() => User)
  async me(@Ctx() { user }: IContext) {
    const me = User.findOne({ where: { id: parseInt(user.id) } });

    return me;
  }
}
