import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setInstagramEmbed: (options: { src: string }) => ReturnType;
  }
}