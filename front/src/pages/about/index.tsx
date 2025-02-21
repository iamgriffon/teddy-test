import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { text } from 'consts/text'
import {
  CloseIcon,
  WhatsappIcon,
  GmailIcon,
  GithubIcon
} from 'components/icons'
import { Button, Overlay } from 'components/ui'

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
          <div className="mb-5 flex h-auto w-[360px] flex-col items-center justify-center gap-4 rounded-md bg-white p-5">
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
                className="absolute right-0 top-1 cursor-pointer"
              />
            </p>
            <div className="mb-2 w-full border-b border-gray-200" />
            <Button
              className="flex h-10 items-center justify-center gap-2 bg-green-500 transition-colors duration-300 hover:bg-green-800/90"
              type="submit"
              onClick={copyWhatsapp}
            >
              <WhatsappIcon width={24} height={24} className="mr-2" />
              Chamar no WhatsApp
            </Button>
            <Button
              className="group flex h-10 items-center justify-center gap-2 border border-red-500 bg-white text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
              type="submit"
              onClick={copyEmail}
            >
              <div className="flex size-6 items-center justify-center rounded-full border-white p-1 transition-colors duration-300 group-hover:bg-white">
                <GmailIcon width={20} height={20} />
              </div>
              Me enviar um email
            </Button>
            <Button
              className="group flex h-10 items-center justify-center gap-2 border border-black bg-white text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
              type="button"
            >
              <GithubIcon
                width={20}
                height={20}
                className="transition-colors duration-300 group-hover:fill-white"
              />
              <a href="https://github.com/iamgriffon">Conferir meu Github</a>
            </Button>
          </div>
        </section>
      </Overlay>
    )
  }

  return (
    <div className="flex flex-col items-center h-[calc(100vh-180px)] bg-background-primary p-8">
      {form && <HireMeForm />}
      <h1 className="text-4xl font-bold text-theme-primary mb-8 md:text-5xl">
        Visão Geral do Projeto
      </h1>

      <div className="flex max-h-[calc(100vh-240px)] w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-theme-primary p-4">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-theme-black">
            Cronograma de Desenvolvimento
          </h2>
          <div className="space-y-2">
            <p className="text-lg text-theme-black">
              🚀 Tempo Total de Desenvolvimento: <strong>~4.5 dias</strong>
            </p>
            <p className="text-lg text-theme-black">
              ✅ Casos de Teste: <strong>84</strong> cenários abrangentes de
              teste (<strong>49</strong> de <strong>frontend</strong> e{' '}
              <strong>35</strong> de <strong>backend</strong>)
            </p>
            <p className="flex flex-col gap-2 py-4 text-lg text-theme-black">
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
              📝 Pull Requests: <strong>42</strong>
            </p>
            <p className="text-lg text-theme-black">
              ✏️ Commits: <strong>100</strong>
            </p>
            <p className="text-lg text-theme-black">
              🙏🏿 <strong>Nenhum</strong> commit foi feito direto na main
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

            <div className="col-span-full flex flex-col gap-2 border-t pt-4">
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
            Cobertura de testes abrangente com Playwright (para o front), e Jest
            (para o back) incluindo:
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

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-theme-black mb-4">
            Por que Me Contratar?
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
                  clean code, garantindo código robusto e manutenível. Além
                  disso, comprometimento com a elaboraçao de artefatos de
                  qualidade com documentação, testes e métricas claras.
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
                    Histórico de entregas com métricas claras, adoção de padrões
                    de projeto e documentação abrangente do processo de
                    desenvolvimento.
                  </li>
                  <li className="text-theme-black">
                    Desenvolvimento orientado a TDD, garantindo entregas que
                    funcionam de primeira (após testes locais, CR, QA e
                    validação), evitando retrabalho.
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
              <Button
                onClick={() => setForm(true)}
                className="w-auto inline-block bg-theme-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-theme-primary/90 transition-colors"
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
