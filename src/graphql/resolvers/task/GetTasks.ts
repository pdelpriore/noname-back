import { Ctx, Query, Resolver } from "type-graphql";
import { Task } from "../../../db/entity/task/Task";
import { IContext } from "../../context/Context";

@Resolver()
export class GetTasksResolver {
  @Query(() => [Task])
  async getTasks(@Ctx() { req }: IContext) {
    const tasks = await Task.find({ where: { user: { id: req.userId } } });

    return tasks;
  }
}
