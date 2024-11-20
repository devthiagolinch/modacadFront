import { useEffect, useState } from 'react';
import { ITagData, TagsService } from '../../../shared/api/tags/TagsService';
import { LayoutDashboard } from '../../../shared/layouts';
import { CreateTag } from './components/CreateTag';
import { ListTags } from './components/ListTags';

export const PageTags = () => {
  const [tags, setTags] = useState<ITagData[]>([]);
  const [selectedTag, setSelectedTag] = useState<ITagData | null>(null);

  // Buscar tags
  const fetchTags = () => {
    TagsService.getAll().then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setTags(response);
    });
  };

  // Solicitar tags ao carregar a página
  useEffect(() => {
    fetchTags();
  }, []);

  // Atualizar a lista de tags ao criar uma nova
  const onCreated = () => {
    setSelectedTag(null);
    fetchTags();
  };

  return (
    <LayoutDashboard>
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <CreateTag onCreated={onCreated} selectedTag={selectedTag} clearTag={() => setSelectedTag(null)} />
        <ListTags tags={tags} onSelectTag={setSelectedTag} />
      </div>
    </LayoutDashboard>
  );
};
