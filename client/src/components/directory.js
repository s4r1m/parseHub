import { useEffect, useState } from "react";

export const Directory = () => {
  const [dir, setDir] = useState(["root"]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/path/${dir.join("/")}`)
      .then((res) => res.json())
      .then((data) => {
        Array.isArray(data)
          ? setCurrent(data)
          : setCurrent((prev) => prev.slice(0, -1));
      });
  }, [dir]);

  return (
    <>
      {dir.map((folder, index) => {
        return (
          <h1
            onClick={
              index === 0
                ? () => setDir((prev) => prev.slice(0, 1))
                : () => setDir((prev) => prev.slice(0, index))
            }
          >
            {folder} -->
          </h1>
        );
      })}
      {current.map((folder) => {
        return (
          <h1
            onClick={
              folder.indexOf(".") === -1
                ? () => setDir((prev) => [...prev, folder])
                : undefined
            }
          >
            {folder}
          </h1>
        );
      })}
    </>
  );
};
