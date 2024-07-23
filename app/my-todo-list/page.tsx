import AppBar from "@/components/AppBar";
import MyTodos from "@/components/MyTodos";
import TodosDnd from "@/components/TodosDnd";

export default function MyTodoLIst() {
  return (
    <div className="flex flex-col w-full ">
      <AppBar title={"todo"} />
      {/* <MyTodos /> */}
      <div className="flex items-center justify-end mr-8">
        <button className="bg-fuchsia-400 p-3 rounded-md text-white text-lg">
          + Add a new Card
        </button>
      </div>
      <TodosDnd />
    </div>
  );
}
