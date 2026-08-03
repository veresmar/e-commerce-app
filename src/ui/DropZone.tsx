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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          backgroundColor: isDragging ? "#38b764" : "#2b2f4a",
          color: isDragging ? "#0d0e18" : "#f4f4f0",
          border: isDragging
            ? "3px dashed #0d0e18"
            : "3px solid #0d0e18",
          boxShadow: "4px 4px 0 0 #0d0e18",
          cursor: "pointer",
          padding: "1.5em",
          width: '100%',
          borderRadius: 0,
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "0.9rem",
          lineHeight: 1.8,
          textAlign: "center",

          "@media (max-width:650px)": {
            padding: "1.6em 4em",
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        onClick={handleClick}
      >
        Drop your image here
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
