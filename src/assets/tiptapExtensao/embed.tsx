import { CommandProps, Node, RawCommands, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

const InstagramEmbed = Node.create({
  name: 'instagramEmbed',
  group: 'block',
  content: 'inline*',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

   addAttributes() {
    return {
      src: {
        default: null, // Defina um valor padrão
        parseHTML: (element) => element.innerHTML,
        renderHTML: (attributes) => {
          if (!attributes.src) return {};
          return { 'data-instgrm-permalink': attributes.src };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer()
  },

  parseHTML() {
    return [
      {
        tag: 'blockquote.instagram-media',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const src = node.attrs.src || 'https://example.com'; // Use um valor padrão caso `src` esteja ausente

   return ['div', { innerHTML: src }];
  },

  addCommands() {
    return {
      setInstagramEmbed:
        (options: { src: string }) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: { src: options.src }, // Salva o `src` como atributo
          });
        },
    } as Partial<RawCommands>;
  }
  ,

 
  

});

export default InstagramEmbed;
