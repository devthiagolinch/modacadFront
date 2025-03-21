import { AccordionItem } from '../shared/components/ui/accordion/AccordionItem';

export function BlankPage() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <AccordionItem title="O que é Tailwind CSS?" open>
        <p className="text-gray-600">
          Tailwind é um framework CSS utilitário para criar interfaces modernas rapidamente.
        </p>
      </AccordionItem>
      <AccordionItem title="Como funciona o React?">
        <p className="text-gray-600">
          React é uma biblioteca JavaScript para criar interfaces de usuário baseadas em componentes.
        </p>
      </AccordionItem>
      <AccordionItem title="O que é TypeScript?">
        <p className="text-gray-600">
          TypeScript é um superset do JavaScript que adiciona tipagem estática opcional ao código.
        </p>
      </AccordionItem>
    </div>
  );
}
