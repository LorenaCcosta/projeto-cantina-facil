# Documentacao Tecnica - Cantina Facil

## Indice
1. [Visao Geral](#visao-geral)
2. [Arquitetura](#arquitetura)
3. [Componentes Principais](#componentes-principais)
4. [Fluxos de Dados](#fluxos-de-dados)
5. [API Firebase](#api-firebase)
6. [Seguranca](#seguranca)
7. [Performance](#performance)

---

## Visao Geral

O Cantina Facil e uma aplicacao mobile desenvolvida com React Native e Expo, utilizando Firebase como backend. A arquitetura segue o padrao de componentes funcionais do React com hooks para gerenciamento de estado.

### Stack Tecnologica

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| Framework | React Native | 0.79.5 |
| Plataforma | Expo | ~53.0.17 |
| Linguagem | JavaScript | ES6+ |
| Backend | Firebase | 11.10.0 |
| Navegacao | React Navigation | 7.x |
| Estado | Context API + Hooks | - |
| Persistencia | AsyncStorage | 1.24.0 |

---

## Arquitetura

### Padrao Arquitetural

O projeto segue uma arquitetura baseada em componentes com separacao de responsabilidades:

```
┌─────────────────────────────────────┐
│         Camada de Apresentacao      │
│    (Screens + Components)           │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Camada de Logica de Negocio   │
│    (Context API + Custom Hooks)    │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Camada de Servicos          │
│    (Firebase Services)              │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Camada de Dados             │
│    (Firestore + AsyncStorage)       │
└─────────────────────────────────────┘
```

### Estrutura de Pastas

```
src/
├── components/         # Componentes reutilizaveis
│   ├── AppTabs.js     # Navegacao por abas
│   ├── CartContext.js # Context do carrinho
│   └── ...
├── config/            # Configuracoes
│   ├── auth/          # Servicos de autenticacao
│   └── firebaseConfig.js
└── screens/           # Telas da aplicacao
    ├── HomeScreen.js
    └── ...
```

---

## Componentes Principais

### 1. CartContext

**Responsabilidade:** Gerenciar o estado global do carrinho de compras

**Funcoes Exportadas:**
```javascript
{
  items: Array,           // Produtos no carrinho
  addItem: Function,      // Adiciona produto
  updateQuantity: Function, // Atualiza quantidade
  removeItem: Function,   // Remove produto
  clear: Function,        // Limpa carrinho
  count: Number,          // Total de itens
  total: Number          // Valor total
}
```

**Persistencia:**
- Utiliza AsyncStorage para salvar estado
- Chave: `@cantina_facil:cart`
- Formato: JSON stringificado

**Implementacao:**
```javascript
const carregarCarrinho = async () => {
  const dados = await AsyncStorage.getItem(CART_STORAGE_KEY);
  if (dados) setItems(JSON.parse(dados));
};

useEffect(() => {
  if (carregado) salvarCarrinho();
}, [items, carregado]);
```

### 2. FloatingCartButton

**Responsabilidade:** Botao flutuante de acesso ao carrinho

**Caracteristicas:**
- Badge com contador de itens
- Posicionamento adaptativo (considera tab bar)
- Oculta-se automaticamente quando vazio
- Elevacao e sombra para destaque

**Calculo de Posicao:**
```javascript
const TAB_BAR_HEIGHT = 60;
const extraBottom = isInsideTabs ? TAB_BAR_HEIGHT : 0;
const bottom = insets.bottom + extraBottom + 16;
```

### 3. AppTabs

**Responsabilidade:** Navegacao principal com tabs

**Estrutura:**
```
Tabs
├── Inicio (HomeStack)
│   ├── HomeRoot
│   ├── Notificacoes
│   └── DetalheProduto
├── Busca
├── Carteira
├── Pedidos
└── Perfil
```

---

## Fluxos de Dados

### Fluxo de Autenticacao

```
1. Usuario insere credenciais
   ↓
2. LoginScreen chama loginUsuario()
   ↓
3. authService.js → Firebase Auth
   ↓
4. Retorno: User Object ou Error
   ↓
5. Navegacao para Tabs ou Exibicao de Erro
```

### Fluxo de Adicao ao Carrinho

```
1. Usuario clica em "Adicionar ao Carrinho"
   ↓
2. DetalhesProdutoScreen chama addItem(produto, qtd)
   ↓
3. CartContext atualiza estado
   ↓
4. useEffect detecta mudanca
   ↓
5. AsyncStorage salva novo estado
   ↓
6. FloatingCartButton atualiza badge
```

### Fluxo de Carregamento de Produtos

```
1. HomeScreen monta
   ↓
2. useEffect executa getDocs(collection(db, "produtos"))
   ↓
3. Firestore retorna snapshot
   ↓
4. Filtra produtos disponiveis
   ↓
5. Agrupa por categoria
   ↓
6. Divide em grades de 3 colunas
   ↓
7. Atualiza estado sections
   ↓
8. SectionList renderiza
```

---

## API Firebase

### Authentication

**Metodos Utilizados:**
- `createUserWithEmailAndPassword()` - Cadastro
- `signInWithEmailAndPassword()` - Login
- `sendPasswordResetEmail()` - Recuperacao de senha
- `sendEmailVerification()` - Verificacao de email
- `signOut()` - Logout

### Firestore

**Colecoes:**

#### usuarios
```javascript
{
  nome: string,
  email: string,
  saldo: number,
  criadoEm: ISO8601,
  emailVerificado: boolean
}
```

#### produtos
```javascript
{
  nome: string,
  descricao: string,
  preco: number,
  imagemUrl: string,
  categoria: string,
  disponivel: boolean
}
```

**Queries Utilizadas:**

```javascript
// Buscar produtos disponiveis
const snap = await getDocs(collection(db, "produtos"));
const produtos = snap.docs
  .map(d => ({ id: d.id, ...d.data() }))
  .filter(p => p.disponivel);

// Buscar dados do usuario
const snap = await getDoc(doc(db, "usuarios", uid));
const userData = snap.data();
```

---

## Seguranca

### Autenticacao

- Email e senha hasheados pelo Firebase Auth
- Tokens JWT renovados automaticamente
- Sessoes persistem entre aberturas do app

### Firestore Rules (Recomendadas)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios podem ler apenas seus proprios dados
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Produtos sao publicos para leitura
    match /produtos/{produto} {
      allow read: if request.auth != null;
      allow write: if false; // Apenas admin via console
    }
    
    // Pedidos pertencem ao usuario
    match /pedidos/{pedido} {
      allow read, create: if request.auth != null && 
                             request.auth.uid == request.resource.data.usuarioId;
      allow update: if false; // Apenas admin
    }
  }
}
```

### Validacoes

- Email validado no frontend e backend
- Senha minima de 6 caracteres (Firebase)
- Sanitizacao de inputs (trim, toLowerCase)
- Tratamento de erros especificos

---

## Performance

### Otimizacoes Implementadas

1. **useMemo para calculos pesados**
```javascript
const count = useMemo(
  () => items.reduce((acc, it) => acc + it.qtd, 0),
  [items]
);
```

2. **FlatList e SectionList**
- Renderizacao lazy de listas
- keyExtractor para performance
- Virtualizacao automatica

3. **AsyncStorage Assincrono**
- Operacoes nao bloqueiam UI
- Try/catch para resiliencia

4. **Firebase Caching**
- Cache automatico do Firestore
- Modo offline suportado

### Metricas Esperadas

| Metrica | Valor |
|---------|-------|
| Tempo de inicializacao | < 2s |
| Carregamento de produtos | < 1s |
| Adicao ao carrinho | Instantaneo |
| Navegacao entre telas | < 300ms |

---

## Tratamento de Erros

### Estrategia

```javascript
try {
  await operacao();
} catch (error) {
  if (error.code === "auth/network-request-failed") {
    Alert.alert("Erro de rede", "Verifique sua conexao");
  } else if (error.code === "auth/user-not-found") {
    setErro("Usuario nao encontrado");
  } else {
    Alert.alert("Erro", "Tente novamente");
    console.error(error);
  }
}
```

### Codigos de Erro Comuns

| Codigo | Descricao | Tratamento |
|--------|-----------|------------|
| auth/invalid-email | Email invalido | Mensagem ao usuario |
| auth/user-disabled | Usuario desativado | Contatar suporte |
| auth/wrong-password | Senha incorreta | Permitir nova tentativa |
| auth/network-request-failed | Sem internet | Verificar conexao |
| permission-denied | Sem permissao Firestore | Revisar rules |

---

## Testes

### Casos de Teste

1. **Autenticacao**
   - Cadastro com sucesso
   - Login com credenciais validas
   - Login com credenciais invalidas
   - Recuperacao de senha

2. **Carrinho**
   - Adicionar produto
   - Atualizar quantidade
   - Remover produto
   - Persistencia apos fechar app

3. **Navegacao**
   - Transicao entre tabs
   - Stack navigation
   - Volta para telas anteriores

### Ferramentas Sugeridas

- **Jest** - Unit tests
- **React Native Testing Library** - Component tests
- **Detox** - E2E tests
- **Firebase Emulator** - Backend tests

---

## Manutencao e Evolucao

### Logs

Implementar sistema de logs:
```javascript
import { analytics } from './config/firebaseConfig';

// Log de eventos importantes
analytics.logEvent('produto_adicionado', {
  produto_id: produto.id,
  categoria: produto.categoria,
  preco: produto.preco
});
```

### Monitoramento

- Firebase Crashlytics para crashes
- Firebase Performance para metricas
- Firebase Analytics para comportamento de usuario

---

<div align="center">
  <p>Documentacao Tecnica v1.0</p>
  <p>Ultima atualizacao: Outubro 2025</p>
</div>

