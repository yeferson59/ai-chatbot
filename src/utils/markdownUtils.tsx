import React, { memo } from "react";
import { MarkdownCode } from "@/components/chat/markdown-code";
import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1: memo(function Heading1({ children, ...props }) {
    return (
      <h1 className="text-xl font-bold my-4" {...props}>
        {children}
      </h1>
    );
  }),

  h2: memo(function Heading2({ children, ...props }) {
    return (
      <h2 className="text-lg font-bold my-3" {...props}>
        {children}
      </h2>
    );
  }),

  h3: memo(function Heading3({ children, ...props }) {
    return (
      <h3 className="text-md font-bold my-2" {...props}>
        {children}
      </h3>
    );
  }),

  p: memo(function Paragraph({ children, ...props }) {
    return (
      <p className="my-2 break-words" {...props}>
        {children}
      </p>
    );
  }),

  ul: memo(function UnorderedList({ children, ...props }) {
    return (
      <ul className="list-disc pl-5 my-2" {...props}>
        {children}
      </ul>
    );
  }),

  ol: memo(function OrderedList({ children, ...props }) {
    return (
      <ol className="list-decimal pl-5 my-2" {...props}>
        {children}
      </ol>
    );
  }),

  li: memo(function ListItem({ children, ...props }) {
    return (
      <li className="my-1" {...props}>
        {children}
      </li>
    );
  }),

  a: memo(function Anchor({ href, children, ...props }) {
    return (
      <a
        href={href}
        className="text-primary hover:underline break-all"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }),

  blockquote: memo(function Blockquote({ children, ...props }) {
    return (
      <blockquote
        className="border-l-4 border-primary/30 pl-4 italic my-2"
        {...props}
      >
        {children}
      </blockquote>
    );
  }),

  code: memo(function Code({ className, children, ...props }) {
    const language = className?.replace("language-", "") || undefined;
    const value = String(children).replace(/\n$/, "");
    const isMultiline = !!className;

    return isMultiline ? (
      <MarkdownCode language={language} value={value} />
    ) : (
      <code className="bg-secondary/30 px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  }),

  table: memo(function Table({ children, ...props }) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-border" {...props}>
          {children}
        </table>
      </div>
    );
  }),

  thead: memo(function TableHead({ children, ...props }) {
    return (
      <thead className="bg-secondary/10" {...props}>
        {children}
      </thead>
    );
  }),

  th: memo(function TableHeader({ children, ...props }) {
    return (
      <th
        className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
        {...props}
      >
        {children}
      </th>
    );
  }),

  td: memo(function TableCell({ children, ...props }) {
    return (
      <td className="px-3 py-2 whitespace-nowrap" {...props}>
        {children}
      </td>
    );
  }),
};
