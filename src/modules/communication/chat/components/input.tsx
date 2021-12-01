import React from 'react';
import { marked } from 'marked';

const Input = () => {
  const [markdown, setMarkdown] = React.useState('');

  console.log(marked.parse(markdown));

  return (
    <>
    <div
      contentEditable
      // dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
      onInput={e => setMarkdown(e.currentTarget.innerText)}
    >
      {/* <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} /> */}
    </div>
    <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown)}}></div>
    </>
  );
};

export default Input;
