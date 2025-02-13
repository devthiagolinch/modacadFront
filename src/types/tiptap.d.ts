import { Commands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands {
    setInstagramEmbed: {
      setInstagramEmbed: (url: string) => ReturnType<Commands['insertContent']>;
    };
  }
}