import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownViewer = ({ file }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [file]);

  return (
    <div className="p-3 bg-light rounded shadow-sm mt-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
