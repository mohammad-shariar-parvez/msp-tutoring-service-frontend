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
      <div>{HTMLReactParser(content)}</div>
    </div>
  );
};
export default Example;
