"use client";
import { FormEvent, ChangeEvent, useState } from "react";

const CreateUser = () => {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Creating...");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`User created! ID: ${data.user._id}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error creating user");
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl mb-2 font-bold">1. Register Smart Bin</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2 text-black"
          placeholder="Bin ID or Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Create
        </button>
      </form>
      {message && <p className="mt-2 text-yellow-300">{message}</p>}
    </div>
  );
};

export default CreateUser;
