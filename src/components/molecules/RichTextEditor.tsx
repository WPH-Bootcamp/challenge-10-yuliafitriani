"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
}

const RichTextEditor = forwardRef<Quill | null, RichTextEditorProps>(
  ({ value = "", onChange, readOnly = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const isUpdatingRef = useRef(false);

    /** INIT QUILL (ONCE) */
    useEffect(() => {
      if (!containerRef.current || quillRef.current) return;

      const quill = new Quill(containerRef.current, {
        theme: "snow",
        readOnly,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      quill.root.innerHTML = value;
      quillRef.current = quill;

      quill.on("text-change", () => {
        if (isUpdatingRef.current) return;
        onChange?.(quill.root.innerHTML);
      });
    }, []);

    /** SYNC VALUE */
    useEffect(() => {
      const quill = quillRef.current;
      if (!quill) return;

      if (quill.root.innerHTML !== value) {
        isUpdatingRef.current = true;
        quill.root.innerHTML = value || "";
        isUpdatingRef.current = false;
      }
    }, [value]);

    /** READONLY */
    useEffect(() => {
      quillRef.current?.enable(!readOnly);
    }, [readOnly]);

    /** EXPOSE INSTANCE */ useImperativeHandle(
      ref,
      () => quillRef.current!,
      [],
    );

    return (
      <div className="border rounded-md">
        <div ref={containerRef} className="min-h-[200px]" />
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
