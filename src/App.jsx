import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import toast, { Toaster } from "react-hot-toast";

import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";

const App = () => {
  const [list, setList] = useState([]);

  const [title, setTitle] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  const clickHandler = () => {
    if (title) {
      if (isEditing) {
        const updatedItems = list.map((item) => {
          if (item.id === itemToEdit.id) {
            const updatedItem = { ...item, title };
            return updatedItem;
          } else {
            return item;
          }
        });

        setList(updatedItems);
        setTitle("");
        setIsEditing(false);
        setItemToEdit({});
        toast.success("Title Update Successfully", { duration: 3000 });
      } else {
        const newItem = {
          id: uuidv4(),
          title,
        };
        setList([...list, newItem]);
        setTitle("");
        toast.success("Title added Successfully", { duration: 3000 });
      }
    } else {
      toast.error("Title is Mandatory", { duration: 4000 });
    }
  };

  const deleteItem = (id) => {
    const remainingItems = list.filter((item) => item.id !== id);
    setList(remainingItems);
    toast.error("Item Deleted");
  };

  const editItem = (id) => {
    setIsEditing(true);
    setItemToEdit(list.find((item) => item.id === id));
    setTitle(itemToEdit.title);
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <main className="flex flex-col items-center min-h-screen gap-8">
        <h1 className="font-bold text-[2rem]">TODO LIST</h1>
        <section className="w-[30rem] p-6 bg-slate-100 rounded shadow-lg flex gap-1">
          <div className="flex items-center gap-2">
            <label htmlFor="title" className="text-lg font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="px-6 py-2 rounded shadow-xl text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button
            className="px-6 rounded shadow-xl text-lg bg-cyan-800 text-white font-bold"
            onClick={clickHandler}
          >
            {isEditing ? "Edit" : "Add Task"}
          </button>
        </section>
        <section className="w-[25rem] p-6 bg-slate-100 rounded shadow-lg flex gap-2">
          <ul className="flex flex-col gap-4 w-full">
            {list.length ? (
              list.map((item) => (
                <li
                  className="text-xl font-bold flex items-center justify-between w-full"
                  key={item.id}
                >
                  <span className="">{item.title}</span>
                  <button onClick={() => editItem(item.id)}>
                    <BsPencilSquare />
                  </button>
                  <button onClick={() => deleteItem(item.id)}>
                    <BsFillTrash3Fill />
                  </button>
                </li>
              ))
            ) : (
              <h2 className="text-center text-xl font-bold mx-[6rem]">
                No TODOs
              </h2>
            )}
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
