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
        tag: 'blockquote',
        getAttrs: (dom) => {
          const anchor = dom.querySelector('a');
          if (anchor) {
            const url = anchor.getAttribute('href');
            if (url && url.includes('instagram.com')) {
              return { url };
            }
          }
          return null;
        },
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'blockquote',
      {},
      [
        'p',
        {},
        [
          'a',
          {
            href: node.attrs.url,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
          },
          'Ver essa foto no Instagram',
        ],
      ],
      [
        'p',
        {},
        [
          'a',
          {
            href: node.attrs.url,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
          },
          'Uma publicação compartilhada por Instagram',
        ],
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const container = document.createElement('div');
      const embedUrl = node.attrs.url;

      // Cria um iframe para o embed do Instagram
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.instagram.com/p/${embedUrl.split('/').pop()}/embed`;
      iframe.width = '100%';
      iframe.height = '500';
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

  toJSON() {
    return {
      attrs: {
        url: this.options.url,
      },
    };
  },
});