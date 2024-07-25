"use client";
import AddTodoCard from "@/components/AddTodoCard";
import AppBar from "@/components/AppBar";
import TodosDnd from "@/components/TodosDnd";
import { useState } from "react";
import Modal from "react-modal";

export default function MyTodoLIst() {

  return (
    <div className="flex flex-col w-full ">
      <AppBar title={"todo"} />
     
      <TodosDnd />
  
    </div>
  );
}
