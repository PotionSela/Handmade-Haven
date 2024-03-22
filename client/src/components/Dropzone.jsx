// import {useDropzone} from 'react-dropzone';

// export default function OuterDropzone(props) {
//   const {getRootProps} = useDropzone({
//     // Note how this callback is never invoked if drop occurs on the inner dropzone
//     onDrop: files => {
//         const data = new FormData()
//         data.append('file', files[0])
//         // data.append('user', 'hubot')

//         fetch('/upload', {
//           method: 'POST',
//           body: data
//         })
//         .then (res => console.log(res))
//         .catch(err => console.error(err));
//         console.log(files)
//     }
//   });

//   return (
//     <div className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <InnerDropzone />
//         <p>Outer dropzone</p>
//       </div>
//     </div>
//   );
// }

// function InnerDropzone(props) {
//   const {getRootProps} = useDropzone({noDragEventsBubbling: true});
//   return (
//     <div {...getRootProps({className: 'dropzone'})}>
//       <p>Inner dropzone</p>
//     </div>
//   );
// }

// import React from "react";
// import Dropzone from "react-dropzone";

// <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
//   {({ getRootProps, getInputProps }) => (
//     <section>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         <p>Drag n drop some files here, or click to select files</p>
//       </div>
//     </section>
//   )}
// </Dropzone>;

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