import { useState, useRef} from 'react'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from "@mui/material/Box";



type DropZoneProps = { 
  onFileSelect: (file: File ) => void
}

export default function DropZone({onFileSelect} : DropZoneProps){
  const [image, setImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log('isDragging:', isDragging);
    
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
      
      onFileSelect(imageUrl)
      // URL.revokeObjectURL(imageUrl)
    }
  };
  console.log('image:', image);
  
   return (
    <> 
      <Box component="div" sx={{
          backgroundColor: isDragging ? "#e26be2ff" : "#eaa6eaff",
          border: isDragging ? '3px dashed #cd9ff8ff' : '3px solid  #ba8be6ff',
          cursor: 'pointer',
          padding: '4em',
          borderRadius: '1em'
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault();
          const file = e.dataTransfer.files[0];
          setFile(file);
          setIsDragging(false);
          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
          onFileSelect(imageUrl)
        }}
        onClick={handleClick}
      > 
      
      Drop image here
            <input ref={inputRef} id="file" type="file" hidden onChange={handleFileChange}/>
          </Box>
    
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
          
        </>
   )
}