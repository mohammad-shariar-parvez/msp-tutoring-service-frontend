'use client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';

const Example = async () => {
  const session: any = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <button>Submit</button>
    </div>
  );
};
export default Example;

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
// import 'react-quill/dist/quill.bubble.css'; // Import the Bubble theme styles
// import 'react-quill/dist/quill.core.css'; // Import the Core theme styles

// const MyRichTextEditor = () => {
//   const [text, setText] = useState('');

//   const formats = [
//     'font', // Add the font format
//     'size', // Add the size format
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'list',
//     'bullet',
//   ];
//   const fontOptions = [
//     'Arial',
//     'Verdana',
//     'Times New Roman',
//     'Rubic', // Add "Rubic" to the list
//   ];
//   const modules = {
//     toolbar: [
//       [{ font: [] }], // Font dropdown
//       [{ size: [] }], // Size dropdown
//       ['bold', 'italic', 'underline', 'strike'],
//       ['list', 'bullet'],
//     ],
//   };

//   const handleChange = (value: any) => {
//     setText(value);
//   };
//   console.log(text);

//   return (
//     <div>
//       <ReactQuill
//         theme='snow'
//         value={text}
//         onChange={handleChange}
//         formats={formats}
//         modules={modules}
//       />
//       <div>{HTMLReactParser(text)}</div>
//       <p>
//         asdf fdasd<span className='ql-size-huge'> fd</span>
//       </p>
//     </div>
//   );
// };

// export default MyRichTextEditor;
