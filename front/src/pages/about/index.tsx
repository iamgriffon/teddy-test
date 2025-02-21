import { Button } from 'components/ui/button'
import { Overlay } from 'components/ui/overlay'
import { useCallback, useState } from 'react'
import {
  GmailIcon,
  WhatsappIcon,
  GithubIcon,
  CloseIcon
} from 'components/icons'
import { toast } from 'react-toastify'
import { text } from 'consts/text'

export function About() {
  const [form, setForm] = useState(false)

  const copyEmail = useCallback(() => {
    try {
      navigator.clipboard.writeText('g.dupin@outlook.com')
      toast.success(text.COPY_EMAIL_SUCCESS)
    } catch {
      toast.error(text.COPY_EMAIL_ERROR)
    }
  }, [])

  const copyWhatsapp = useCallback(() => {
    try {
      navigator.clipboard.writeText('5511947085393')
      toast.success(text.COPY_WHATSAPP_SUCCESS)
    } catch {
      toast.error(text.COPY_WHATSAPP_ERROR)
    }
  }, [])

  const HireMeForm = () => {
    return (
      <Overlay>
        <section className="flex size-full flex-col items-center justify-center">
          <div className="mb-5 flex items-center h-auto w-[360px] flex-col justify-center gap-4 rounded-md bg-white p-5">
            <p className="relative flex w-full items-center justify-between">
              <span
                className="text-lg font-bold"
                data-testid="client-form-title"
              >
                Você deseja me contratar?
              </span>
              <CloseIcon
                width={18}
                height={18}
                onClick={() => setForm(false)}
                className="cursor-pointer absolute right-0 top-1"
              />
            </p>
            <div className="w-full border-b border-gray-200 mb-2" />
            <Button
              className="flex h-10 items-center justify-center gap-2 bg-green-500 hover:bg-green-800/90 transition-colors duration-300"
              type="submit"
              onClick={copyWhatsapp}
            >
              <WhatsappIcon width={24} height={24} className="mr-2" />
              Chamar no WhatsApp
            </Button>
            <Button
              className="group flex h-10 items-center justify-center gap-2 bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
              type="submit"
              onClick={copyEmail}
            >
              <div className="flex h-6 w-6 items-center p-1 justify-center rounded-full border-white group-hover:bg-white transition-colors duration-300">
                <GmailIcon width={20} height={20} />
              </div>
              Me enviar um email
            </Button>
            <Button
              className="group flex h-10 items-center justify-center gap-2 bg-white border text-black border-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
              type="button"
            >
              <GithubIcon
                width={20}
                height={20}
                className="group-hover:fill-white transition-colors duration-300"
              />
              <a href="https://github.com/iamgriffon">Conferir meu Github</a>
            </Button>
          </div>
        </section>
      </Overlay>
    )
  }

  return (
    <div className="flex flex-col items-center bg-background-primary">
      {form && <HireMeForm />}
      <h1 className="mb-8 text-4xl font-bold text-theme-primary md:text-5xl">
        Visão Geral do Projeto
      </h1>

      <div className="w-full flex flex-col gap-4 max-h-[calc(100vh-240px)] rounded-lg border border-theme-primary p-4 overflow-y-scroll">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-theme-black">
            Cronograma de Desenvolvimento
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-theme-black">
              🚀 Tempo Total de Desenvolvimento: <strong>~5 dias</strong>
            </p>
            <p className="text-lg text-theme-black">
              ✅ Casos de Teste: <strong>84</strong> cenários abrangentes de
              teste (<strong>49</strong> de <strong>frontend</strong> e{' '}
              <strong>35</strong> de <strong>backend</strong>)
            </p>
            <p className="text-lg text-theme-black flex flex-col gap-2 py-4">
              <span className="text-lg text-theme-black">
                🗓 Data do primeiro commit: <strong>16/02/2025</strong>
              </span>
              <span className="text-lg text-theme-black">
                🗓 Data da entrega: <strong>18/02/2025</strong>
              </span>
              <span className="text-lg text-theme-black">
                🗓 Data da entrega final: <strong>21/02/2025</strong>
              </span>
            </p>
            <p className="text-lg text-theme-black">
              🔍 Issues: <strong>30</strong>
            </p>
            <p className="text-lg text-theme-black">
              📝 Pull Requests: <strong>41</strong>
            </p>
            <p className="text-lg text-theme-black">
              ✏️ Commits: <strong>100</strong>
            </p>
            <p className="text-lg text-theme-black">
              🙏🏿 <strong>Nenhum</strong> commit foi feito direto na main
            </p>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-theme-black">
            Estatísticas da Base de Código
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-theme-primary">
                Estrutura do Frontend
              </h3>
              <p className="text-theme-black">
                96 arquivos entre componentes, páginas, consts, interfaces,
                stores, utils e testes
              </p>
              <p className="text-theme-black">3.524 linhas de código</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-theme-primary">
                Serviços de Backend
              </h3>
              <p className="text-theme-black">
                38 arquivos dentre controllers, entities, testes e services
              </p>
              <p className="text-theme-black">1.906 linhas de código</p>
            </div>

            <div className="col-span-full border-t pt-4 flex flex-col gap-2">
              <p className="text-lg font-medium text-theme-primary">
                Escopo Total do Sistema
              </p>
              <p className="text-theme-black">
                134 arquivos | 5.448 linhas no total
              </p>
              <p className="text-gray-500">
                Média de <strong>40.6</strong> linhas por arquivo
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-theme-black">
            Garantia de Qualidade
          </h2>
          <p className="text-theme-black">
            Cobertura de testes abrangente com Playwright (para o front), e Jest
            (para o back) incluindo:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-theme-black">
            <li>Testes unitários</li>
            <li>Testes de integração e de sistema</li>
            <li>Testes de operações CRUD</li>
            <li>Fluxos de autenticação de usuário</li>
            <li>Cenários de validação de formulários</li>
            <li>Interações de paginação e grades de dados</li>
            <li>Testes com persistência de dados</li>
          </ul>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-theme-black">
            Por que me contratar?
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
                  apenas 5 dias.
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
                  Experiência comprovada em desenvolvimento devops, frontend e
                  backend, com capacidade de construir aplicações completas e
                  escaláveis. Bem como a elaboração de artefatos de qualidade
                  como documentação e testes.
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
                <ul className="mt-2 list-inside list-disc space-y-1 text-theme-black">
                  <li className="text-theme-black">
                    Histórico de entregas com métricas claras, adoção de padrões
                    de projeto e documentação abrangente do processo de
                    desenvolvimento.
                  </li>
                  <li className="text-theme-black">
                    Desenvolvimento orientado a TDD, garantindo entregas que
                    funcionam de primeira (após testes locais, CR, QA e validação),
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
                  Utilização de ferramentas como Cursor e Copilot para acelerar
                  o desenvolvimento e garantir a qualidade do código.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setForm(true)}
                className="inline-block rounded-lg bg-theme-primary px-6 py-3 font-medium text-white transition-colors hover:bg-theme-primary/90"
              >
                Entre em Contato
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
