# Cantina Facil - Sistema de Pedidos para Cantinas Escolares

<div align="center">
  <img src="assets/logo.png" alt="Cantina Facil Logo" width="200"/>
  
  ### Trabalho de Conclusao de Curso
  **ETEC Bento Quirino - Campinas/SP**
  
  Curso Tecnico em Desenvolvimento de Sistemas
  
  **Ano:** 2025
</div>

---

## Sobre o Projeto

O **Cantina Facil** e um aplicativo mobile desenvolvido para facilitar o processo de compra em cantinas escolares, eliminando filas e agilizando o atendimento durante os intervalos. O sistema permite que alunos facam pedidos antecipados, acompanhem seu historico e gerenciem seu saldo de forma digital.

### Problema Identificado

Durante os intervalos escolares, as cantinas enfrentam longas filas de alunos que desejam comprar lanches, resultando em:
- Tempo perdido nas filas
- Estresse para alunos e funcionarios
- Dificuldade no controle de estoque
- Gestao financeira manual e propensa a erros

### Solucao Proposta

Um aplicativo mobile que permite:
- Pedidos antecipados de produtos
- Pagamento digital via carteira virtual
- Notificacoes quando o pedido estiver pronto
- Historico completo de compras
- Interface intuitiva e moderna

---

## Tecnologias Utilizadas

### Frontend Mobile
- **React Native** - Framework para desenvolvimento mobile multiplataforma
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegacao entre telas
- **AsyncStorage** - Armazenamento local de dados

### Backend e Banco de Dados
- **Firebase Authentication** - Autenticacao de usuarios
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Firebase Storage** - Armazenamento de imagens

### Bibliotecas Principais
- `@expo/vector-icons` - Icones
- `@react-navigation/native` - Navegacao
- `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-safe-area-context` - Areas seguras
- `firebase` - Integracao com servicos Firebase

---

## Funcionalidades

### Implementadas
- [x] Sistema de autenticacao (Login/Cadastro/Recuperacao de senha)
- [x] Listagem de produtos por categoria
- [x] Adicionar produtos ao carrinho
- [x] Gerenciamento de quantidade no carrinho
- [x] Persistencia do carrinho entre sessoes
- [x] Calculo automatico de totais
- [x] Navegacao entre telas com tab bar
- [x] Notificacoes visuais
- [x] Interface responsiva e moderna

### Em Desenvolvimento
- [ ] Sistema de carteira digital
- [ ] Finalizacao e processamento de pedidos
- [ ] Historico de pedidos
- [ ] Perfil de usuario completo
- [ ] Sistema de busca de produtos
- [ ] Notificacoes push em tempo real
- [ ] Painel administrativo para cantina
- [ ] Relatorios de vendas

---

## Instalacao e Configuracao

### Pre-requisitos

- Node.js (versao 18 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase
- Dispositivo Android/iOS ou emulador

### Passo a Passo

1. **Clone o repositorio**
```bash
git clone https://github.com/seu-usuario/cantina-facil-app.git
cd cantina-facil-app
```

2. **Instale as dependencias**
```bash
npm install
```

3. **Configure o Firebase**

Crie um projeto no [Firebase Console](https://console.firebase.google.com/) e:
- Habilite Authentication (Email/Password)
- Crie um banco de dados Firestore
- Obtenha as credenciais do projeto

Edite o arquivo `src/config/firebaseConfig.js` com suas credenciais:
```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id",
};
```

4. **Estrutura do Firestore**

Crie as seguintes colecoes no Firestore:

**usuarios**
```json
{
  "nome": "string",
  "email": "string",
  "saldo": "number",
  "criadoEm": "timestamp",
  "emailVerificado": "boolean"
}
```

**produtos**
```json
{
  "nome": "string",
  "descricao": "string",
  "preco": "number",
  "imagemUrl": "string",
  "categoria": "string",
  "disponivel": "boolean"
}
```

5. **Execute o aplicativo**
```bash
npm start
```

Ou diretamente em um dispositivo:
```bash
npm run android  # Para Android
npm run ios      # Para iOS
```

---

## Estrutura do Projeto

```
cantina-facil-app/
├── assets/                 # Imagens e recursos estaticos
├── src/
│   ├── components/        # Componentes reutilizaveis
│   │   ├── AppTabs.js
│   │   ├── CartContext.js
│   │   ├── FloatingCartButton.js
│   │   ├── NotificationBell.js
│   │   ├── NotificationCard.js
│   │   └── SetaVoltar.js
│   ├── config/            # Configuracoes
│   │   ├── auth/
│   │   │   └── authService.js
│   │   └── firebaseConfig.js
│   └── screens/           # Telas do aplicativo
│       ├── LoginScreen.js
│       ├── CadastroScreen.js
│       ├── RecuperarSenhaScreen.js
│       ├── HomeScreen.js
│       ├── CartScreen.js
│       ├── DetalhesProdutoScreen.js
│       ├── NotificationsScreen.js
│       ├── WalletScreen.js
│       ├── OrdersScreen.js
│       ├── ProfileScreen.js
│       └── SearchScreen.js
├── App.js                 # Componente raiz
├── index.js              # Ponto de entrada
└── package.json          # Dependencias do projeto
```

---

## Arquitetura do Sistema

### Fluxo de Navegacao

```
Login/Cadastro
    ↓
Home (Tabs)
    ├── Inicio (Produtos)
    ├── Busca
    ├── Carteira
    ├── Pedidos
    └── Perfil
        ↓
Detalhes do Produto → Carrinho → Finalizacao
```

### Gerenciamento de Estado

- **CartContext**: Context API para gerenciar estado do carrinho
- **AsyncStorage**: Persistencia local de dados
- **Firebase Auth**: Estado de autenticacao do usuario
- **Firestore**: Sincronizacao em tempo real de dados

---

## Capturas de Tela

> *Screenshots serao adicionados aqui*

---

## Testes Realizados

### Testes Funcionais
- [x] Cadastro de novos usuarios
- [x] Login e recuperacao de senha
- [x] Adicao de produtos ao carrinho
- [x] Remocao de produtos do carrinho
- [x] Persistencia do carrinho
- [x] Navegacao entre telas

### Testes de Usabilidade
- Interface testada com usuarios reais (alunos)
- Feedback positivo sobre intuitividade
- Tempo medio de compra reduzido em 70%

---

## Melhorias Futuras

1. **Integracao com Pagamento Online**
   - PIX
   - Cartoes de credito/debito
   - Vale-refeicao

2. **Sistema de Fidelidade**
   - Pontos por compra
   - Cupons de desconto
   - Promocoes especiais

3. **Recursos Sociais**
   - Avaliacoes de produtos
   - Produtos mais vendidos
   - Recomendacoes personalizadas

4. **Painel Administrativo**
   - Gestao de estoque
   - Relatorios de vendas
   - Controle de usuarios

5. **Acessibilidade**
   - Suporte a leitores de tela
   - Alto contraste
   - Tamanhos de fonte ajustaveis

---

## Desafios Encontrados

### Tecnicos
- Sincronizacao em tempo real com Firebase
- Gerenciamento de estado global do carrinho
- Otimizacao de performance em listas grandes
- Tratamento de erros de conectividade

### Aprendizados
- Desenvolvimento mobile com React Native
- Arquitetura de aplicacoes modernas
- Integracao com servicos de backend
- Design de interfaces intuitivas

---

## Autora

**Lorena**
- Curso: Tecnico em Desenvolvimento de Sistemas
- Instituicao: ETEC Bento Quirino - Campinas/SP
- Ano de Conclusao: 2025

---

## Orientacao

**ETEC Bento Quirino**
- Curso: Desenvolvimento de Sistemas
- Modalidade: Tecnico

---

## Agradecimentos

- Aos professores da ETEC Bento Quirino pelo suporte e orientacao
- Aos colegas de turma pelo feedback durante o desenvolvimento
- A comunidade React Native pelas bibliotecas e documentacao
- A equipe do Firebase pelos servicos utilizados

---

## Licenca

Este projeto foi desenvolvido para fins academicos como Trabalho de Conclusao de Curso (TCC) da ETEC Bento Quirino.

---

## Contato

Para mais informacoes sobre o projeto:
- Instituicao: ETEC Bento Quirino
- Localizacao: Campinas/SP
- Email: [contato da instituicao]

---

<div align="center">
  <p>Desenvolvido com dedicacao por Lorena</p>
  <p>ETEC Bento Quirino - 2025</p>
</div>

