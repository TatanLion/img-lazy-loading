"use client";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { LazyImage } from "./components/RandomFox";

import Document, { Html, Head, Main, NextScript } from "next/document";

export default function Home() {
  const random = (): number => Math.floor(Math.random() * 123) + 1;

  const generateId = (): string => Math.random().toString(36).substring(2, 9);

  // Declaramos los states con genericos para decirles de que tipo son se puede hacer de dos formas <Array<string>> ó <string[]>
  const [images, setImages] = useState<Array<ImageItem>>([
    { id: generateId(), url: `https://randomfox.ca/images/${random()}.jpg` },
  ]);

  const [ increment, setIncrement ] = useState(false)

  // Button to add new image fox
  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    // Este tipo se trae desde react
    const newImageItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    };
    setImages([...images, newImageItem]);
    setIncrement(true)
    setTimeout(() => {
      setIncrement(false)
    }, 2000)
  };

  return (
    <main className="w-[50%] m-auto py-[2%]">
      <h1 className="text-[#4F46E9] text-center text-[1.5vw] font-bold">
        Image Lazy Loading React Typescript
      </h1>
      <div className="text-[1.15vw] text-center font-normal my-[3%]">
        <p>
          Un componente genérico de React para cargar imágenes con lazy loading.
        </p>
        <p>🦊🦊</p>
        <p>
          Las imágenes agregadas no se descargarán hasta que sean visibles en la
          pantalla
        </p>
        <p>🦊🦊</p>
      </div>
      <div className="w-[100%] flex justify-center">
        <button
          onClick={addNewFox}
          className="bg-[#4F46E9] text-white rounded-md py-[.5vw] px-[1vw] text-[1.1vw] hover:bg-[#5d55ea]"
        >
          Add new Fox
        </button>
      </div>
      {increment &&
        <p className="bg-[#31c294] text-white text-[1vw] text-center font-bold mt-[2%] px-[.3vw] py-[.7vw] rounded-md w-[4vw] mx-auto">+ 1</p>
      }
      <div className="grid grid-cols-2 mt-[5%] gap-[1vw]">
        {images.map(({ id, url }) => (
          <div key={id} className="flex justify-center items-center">
            <LazyImage
              src={url}
              alt="Image Fox"
              className="rounded-md w-[16vw] h-auto bg-gray-300"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
