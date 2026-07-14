import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

type DropZoneProps = {
  onFileSelect: (file: File) => void;
  initialImage: File | null;
};

export default function DropZone({
  onFileSelect,
  initialImage,
}: DropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialImage) {
      setPreview(URL.createObjectURL(initialImage));
    }
    setFile(initialImage);
  }, [initialImage]);
  const handleClick = () => {
    // програмно вызываем клик по инпуту
    // inputRef.current - это input
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // target - это input
      setFile(file); // берем 1-й файл

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      onFileSelect(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    setFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    onFileSelect(file);
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          backgroundColor: isDragging ? "#e26be2ff" : "#eaa6eaff",
          border: isDragging ? "3px dashed #cd9ff8ff" : "3px solid  #ba8be6ff",
          cursor: "pointer",
          padding: "4em",
          borderRadius: "1em",
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        onClick={handleClick}
      >
        Drop image here
        <input
          ref={inputRef}
          id="file"
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Box>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
          {preview && <img src={preview} alt={file.name} width={200} />}
        </section>
      )}
    </>
  );
}
