# Configuração do Widget de Status do Discord

## Como Obter Seu Discord ID

1. **Ative o Modo de Desenvolvedor no Discord:**
   - Abra Discord
   - Vá para **Configurações de Usuário** → **Avançado**
   - Ative **Modo de Desenvolvedor**

2. **Copie Seu ID:**
   - Clique com botão direito no seu nome de usuário
   - Selecione **Copiar ID de Usuário**

## Configurar o Portfólio

1. Abra o arquivo `src/sections/Header.tsx`

2. Localize a linha:
   ```jsx
   <DiscordStatusWidget userId="SEU_DISCORD_ID_AQUI" showActivity={true} />
   ```

3. Substitua `SEU_DISCORD_ID_AQUI` pelo seu ID do Discord. Exemplo:
   ```jsx
   <DiscordStatusWidget userId="123456789012345678" showActivity={true} />
   ```

## Como Funciona

- O widget usa a **Lanyard API** para obter seu status do Discord em tempo real
- Atualiza a cada 15 segundos
- Mostra:
  - **Status**: Online, Ausente, Não Perturbar, Offline
  - **Atividade**: O que você está fazendo (jogando, ouvindo música, etc.)

## Personalizações

### Desabilitar Exibição de Atividade
```jsx
<DiscordStatusWidget userId="SEU_ID" showActivity={false} />
```

### Cores Personalizadas
Edite o arquivo `src/components/DiscordStatusWidget.tsx` e modifique o objeto `statusColors`:

```typescript
const statusColors: Record<string, { bg: string; dot: string; text: string }> = {
  online: {
    bg: 'bg-green-500/10',      // Cor de fundo
    dot: 'bg-green-500',        // Cor do ponto
    text: 'Online',             // Texto
  },
  // ... outros status
};
```

## Troubleshooting

### O widget mostra "Offline" mesmo estando online?
- Verifique se o ID do Discord está correto
- Certifique-se de que sua privacidade no Discord permite que o Lanyard acesse seu status
- Aguarde alguns segundos para a API atualizar

### Erro de CORS?
- O Lanyard API suporta CORS por padrão
- Se ainda houver erro, verifique sua conexão com a internet

## Mais Informações

- **Lanyard API**: https://lanyard.rest
- **Discord Developer Portal**: https://discord.com/developers/applications
