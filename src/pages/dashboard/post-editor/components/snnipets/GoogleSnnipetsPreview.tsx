import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaSearch } from 'react-icons/fa';

interface GoogleSnippetPreviewProps {
  title: string;
  url: string | undefined;
  description: string;
  publish_date: Date | null;
}

const GoogleSnnipet: React.FC<GoogleSnippetPreviewProps> = ({ title, url, description, publish_date }) => {
  let date = '';
  if (publish_date) {
    date = format(publish_date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  return (
    <div className="p-2 mb-10 bg-white border border-gray-300 rounded-md w-full gap-2">
      <div className="flex gap-3 justify-center items-center align-middle mb-3">
        <img
          src="https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt=""
          className="w-16"
        />
        <section className="w-screen p-2 h-6 rounded-full bg-slate-100 justify-end items-center">
          <FaSearch size={10} className="float-end" />
        </section>
      </div>
      <p className="text-sm font-montserrat font-light text-gray-600 break-all">blog.modacad.com.br/{url}</p>
      <h2 className="text-blue-600 text-xl font-medium leading-snug">{title || 'Exemplo de título do Google'}</h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        <span>{date}</span> -{' '}
        {description || 'Aqui estará a descrição do conteúdo, que aparecerá nos resultados do motor de busca.'}
      </p>
    </div>
  );
};

export default GoogleSnnipet;
