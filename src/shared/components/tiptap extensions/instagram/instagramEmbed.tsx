import { Node, mergeAttributes } from "@tiptap/core";

export const InstagramEmbed = Node.create({
  name: "instagramEmbed",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      url: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [ { tag: 'iframe' }, { tag: "blockquote.instagram-media" } ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(HTMLAttributes, {
        class: "instagram-media",
        "data-instgrm-permalink": HTMLAttributes.url,
        "data-instgrm-version": "14",
      }),
      ["a", { href: HTMLAttributes.url }, HTMLAttributes.url],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const container = document.createElement("div");

      container.innerHTML = `
        <blockquote class="instagram-media" data-instgrm-permalink="${node.attrs.url}" data-instgrm-version="14">
          <a href="${node.attrs.url}">${node.attrs.url}</a>
        </blockquote>
      `;

      // Função para carregar o script do Instagram apenas uma vez
      const loadInstagramScript = () => {
        if (!window.instgrm) {
          const script = document.createElement("script");
          script.src = "https://www.instagram.com/embed.js";
          script.async = true;
          script.onload = () => {
            if (window.instgrm?.Embeds?.process) {
              window.instgrm.Embeds.process();
            }
          };
          document.body.appendChild(script);
        } else {
          window.instgrm.Embeds.process();
        }
      };

      setTimeout(loadInstagramScript, 500);

      return {
        dom: container,
      };
    };
  },
});
