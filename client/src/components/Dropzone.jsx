import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone(props) {
  const onDrop = useCallback((files) => {
    props.setFormState({ ...props.formState, image: files[0].path });
    const data = new FormData();
    data.append("file", files[0]);
    // data.append('user', 'hubot')

    fetch("/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Click here to drop a picture! Add your thought, who is posting, then
          click Add Project!
        </p>
      )}
    </div>
  );
}