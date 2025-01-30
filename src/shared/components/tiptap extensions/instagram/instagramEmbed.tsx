import { Node } from '@tiptap/core';

export const InstagramEmbed = Node.create({
  name: 'instagramEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-instagram-embed]',
        getAttrs: (dom) => {
          return {
            url: dom.getAttribute('data-instagram-embed'),
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    return ['div', { 'data-instagram-embed': node.attrs.url }];
  },

  addNodeView() {
    return ({ node }) => {
      const container = document.createElement('div');
      const embedUrl = node.attrs.url;

      // Cria um iframe para o embed do Instagram
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.instagram.com/p/${embedUrl}/embed`;
      iframe.width = '50%';
      iframe.height = 'auto';
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';

      container.appendChild(iframe);

      return {
        dom: container,
      };
    };
  },

  addCommands() {
    return {
      setInstagramEmbed:
        (url) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { url },
          });
        },
    };
  },

  // Adicionar serialização para salvar o nó no JSON
  toJSON() {
    return {
      attrs: {
        url: this.options.url,
      },
    };
  },
});