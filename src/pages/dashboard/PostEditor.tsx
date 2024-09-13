import { useEffect, useState } from 'react';
import { IPostData, PostsService } from '../../shared/services/api/posts/PostsService';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import { LayoutDashboard } from '../../shared/layouts';
import { useParams } from 'react-router-dom';

const defaultPost: Omit<IPostData, 'id' | 'admin'> = {
  title: '',
  description: '',
  type: 'texto',
  content: '',
  tags: '',
  subjects: '',
  status: 'draft',
  visibility: 'pro',
};

export const PostEditor = () => {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<Omit<IPostData, 'id' | 'admin'>>(defaultPost);

  const editor = useEditor({
    extensions: [StarterKit, Heading, Bold],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (postId && postId !== 'novo') {
      PostsService.getById(postId).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPost(response);
          editor?.commands.setContent(response.content);
        }
      });
    }
  }, [postId, editor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (postId && postId !== 'novo') {
      PostsService.updateById(postId, post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPost(defaultPost);
          editor?.commands.setContent('');
        }
      });
    } else {
      PostsService.create(post).then((response) => {
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPost(defaultPost);
          editor?.commands.setContent('');
        }
      });
    }
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto py-6 sm:px-6">
        <h1 className="text-xl font-bold mb-4">{postId ? 'Editar publicação' : 'Criar publicação'}</h1>

        {/* Campo para título */}
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Título"
          className="border p-2 w-full mb-4"
        />

        {/* Campo para descrição */}
        <input
          type="text"
          name="description"
          value={post.description}
          onChange={handleInputChange}
          placeholder="Descrição"
          className="border p-2 w-full mb-4"
        />

        {/* Editor Tiptap para o conteúdo */}
        <div className="border p-2 rounded-lg mb-4">
          <EditorContent editor={editor} />
        </div>

        {/* Botão de Publicar */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
          {postId ? 'Atualizar postagem' : 'Publicar Postagem'}
        </button>

        {/* Pré-visualização */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Pré-visualização:</h2>
          <div className="border p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </LayoutDashboard>
  );
};
