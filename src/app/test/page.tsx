'use client';
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';

const Example = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    placeholder: 'Start Typing',
  };

  console.log(content);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        //   tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
      />
      <button>Submit</button>
      <div>{HTMLReactParser(content)}</div>
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
