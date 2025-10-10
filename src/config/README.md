# Configuracao Firebase

## Configuracao Inicial

Para configurar o Firebase no projeto, siga os passos:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite Authentication (Email/Password)
3. Crie um banco de dados Firestore
4. Obtenha as credenciais do projeto

## Configuracao das Credenciais

### Opcao 1: Usar pasta firebase (ignorada pelo git)

Crie uma pasta `firebase/` na raiz do projeto (ela esta no .gitignore) e copie os arquivos desta pasta para la.

### Opcao 2: Editar arquivos desta pasta

Abra o arquivo `src/config/firebaseConfig.js` e substitua os valores das constantes:

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

**IMPORTANTE:** Se optar pela opcao 2, tenha cuidado para nao commitar suas credenciais reais!

## Estrutura do Firestore

### Colecao: usuarios
```
usuarios/{uid}
  - nome: string
  - email: string
  - saldo: number
  - criadoEm: string (ISO)
  - emailVerificado: boolean
```

### Colecao: produtos
```
produtos/{id}
  - nome: string
  - descricao: string
  - preco: number
  - imagemUrl: string
  - categoria: string
  - disponivel: boolean
```

### Colecao: pedidos (futura implementacao)
```
pedidos/{id}
  - usuarioId: string
  - items: array
  - total: number
  - status: string
  - criadoEm: string (ISO)
```

## Atualizando os Imports

Os arquivos do projeto ja estao configurados para importar de duas localizacoes possiveis:

1. `../../firebase/firebaseConfig` (pasta na raiz, ignorada pelo git)
2. `../../src/config/firebaseConfig` (esta pasta, versionada)

Se usar a pasta firebase na raiz, ela tem prioridade. Caso contrario, o fallback e esta pasta.

