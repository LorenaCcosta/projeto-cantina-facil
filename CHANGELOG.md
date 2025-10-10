# Historico de Alteracoes - Cantina Facil

Todas as mudancas notaveis neste projeto serao documentadas neste arquivo.

---

## [1.0.0] - 2025-10-10

### Adicionado
- Estrutura inicial do projeto com React Native e Expo
- Sistema completo de autenticacao (Login, Cadastro, Recuperacao de senha)
- Tela inicial com listagem de produtos por categoria
- Sistema de carrinho de compras funcional
- Navegacao com tabs e stacks
- Persistencia de dados com AsyncStorage
- Integracao com Firebase (Auth + Firestore)
- Botao flutuante do carrinho com contador
- Notificacoes visuais
- Componentes reutilizaveis (SetaVoltar, NotificationBell, NotificationCard)

### Implementado
- `CartContext` - Gerenciamento global do carrinho
- `FloatingCartButton` - Botao de acesso rapido ao carrinho
- `AppTabs` - Navegacao principal do aplicativo
- `HomeScreen` - Listagem de produtos com categorias
- `CartScreen` - Tela do carrinho com controles de quantidade
- `DetalhesProdutoScreen` - Detalhes e adicao de produtos
- `LoginScreen` - Autenticacao de usuarios
- `CadastroScreen` - Registro de novos usuarios
- `RecuperarSenhaScreen` - Recuperacao de senha por email
- `NotificationsScreen` - Central de notificacoes

### Configurado
- Firebase Authentication
- Firebase Firestore
- React Navigation (Stack + Tabs)
- AsyncStorage para persistencia local
- Estrutura de componentes e telas

---

## [0.9.0] - 2025-10-10 (Branch: fix/ajustes-pontos-abertos)

### Corrigido
- Bug critico: `addItem()` sem parametro em DetalhesProdutoScreen
- Nomenclatura duplicada em ProfileScreen (ProfileScreenScreen → ProfileScreen)
- Texto incorreto em botao de RecuperarSenhaScreen (era "Entrar", agora "Recuperar Senha")
- MarginLeft hardcoded removido de HomeScreen

### Melhorado
- CartContext agora possui funcao `updateQuantity()`
- Implementada persistencia do carrinho com AsyncStorage
- CartScreen com controles de quantidade (+/-)
- FloatingCartButton agora exibe badge com contador
- FloatingCartButton se oculta quando carrinho esta vazio
- Formato de moeda padronizado em toda aplicacao (pt-BR)
- Melhor organizacao de estilos

### Adicionado
- Estrutura Firebase completa (firebaseConfig.js e authService.js)
- Documentacao de configuracao do Firebase (README.md)
- Funcao `total` calculada no CartContext
- Icones melhorados no CartScreen (lixeira para remover)

### Removido
- Estilos nao utilizados em DetalhesProdutoScreen

---

## [0.5.0] - 2025-10-XX (Versao Inicial)

### Adicionado
- Estrutura basica do projeto
- Telas principais criadas
- Navegacao basica implementada
- Integracao inicial com Firebase
- Layout e design das telas

---

## Proximas Versoes (Roadmap)

### [1.1.0] - Previsto
- [ ] Sistema completo de pedidos
- [ ] Carteira digital funcional
- [ ] Historico de pedidos
- [ ] Perfil de usuario completo
- [ ] Sistema de busca de produtos
- [ ] Notificacoes push em tempo real

### [1.2.0] - Previsto
- [ ] Painel administrativo web
- [ ] Relatorios de vendas
- [ ] Gestao de estoque
- [ ] Sistema de promocoes
- [ ] Cupons de desconto

### [2.0.0] - Futuro
- [ ] Integracao com pagamentos online (PIX, cartao)
- [ ] Sistema de fidelidade
- [ ] Avaliacoes de produtos
- [ ] Modo offline completo
- [ ] Suporte a multiplas cantinas
- [ ] Recursos de acessibilidade

---

## Formato

Este changelog segue as convencoes de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

### Tipos de Mudancas
- **Adicionado** - Para novas funcionalidades
- **Alterado** - Para mudancas em funcionalidades existentes
- **Depreciado** - Para funcionalidades que serao removidas
- **Removido** - Para funcionalidades removidas
- **Corrigido** - Para correcoes de bugs
- **Seguranca** - Para vulnerabilidades corrigidas

---

<div align="center">
  <p>Mantido por Lorena - ETEC Bento Quirino</p>
</div>

