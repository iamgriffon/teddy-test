export function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background-primary p-8">
      <h1 className="text-4xl font-bold text-theme-primary mb-8 md:text-5xl">
        Visão Geral do Projeto
      </h1>

      <div className="w-full max-w-4xl space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-theme-black mb-4">
            Cronograma de Desenvolvimento
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-theme-black">
              🚀 Tempo Total de Desenvolvimento: <strong>~4.5 dias</strong>
            </p>
            <p className="text-lg text-theme-black">
              ✅ Casos de Teste: <strong>69 (nice)</strong> cenários abrangentes
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-theme-black mb-4">
            Estatísticas da Base de Código
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-theme-primary">
                Estrutura do Frontend
              </h3>
              <p className="text-theme-black">
                34 arquivos entre componentes, páginas e stores
              </p>
              <p className="text-theme-black">~1.558 linhas de código</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-theme-primary">
                Serviços de Backend
              </h3>
              <p className="text-theme-black">
                26 arquivos dentre controllers, entities, testes e services
              </p>
              <p className="text-theme-black">~1.840 linhas de código</p>
            </div>

            <div className="col-span-full border-t pt-4">
              <p className="text-lg font-medium text-theme-primary">
                Escopo Total do Sistema
              </p>
              <p className="text-theme-black">
                ~60 arquivos | ~3.390 linhas no total
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-theme-black mb-4">
            Garantia de Qualidade
          </h2>
          <p className="text-theme-black">
            Cobertura de testes abrangente com Playwright (para o front), e Jest (para o back) incluindo:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-theme-black">
            <li>Testes unitários</li>
            <li>Testes de integração e de sistema</li>
            <li>Testes de operações CRUD</li>
            <li>Fluxos de autenticação de usuário</li>
            <li>Cenários de validação de formulários</li>
            <li>Interações de paginação e grades de dados</li>
            <li>Testes com persistência de dados</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border-2 border-theme-primary">
          <h2 className="text-2xl font-semibold text-theme-black mb-4">
            Por Que Me Contratar?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💻</span>
              <div>
                <h3 className="font-medium text-theme-primary">
                  Desenvolvimento Ágil e Eficiente
                </h3>
                <p className="text-theme-black">
                  Capaz de entregar projetos complexos em prazos curtos, como
                  demonstrado pelo desenvolvimento completo deste sistema em
                  apenas 4.5 dias.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏗️</span>
              <div>
                <h3 className="font-medium text-theme-primary">
                  Domínio Full Stack
                </h3>
                <p className="text-theme-black">
                  Experiência comprovada em desenvolvimento frontend e backend,
                  com capacidade de construir aplicações completas e escaláveis.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-medium text-theme-primary">
                  Foco em Qualidade
                </h3>
                <p className="text-theme-black">
                  Comprometimento com testes automatizados e boas práticas, como
                  clean code, garantindo código robusto e manutenível.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">📈</span>
              <div>
                <h3 className="font-medium text-theme-primary">
                  Resultados Mensuráveis
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-theme-black">
                  <li className="text-theme-black">
                    Histórico de entregas com métricas claras, adoção de padrões de projeto e documentação
                    abrangente do processo de desenvolvimento.
                  </li>
                  <li className="text-theme-black">
                    Desenvolvimento orientado a TDD, garantindo entregas que
                    funcionam de primeira (após testes, CR, QA e validação),
                    evitando retrabalho.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-medium text-theme-primary">
                  Uso de Inteligência Artificial
                </h3>
                <p className="text-theme-black">
                  Utilização de ferramentas como Cursor e Copilot para acelerar o desenvolvimento e garantir a qualidade do código.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="mailto:g.dupin@outlook.com"
                className="inline-block bg-theme-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-theme-primary/90 transition-colors"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
