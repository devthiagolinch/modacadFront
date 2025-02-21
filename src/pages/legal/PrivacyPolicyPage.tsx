import { Footer } from '../../shared/components/footer/footer';
import { PublicHeader } from '../../shared/components/header/public-header/PublicHeader';

export const PrivacyPolicyPage = () => {
  return (
    <div>
      <PublicHeader />
      <div className="max-w-4xl mx-auto p-6 text-gray-700 font-montserrat">
        <header className="text-center mb-8">
          <h1 className="text-xl text-gray-600 mt-2">POLÍTICA DE PRIVACIDADE E COOKIES</h1>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="mb-4">
            Segurança e privacidade são requisitos básicos da nossa operação. Saiba como lidamos com os seus dados e não
            deixe de entrar em contato conosco no caso de qualquer dúvida adicional.
          </p>
        </section>

        {/* Quais Dados Coletamos */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">QUAIS DADOS COLETAMOS E QUANDO FAZEMOS ISSO</h2>
          <p className="mb-4">
            Caso você deseje se tornar um membro assinante do nosso portal, será necessário criar um perfil de acesso
            que possa lhe identificar e lhe conceder o acesso conforme o plano que desejar contratar. Para a sua
            assinatura se concretizar, será necessário informar seu nome, seu e-mail (dados para perfil de acesso ao
            portal), e criar uma senha (senha de acesso). Sua senha deverá ser criada por você no primeiro acesso, e
            será utilizada para validar cada acesso seu ao sistema, como forma de identificação de que seu perfil estará
            sendo usado por você. Atenção: sua senha é de uso pessoal e intransferível.
          </p>
          <p className="mb-4">
            Além da possibilidade de se tornar membro assinante do nosso portal, a Modacad oferece mais soluções e
            produtos para confeccionistas. Caso você deseje efetuar compras de nossas soluções e produtos, será
            necessário informar dados adicionais como: nome completo ou razão social, número de telefone com código de
            área, endereço completo com CEP, CPF ou CNPJ, inscrição estadual e municipal e dados adicionais
            eventualmente necessários para emissão de Nota Fiscal.
          </p>
          <p className="mb-4">
            Quando você efetua uma compra, são coletados dados sobre o endereço IP do aparelho usado para o acesso, data
            e a sua localização. Isso é essencial para a segurança dos acessos e para registro das transações realizadas
            em nosso sistema.
          </p>
          <p className="mb-4">
            Nós poderemos suspender ou inativar o seu perfil de acesso no caso de suspeita de fraudes e uso indevido do
            portal e/ou nossos produtos e/ou soluções, sem que tenhamos que justificar tal ação. Nós poderemos também
            suspender os serviços prestados por motivos técnicos. Eventuais ataques por terceiros, dos quais não estamos
            livres, serão considerados eventos de força maior para todos os efeitos, significando que nós não poderemos
            ser responsabilizados pelo ato praticado pelo terceiro.
          </p>
          <p className="mb-4">
            Importante: a Modacad utiliza solução terceirizada para viabilizar os pagamentos em nosso portal. Isso quer
            dizer que nós não mantemos os dados usados para viabilizar pagamentos, como número de cartão de crédito e
            afins. A empresa de pagamento que contratamos é responsável por todo o trâmite. Independentemente disso, a
            equipe da Modacad está à sua disposição naquilo em que puder contribuir para informar e facilitar seu
            processo de pagamento. Entre em contato conosco caso tenha qualquer dificuldade.
          </p>
        </section>

        {/* Como Usamos as Informações */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">COMO USAMOS AS INFORMAÇÕES QUE COLETAMOS</h2>
          <p className="mb-4">Nós usamos os dados que coletamos para:</p>
          <ul className="list-disc pl-8 mb-4">
            <li className="mb-2">criar seu acesso personalizado garantindo privacidade no uso do nosso sistema;</li>
            <li className="mb-2">reconhecer e registrar suas compras;</li>
            <li className="mb-2">emitir a Nota Fiscal de suas compras;</li>
            <li className="mb-2">disponibilizar a forma de pagamento de sua escolha;</li>
            <li className="mb-2">liberar seu acesso ao portal de acordo com o plano escolhido;</li>
            <li className="mb-2">fazer a entrega de seus produtos;</li>
            <li className="mb-2">reconhecer e registrar seus contatos conosco;</li>
            <li className="mb-2">enviar informações de seu interesse, caso assim você permita.</li>
          </ul>
          <p className="mb-4">
            Usamos ainda seus dados para enviar manter contato com você, respondendo suas dúvidas e solicitações.
            Informamos que podemos analisar os dados que coletamos, inclusive fazendo checagem de crédito adicional
            àquela realizada pela empresa terceirizada de pagamentos.
          </p>
          <p className="mb-4">
            Nós podemos também usar seus dados para te informar sobre alterações neste aviso de privacidade, termos e
            condições de uso, alterações de preços, serviços, soluções e produtos. Nesses casos, você sempre terá a
            oportunidade de concordar ou não com as alterações e de inativar seu perfil de acesso de acesso ao portal.
          </p>
          <p className="mb-4">
            Mediante sua autorização, poderemos utilizar seus dados para o envio de informações que entendemos ser de
            seu interesse, como: desenvolvimento de novos produtos e serviços, aumento, melhoria ou modificação de nosso
            portal/plataformas, operação e expansão de atividades, atualizações dos mostruários, lançamentos e
            promoções.
          </p>
          <p className="mb-4">
            O portal Modacad não possui cookies próprios. No entanto, nós utilizamos ferramentas de terceiros dentro de
            nossa operação, como o já citado sistema de pagamento, sistema para montagem e manutenção do portal,
            servidores e host de hospedagem. Nós também usamos serviços de terceiros que nos permitem avaliar,
            anonimamente, o funcionamento do nosso portal e de nossos sistemas. Tais ferramentas podem incluir coletas
            dados de rede e acesso, defeitos e erros de funcionamento do sistema, de suas funcionalidades e aplicações.
            Esses dados são usados para garantir que nós possamos fazer as alterações e mudanças necessárias para que
            você obtenha sempre as melhores tecnologias e funcionalidades durante a navegação em nosso portal e/ou uso
            das nossas ferramentas. Para colher esses dados, as empresas que contratamos podem usar diferentes
            tecnologias de medição e captura de dados, inclusive cookies.
          </p>
        </section>

        {/* Quem Pode Receber as Informações */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">QUEM PODE RECEBER AS INFORMAÇÕES QUE COLETAMOS</h2>
          <p className="mb-4">
            Nós não divulgaremos seus dados pessoais ou de suas compras a não ser que essa divulgação (i) seja
            necessária para o funcionamento do portal e/ou nossos sistemas, (ii) seja obrigatória segundo a legislação
            brasileira, ou (iii) seja determinada judicialmente.
          </p>
          <p className="mb-4">
            Além disso, nós poderemos divulgar suas informações para parceiros, fornecedores e subcontratados, mediante
            compromisso destes de não divulgação, para permitir que nós possamos oferecer a você a melhor experiência
            com nosso sistema, como dissemos no item anterior. Nós nos comprometemos a utilizar toda a tecnologia e
            esforços para que as compras e demais atividades desenvolvidas por você em nosso portal e/ou sistemas sejam
            absolutamente seguras e sigilosas. Esse é o nosso propósito.
          </p>
        </section>

        {/* Atualizações de Sistema */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">ATUALIZAÇÕES DE SISTEMA</h2>
          <p className="mb-4">
            Já que nosso compromisso é de te oferecer o melhor sistema que pudermos, vamos sempre buscar novas
            tecnologias e funcionalidades. Por isso, de tempos em tempos teremos que atualizar tanto nosso portal e/ou
            sistemas quanto este aviso de privacidade e/ou termos e condições de uso.
          </p>
          <p className="mb-4">
            Sempre que formos fazer atualizações em nosso portal e/ou sistemas, dos nossos termos e condições de uso ou
            aviso de privacidade, nós vamos te enviar mensagens para te avisar, seja via sistema, e-mail ou outra
            tecnologia disponível à época. Ao aceitar este aviso de privacidade você concorda em receber esses avisos,
            pois eles são a forma de garantir que você seja sempre comunicado(a) de atualizações importantes.
          </p>
          <p className="mb-4">
            Você poderá concordar com os novos termos e condições de uso e/ou aviso de privacidade ou não. Caso não
            concorde, nós garantimos que você terá sempre a opção de inativar seu perfil de acesso ao portal e/ou nossos
            sistemas.
          </p>
        </section>

        {/* Inativando Seu Perfil de Acesso */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">INATIVANDO SEU PERFIL DE ACESSO AO SISTEMA</h2>
          <p className="mb-4">
            Conforme informado acima, caso você assim decida, poderá inativar o recebimento de e-mails ou comunicações
            nossas a partir do link que incluímos em cada e-mail com este propósito, denominado “cancelar minha
            inscrição”. Essa função irá retirar o seu e-mail da nossa lista de contatos, mas não irá inativar seu perfil
            de acesso ao nosso sistema.
          </p>
          <p className="mb-4">
            Seu perfil de acesso ao sistema poderá ser inativado por sua iniciativa, a qualquer tempo. Basta nos
            encaminhar um pedido e nós faremos isso em até 48 (quarenta e oito) horas. Nós poderemos inativar o seu
            perfil, desde que te avisemos com 15 (quinze) dias de antecedência. Nós também poderemos bloquear ou
            cancelar seu perfil de acesso a qualquer momento, no caso de suspeita de uso não autorizado, fraudulento ou
            em desacordo com estes termos e condições de uso e também em casos de interdição ou falecimento.
          </p>
        </section>

        {/* Final */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Ficou com alguma dúvida adicional?</h2>
          <p className="mb-4">
            Estamos à sua disposição para esclarecer! Entre em contato conosco através do{' '}
            <a href="#fale-conosco" className="text-blue-500 hover:underline">
              fale conosco
            </a>{' '}
            em nosso site ou, ainda, através do e-mail{' '}
            <a href="mailto:telmabarcellos@modacad.com.br" className="text-blue-500 hover:underline">
              telmabarcellos@modacad.com.br
            </a>
            .
          </p>
        </section>
      </div>
      <Footer showContact showPlans />
    </div>
  );
};
