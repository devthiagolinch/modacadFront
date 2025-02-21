import { Footer } from '../../shared/components/footer/footer';
import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';

export const TermsAndConditionsPage = () => {
  return (
    <div>
      <PublicHeader />
      <div className="max-w-4xl mx-auto p-6 text-gray-700 font-montserrat">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-xl text-gray-600 mt-2">TERMO PARA ASSINATURA PARA ACESSO AO PORTAL</h1>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="mb-4">
            Olá, que bom que você encontrou o que deseja, nós trabalhamos bastante para desenvolver esse portal para
            você! Para registrar o nosso negócio, preparamos esse contrato em linguagem simples, não deixe de ler para
            você saber ao que tem direito! Lembramos que ao aceitar esse contrato, você concorda integralmente com as
            condições nele descritas.
          </p>
          <p className="mb-4">
            Caso você tenha alguma dúvida, não deixe de entrar em contato conosco através do{' '}
            <a href="#fale-conosco" className="text-blue-500 hover:underline">
              fale conosco
            </a>{' '}
            em nosso site ou, ainda, através do e-mail{' '}
            <a href="mailto:telmabarcellos@modacad.com.br" className="text-blue-500 hover:underline">
              telmabarcellos@modacad.com.br
            </a>
            . Nossos especialistas farão de tudo para resolver a sua questão no menor prazo possível.
          </p>
        </section>

        {/* Quem Somos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">QUEM SOMOS</h2>
          <p className="mb-4">
            A Modacad foi criada para prestar serviços, soluções e produtos para confeccionistas. Com décadas de
            experiência na confecção de moldes e ampliações, a Modacad virou referência também na produção de conteúdo
            na área da moda. Nesse contexto, a Modacad desenvolveu um portal para que o conteúdo que a Modacad publica
            esteja disponível para você da forma que você preferir. Em outras palavras, criamos os seguintes planos de
            assinatura, que lhe concedem os seguintes benefícios:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li className="mb-2">
              <strong>Plano Básico:</strong> não tem custo. Isso mesmo, sem custo. Ao se tornar membro no plano básico,
              você tem a opção de ser notificado por email quando publicarmos conteúdo novo e pode optar também por
              receber o novo conteúdo em seu email!
            </li>
            <li className="mb-2">
              <strong>Plano Mensal:</strong> Além de ter acesso a todo o nosso conteúdo aberto, nesta modalidade de
              assinatura você tem acesso à conteúdo exclusivamente produzido para os assinantes com plano mensal! Além
              disso, você terá acesso ao chat exclusivo para os nossos assinantes. E tudo isso mediante acesso sem
              anúncios ao nosso portal.
            </li>
            <li className="mb-2">
              <strong>Plano Anual:</strong> Nessa modalidade você tem todos os benefícios do plano básico + plano mensal
              e faz uma economia de 41%. Sim: acesso por um ano a conteúdo exclusivo, chat de assinantes, tudo sem
              anúncios e sem complicação!
            </li>
          </ul>
        </section>

        {/* Formas de Pagamento */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            ESCOLHEU A MODALIDADE DA SUA ASSINATURA? FORMAS DE PAGAMENTO E SEU ACESSO AO SISTEMA.
          </h2>
          <p className="mb-4">
            Para o pagamento de sua assinatura na modalidade que você tiver escolhido, nosso sistema direcionará você
            para o Mercadopago®, que permitirá que você opte pela modalidade de pagamento que melhor lhe convier dentre
            as disponíveis, como, por exemplo pix ou cartão de crédito. A ferramenta então deverá processar o pagamento,
            notificar sobre a conclusão do pagamento para após direcionar você para acesso identificado ao sistema.
          </p>
          <p className="mb-4">
            Portanto, atenção: a Modacad não processa os pagamentos diretamente. Esse serviço é prestado por terceiro e
            depende da disponibilidade dessa empresa.
          </p>
          <p className="mb-4">
            Informamos que eventuais tarifas cobradas pela sua operadora de cartão de crédito ou instituição bancária
            para processamento do pagamento, ou tarifas cobradas pela sua operadora de telefone e/ou de internet e
            demais terceiros ocorrerá normalmente, nos termos dos contratos que você tiver celebrado com eles, dos quais
            nós não fazemos parte e sobre os quais não temos quaisquer poderes.
          </p>
          <p className="mb-4">
            A nota fiscal relativa à sua compra destacará os impostos incidentes nos termos da legislação vigente. Cada
            um de nós – a Modacad e você – permanecerá responsável pelo recolhimento de quaisquer taxas, contribuições e
            impostos devidos ao Poder Público em razão da sua assinatura e/ou da compra de nossos produtos, soluções e
            serviços, nos termos da legislação vigente.
          </p>
        </section>

        {/* Licença de Uso */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">NÓS TE CONCEDEMOS UMA LICENÇA DE USO DO NOSSO PORTAL</h2>
          <p className="mb-4">
            Ao se tornar assinante do nosso portal, estamos concedendo a você uma licença de uso para acesso ao nosso
            portal, para seu uso exclusivo. Cada um de nossos conteúdos foi produzido por nossa equipe de especialistas,
            são de autoria dessas pessoas e de propriedade da Modacad. Você poderá ter acesso livre ao nosso conteúdo,
            mas não poderá comercializá-los, já que eles são de propriedade da Modacad. E, claro: ao usar nosso
            conteúdo, cite a fonte!
          </p>
          <p className="mb-4">
            A Modacad Ltda. é a desenvolvedora e proprietária do portal Modacad, de todas as suas funcionalidades e
            propriedade intelectual nele contida, como o software, desenhos, modelos, moldes, símbolos e processos. Nós
            te concedemos uma licença de uso do nosso portal, não exclusiva, limitada e revogável, para que você,
            somente você, acesse e use o portal. Essa licença é limitada: você não poderá vender, revender, alugar,
            coletar dados, informações e processos do aplicativo ou de suas funcionalidades. Ao aceitar nossos termos
            você concorda em utilizar o portal da forma descrita nesses termos e condições de uso, e concorda em não
            duplicar, modificar, transferir, alienar, reproduzir, explorar, criar ou tentar recriar aplicação ou
            soluções similares ao nosso portal.
          </p>
        </section>

        {/* Serviços de Terceiros */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">SERVIÇOS DE TERCEIROS</h2>
          <p className="mb-4">
            Não garantimos os serviços prestados pela operadora do seu cartão de crédito ou pelo seu banco: nós não
            temos qualquer poder sobre esses serviços ou sobre a relação que você mantém com ambos.
          </p>
          <p className="mb-4">
            Nós também não podemos garantir o acesso irrestrito ao nosso portal, já que ele depende do acesso à
            internet, que é feito pela operadora de telefone e/ou de internet de cada usuário, dependendo da tecnologia
            dessas operadoras e da banda/pacote de dados contratados, além da rede que a operadora lhe disponibiliza e
            do cumprimento de suas obrigações de pagamento com a sua operadora. Novamente, nós não temos qualquer poder
            sobre os serviços de conectividade ou sobre sua relação com sua operadora.
          </p>
          <p className="mb-4">
            Além disso, nós não garantimos o acesso irrestrito ao portal por ele também depender da estabilidade de
            servidores de acesso e servidores externos, sobre os quais nós não temos controle ou gerência. Da mesma
            forma, não garantimos a inexistência de erros do portal, na medida em que ele realiza a interface com
            sistemas operacionais de computadores, aparelhos celulares e programação de rede, os quais não estão sob o
            nosso controle ou gerência. No entanto, reafirmamos que aplicaremos todos os nossos esforços, através de
            nossa equipe de programação, gestão e manutenção, bem como de softwares desenvolvidos especialmente para o
            suporte em questões de natureza funcional do sistema, para que você tenha o melhor serviço e o melhor
            desempenho possíveis durante o uso da nossa ferramenta.
          </p>
        </section>

        {/* Sobre Dados */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">SOBRE DADOS: CONFIRA NOSSO AVISO DE PRIVACIDADE!</h2>
          <p className="mb-4">
            <a href="/politica-de-privacidade" className="text-blue-500 hover:underline">
              Clique aqui para conferir nosso aviso de privacidade.
            </a>
          </p>
        </section>

        {/* Ah, você sabia? */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Ah, você sabia?</h2>
          <p className="mb-4">
            A Modacad também possui um sistema próprio que permite que você escolha modelos e tecidos, aplique tecidos
            nos modelos para orientar suas escolhas e adquirir os moldes de que dispomos em nossa base de dados, tudo
            com o objetivo de lhe apoiar a produzir artigos de vestuário com agilidade e padrão de qualidade. Nossos
            moldes estão disponíveis em diferentes tabelas de medidas com todos os tamanhos. Além disso, um mesmo modelo
            pode ser oferecido em diferentes opções de volume, de comprimento e\ou outros parâmetros para você escolher
            de forma personalizada o que melhor atende a sua linha de produtos e seu perfil de cliente. Confira:{' '}
            <a href="https://app.modacad.com.br" className="text-blue-500 hover:underline">
              app.modacad.com.br
            </a>
          </p>
        </section>

        {/* E, Por Fim */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">E, POR FIM:</h2>
          <p className="mb-4">
            Esse contrato, em conjunto com nosso aviso de privacidade, bem como suas posteriores alterações, regularão a
            nossa relação decorrente da sua assinatura de nosso portal. Caso você tenha dúvidas ou questões sobre a sua
            relação conosco, por favor entre em contato através do nosso site. No caso de controvérsias que a gente não
            possa resolver amigavelmente, fica eleito o foro da comarca de Belo Horizonte, Minas Gerais, para solução de
            demandas advindas deste contrato.
          </p>
        </section>
      </div>
      <Footer showContact showPlans />
    </div>
  );
};
