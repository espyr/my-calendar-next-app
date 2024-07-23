import AppBar from "@/components/AppBar";
import DndExample from "@/components/DndExample";
import MyTodos from "@/components/MyTodos";


export default function MyTodoLIst() {
    return (
        <div className="flex flex-col w-full ">
            <AppBar title={"My Todo List"} />
          


            <MyTodos />
            <DndExample />

        </div>
    )
}