import { CommandProps, Node, RawCommands, mergeAttributes } from '@tiptap/core';

const InstagramEmbed = Node.create({
  name: 'instagramEmbed',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  // Defina a tipagem explícita para 'commands'
  addCommands() {
    return {
      setInstagramEmbed:
        (options: { src: string }) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    } as Partial<RawCommands>;
  },

  parseHTML() {
    return [
      {
        tag: 'blockquote.instagram-media',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'blockquote',
      mergeAttributes(HTMLAttributes, {
        class: 'instagram-media',
        'data-instgrm-permalink': node.attrs.src,
        'data-instgrm-version': '14',
        style: 'background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);',
      }),
      [
        'div',
        { style: 'padding:16px;' },
        [
          'a',
          { href: node.attrs.src, style: 'background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;', target: '_blank' },
          [
            'div',
            { style: 'display: flex; flex-direction: row; align-items: center;' },
            [
              'div',
              { style: 'background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;' },
            ],
            [
              'div',
              { style: 'display: flex; flex-direction: column; flex-grow: 1; justify-content: center;' },
              [
                'div',
                { style: 'background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;' },
              ],
              [
                'div',
                { style: 'background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;' },
              ],
            ],
          ],
        ],
        [
          'div',
          { style: 'padding: 19% 0;' },
        ],
        [
          'div',
          { style: 'display:block; height:50px; margin:0 auto 12px; width:50px;' },
          [
            'svg',
            { width: '50px', height: '50px', viewBox: '0 0 60 60', xmlns: 'http://www.w3.org/2000/svg' },
            [
              'g',
              { stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd' },
              [
                'g',
                { transform: 'translate(-511.000000, -20.000000)', fill: '#000000' },
                [
                  'g',
                  { path: 'M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41' },
                ],
              ],
            ],
          ],
        ],
        [
          'div',
          { style: 'padding-top: 8px;' },
          [
            'div',
            { style: 'color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;' },
            'View this post on Instagram',
          ],
        ],
        [
          'div',
          { style: 'padding: 12.5% 0;' },
        ],
      ],
    ];
  },
});

export default InstagramEmbed;
