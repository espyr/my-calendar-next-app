"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@/components/AppBar";
import Modal from "react-modal";
import TodosDnd from "@/components/TodosDnd";
import AddTodoCard from "@/components/AddTodoCard";

export default function MyTodoLIst() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full ">
      <AppBar title={"todo"} />
      {/* <MyTodos /> */}
      <div className="flex items-center justify-end mr-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-fuchsia-400 p-3 rounded-md text-white text-lg my-14"
        >
          + Add a new Card
        </button>
      </div>
      <TodosDnd />
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          className="relative bg-gradient-to-r from-purple-300 via-pink-300 to-red-200  w-11/12 max-w-lg p-8 rounded-lg shadow-2xl outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 border-0 flex items-center justify-center"
        >
          <AddTodoCard
            data={{
              id: Math.random(),
              title: "",
              components: [],
            }}
            mode="add"
            onClose={() => setIsAddModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
