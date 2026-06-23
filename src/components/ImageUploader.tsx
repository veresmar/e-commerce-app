import { useState, useRef } from "react";
import Stack from '@mui/material/Stack'
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

type ImageUploaderProps = {
  onChange: (imageUrl: string) => void;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // програмно вызываем клик по инпуту 
    // inputRef.current - это input
    inputRef.current?.click()
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // target - это input
      setFile(e.target.files[0]); // берем 1-й файл
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage(imageUrl);
      props.onChange(imageUrl)
    }
  };
 

  return (
    <>
      <div>
        <input ref={inputRef} id="file" type="file" hidden onChange={handleFileChange}/>
      </div>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
          <img src={image} alt="" width={200} />
        </section>
      )}

     
        <Button variant="outlined" color="secondary" onClick={handleClick}>
          Upload a file
        </Button>
      
    </>
  );
}
