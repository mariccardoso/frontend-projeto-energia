# Imagem base com Node.js (versão estável)
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do código para o container
COPY . .

# Compila a aplicação Next.js para produção
RUN npm run build

# Expõe a porta que o Next.js vai usar (padrão 3000)
EXPOSE 3000

# Comando para iniciar a aplicação em modo produção
CMD ["npm", "start"]
