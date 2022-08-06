import { Ctx, Query, Resolver } from "type-graphql";
import { IContext } from "../../context/Context";

@Resolver()
export class UserSignoutResolver {
  @Query(() => Boolean)
  async userSignOut(@Ctx() { res }: IContext) {
    res.clearCookie("jwt");

    return true;
  }
}
