# Guia Completo de Instalacao - Cantina Facil

Este guia detalha passo a passo como configurar e executar o aplicativo Cantina Facil.

---

## Indice
1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalacao do Node.js](#instalacao-do-nodejs)
3. [Instalacao do Expo CLI](#instalacao-do-expo-cli)
4. [Clone do Projeto](#clone-do-projeto)
5. [Instalacao de Dependencias](#instalacao-de-dependencias)
6. [Configuracao do Firebase](#configuracao-do-firebase)
7. [Executando o Projeto](#executando-o-projeto)
8. [Solucao de Problemas](#solucao-de-problemas)

---

## 1. Requisitos do Sistema

### Sistema Operacional
- Windows 10/11
- macOS 10.15 ou superior
- Linux (Ubuntu 20.04 ou superior)

### Software Necessario
- Node.js versao 18.x ou superior
- npm versao 9.x ou superior (incluido com Node.js)
- Git
- Editor de codigo (recomendado: VS Code)

### Para Executar no Celular
- Aplicativo Expo Go (disponivel na Play Store / App Store)
- Celular e computador na mesma rede Wi-Fi

### Para Executar em Emulador
- Android Studio (para Android)
- Xcode (para iOS - apenas macOS)

---

## 2. Instalacao do Node.js

### Windows
1. Acesse https://nodejs.org/
2. Baixe a versao LTS (recomendada)
3. Execute o instalador
4. Siga as instrucoes do assistente
5. Reinicie o terminal

### macOS
```bash
# Usando Homebrew
brew install node

# Ou baixe do site oficial
https://nodejs.org/
```

### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verificar Instalacao
```bash
node --version
npm --version
```

Deve exibir as versoes instaladas.

---

## 3. Instalacao do Expo CLI

```bash
npm install -g expo-cli
```

Verificar instalacao:
```bash
expo --version
```

---

## 4. Clone do Projeto

### Usando Git
```bash
git clone https://github.com/seu-usuario/cantina-facil-app.git
cd cantina-facil-app
```

### Ou Baixar ZIP
1. Acesse o repositorio no GitHub
2. Clique em "Code" > "Download ZIP"
3. Extraia o arquivo
4. Abra o terminal na pasta extraida

---

## 5. Instalacao de Dependencias

No diretorio do projeto:

```bash
npm install
```

Este comando instalara todas as bibliotecas necessarias listadas em `package.json`.

**Tempo estimado:** 2-5 minutos (dependendo da conexao)

### Dependencias Principais Instaladas
- react-native
- expo
- firebase
- react-navigation
- async-storage

---

## 6. Configuracao do Firebase

### Passo 1: Criar Projeto no Firebase

1. Acesse https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome do projeto: "Cantina Facil" (ou outro nome)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### Passo 2: Adicionar App

1. No console do Firebase, clique no icone de engrenagem > "Configuracoes do projeto"
2. Na aba "Geral", role ate "Seus apps"
3. Clique no icone "</>" (Web)
4. Apelido do app: "Cantina Facil App"
5. Clique em "Registrar app"
6. Copie as credenciais do `firebaseConfig`

### Passo 3: Habilitar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Comecar"
3. Na aba "Sign-in method"
4. Clique em "E-mail/senha"
5. Ative a primeira opcao (E-mail/senha)
6. Clique em "Salvar"

### Passo 4: Criar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (ou modo de producao com regras customizadas)
4. Escolha a localizacao mais proxima (southamerica-east1)
5. Clique em "Ativar"

### Passo 5: Configurar Credenciais no Projeto

Abra o arquivo `src/config/firebaseConfig.js` e substitua:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**IMPORTANTE:** Nunca compartilhe essas credenciais publicamente!

### Passo 6: Configurar Regras de Seguranca do Firestore

No console do Firebase > Firestore Database > Regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /produtos/{produto} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    match /pedidos/{pedido} {
      allow read, create: if request.auth != null;
      allow update: if false;
    }
  }
}
```

Clique em "Publicar".

### Passo 7: Popular Banco de Dados com Produtos

No Firestore Database, crie a colecao "produtos" e adicione alguns documentos:

**Exemplo de Produto:**
```json
{
  "nome": "Coxinha",
  "descricao": "Coxinha de frango tradicional",
  "preco": 5.50,
  "imagemUrl": "https://exemplo.com/coxinha.jpg",
  "categoria": "Salgados",
  "disponivel": true
}
```

Repita para varios produtos em diferentes categorias.

---

## 7. Executando o Projeto

### Metodo 1: No Celular com Expo Go

1. **Instale o Expo Go no celular**
   - Android: Play Store
   - iOS: App Store

2. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

3. **Escanear QR Code**
   - Android: Abra o Expo Go e escaneie o QR Code
   - iOS: Abra a Camera e escaneie o QR Code

**Importante:** Celular e computador devem estar na mesma rede Wi-Fi!

### Metodo 2: Em Emulador Android

1. **Instale Android Studio**
   - Baixe em https://developer.android.com/studio
   - Configure um emulador Android

2. **Inicie o emulador**

3. **Execute o projeto**
```bash
npm run android
```

### Metodo 3: Em Simulador iOS (apenas macOS)

1. **Instale Xcode**
   - Baixe na App Store

2. **Execute o projeto**
```bash
npm run ios
```

---

## 8. Solucao de Problemas

### Erro: "Module not found"
```bash
npm install
```

### Erro: "Metro Bundler failed"
```bash
# Limpar cache
expo start -c
```

### Erro: "Firebase not configured"
Verifique se configurou corretamente `src/config/firebaseConfig.js`

### Erro: "Network request failed"
- Verifique conexao com internet
- Celular e PC devem estar na mesma rede
- Desabilite VPN se estiver usando

### Porta 19000 em uso
```bash
# Matar processo na porta
# Windows
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:19000 | xargs kill -9
```

### Erro: "Unable to resolve module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install

# Limpar cache do npm
npm cache clean --force
```

### App nao abre no celular
1. Verifique se esta na mesma rede Wi-Fi
2. Desabilite firewall temporariamente
3. Tente usar o modo Tunnel:
```bash
expo start --tunnel
```

### Erro ao instalar dependencias no Windows
```bash
# Execute como administrador
npm install --legacy-peer-deps
```

---

## Comandos Uteis

### Desenvolvimento
```bash
npm start              # Inicia servidor de desenvolvimento
npm run android       # Executa no Android
npm run ios          # Executa no iOS
```

### Manutencao
```bash
npm install          # Instala dependencias
npm update          # Atualiza dependencias
expo upgrade        # Atualiza Expo SDK
```

### Limpeza
```bash
expo start -c       # Limpa cache do Metro
rm -rf node_modules # Remove modulos
npm cache clean --force # Limpa cache npm
```

---

## Proximos Passos

Apos executar o projeto com sucesso:

1. Crie uma conta de usuario no app
2. Adicione produtos no Firestore
3. Teste as funcionalidades
4. Explore o codigo fonte
5. Faça modificacoes

---

## Recursos Adicionais

### Documentacao Oficial
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- Firebase: https://firebase.google.com/docs

### Comunidade
- Stack Overflow
- Discord do React Native
- Forum do Expo

### Suporte
Para duvidas especificas deste projeto, abra uma issue no GitHub.

---

<div align="center">
  <p>Guia criado por Lorena - ETEC Bento Quirino</p>
  <p>Boa sorte com o desenvolvimento!</p>
</div>

