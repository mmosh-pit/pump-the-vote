import Image from "next/image";
import * as React from "react";

import ImageIcon from "@/assets/icons/ImageIcon";

type Props = {
  changeImage: (file: File | null) => void;
  image: string;
};

const ImagePicker = ({ changeImage, image }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const imageContainerRef = React.useRef<HTMLInputElement>(null);
  const [imageHeight, setImageHeight] = React.useState(0);

  const handleChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      if (!event.target.files.item(0)) return;

      changeImage(event.target.files.item(0));
    },
    // eslint-disable-next-line
    [],
  );

  const handleDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      changeImage(e.dataTransfer.files[0]);
    }
    // eslint-disable-next-line
  }, []);

  const handleDrag = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      // setDragActive(true);
    } else if (e.type === "dragleave") {
      // setDragActive(false);
    }
  }, []);

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const triggerClick = React.useCallback(() => {
    if (!inputRef.current) return;

    inputRef.current.click();
  }, []);

  React.useLayoutEffect(() => {
    if (imageContainerRef.current !== null) {
      const { width } = imageContainerRef.current.getBoundingClientRect();
      setImageHeight(width);
    }
  }, [image]);

  return (
    <div
      onDragEnter={(e) => handleDrag(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      className="w-full h-full"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChangeInput}
      />
      {image ? (
        <div className="flex flex-col">
          <div
            className="flex w-full relative"
            ref={imageContainerRef}
            style={{ height: imageHeight + "px" }}
          >
            <Image src={image} alt="Identity" fill objectFit="cover" />
          </div>
          <div
            className="flex items-center relative mt-2 cursor-pointer"
            onClick={triggerClick}
          >
            <div className="p-2 border-solid border-[1px] border-white rounded-full mr-2">
              <ImageIcon />
            </div>
            <p className="text-tiny text-white">Replace Image</p>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center border-[1px] border-solid border-[#FFF] border-opacity-20 rounded-md select-none cursor-pointer backdrop-container"
          onClick={triggerClick}
          ref={imageContainerRef}
          style={{ height: imageHeight + "px" }}
        >
          <p className="text-base font-montserrat text-para-font-size leading-3 font-light">
            1080 x 1080
          </p>
          <p className="text-base font-montserrat text-para-font-size leading-3 font-light">
            Jpg, Png, Gif. Max 100 mb
          </p>
          <div className="relative py-1.5">
            <Image src="/png.svg" alt="png" width={64} height={64} />
          </div>
          <p className="text-sm text-center text-para-font-size font-light font-montserrat leading-3">
            <span className="text-sm text-white font-medium font-montserrat">
              Drag and Drop file
            </span>
            <br />
            or{" "}
            <span className="text-sm text-white font-medium font-montserrat">
              {" "}
              Browse media{" "}
            </span>{" "}
            on your device
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
