import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Task } from "../../../db/entity/task/Task";
import { User } from "../../../db/entity/user/User";
import { IContext } from "../../context/Context";

@Resolver()
export class AddTaskResolver {
  @Mutation(() => Boolean)
  async addTask(@Arg("name") name: string, @Ctx() { req }: IContext) {
    const user = (await User.findOne({ where: { id: req.userId } })) as User;

    const task = Task.create({ name, user });
    await task.save();

    return true;
  }
}
