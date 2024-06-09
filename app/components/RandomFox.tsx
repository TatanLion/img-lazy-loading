import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
};

type ImageNative = ImgHTMLAttributes<HTMLImageElement>; // Traemos todos los atributos que aceptan las imagenes 

type Props = LazyImageProps & ImageNative

export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    //Nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        setCurrentSrc(src);
      });
    });

    //Observar el nodo
    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={node}
      src={currentSrc}
      {...imgProps} // Le pasamos todos los atributos junto con la funcionalidad de js
    />
  );
};

// Crear un componente usando tipos
// import type { FunctionComponent, FC } from 'react'

// export const RandomFox : FunctionComponent = () => {
//     return <img />
// }

// export const RandomFox : FC = () => {
//     return <img />
// }
