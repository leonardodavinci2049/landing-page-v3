# Plano de Implementação - Admin para Troca de Link WhatsApp

## Objetivo

Criar uma página `/admin` simples e segura que permita alterar o link do WhatsApp sem banco de dados.

## Situação Atual

- Link do WhatsApp está hardcoded em `src/app/page.tsx:101`
- Página `/admin` existe mas está vazia (`src/app/admin/page.tsx`)

## Solução Proposta

### 1. Armazenamento de Dados

#### Arquivo de Configuração (`src/data/links.json`)

```json
{
  "whatsappUrl": "https://chat.whatsapp.com/CFwC3iqivEH8DbE6DqJL3l",
  "securityKey": "sua-chave-secreta-aqui"
}
```

**Localização**: `src/data/links.json`
**Tratamento**:

- Adicionar `src/data/*.json` ao `.gitignore` para segurança
- Criar arquivo inicialmente com valor padrão
- Se arquivo não existir, usar fallback para URL hardcoded

#### Variável de Ambiente (Fallback para Vercel)

```
NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/CFwC3iqivEH8DbE6DqJL3l
ADMIN_SECURITY_KEY=sua-chave-secreta-aqui
```

**Uso em produção**: Opcional, permite override sem arquivo

### 2. Server Actions

#### Ler Configuração (`src/app/actions/links.ts`)

```typescript
"use server";

import { readFile, writeFile } from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "src/data/links.json");

export async function getWhatsAppUrl(): Promise<string> {
  try {
    const data = await readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(data);
    return config.whatsappUrl;
  } catch {
    return (
      process.env.NEXT_PUBLIC_WHATSAPP_URL ||
      "https://chat.whatsapp.com/CFwC3iqivEH8DbE6DqJL3l"
    );
  }
}

export async function updateWhatsAppUrl(
  newUrl: string,
  securityKey: string,
): Promise<{ success: boolean; error?: string }> {
  // Validar URL
  if (!newUrl.startsWith("https://chat.whatsapp.com/")) {
    return { success: false, error: "URL inválida. Use link do WhatsApp." };
  }

  // Validar chave de segurança
  try {
    const data = await readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(data);

    const expectedKey =
      config.securityKey ||
      process.env.ADMIN_SECURITY_KEY ||
      "chave-padrao-mudar-em-prod";

    if (securityKey !== expectedKey) {
      return { success: false, error: "Chave de segurança inválida." };
    }

    // Atualizar URL
    config.whatsappUrl = newUrl;
    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));

    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar URL." };
  }
}
```

### 3. Modificações na Home Page

#### Atualizar `src/app/page.tsx`

- Remover link hardcoded
- Importar Server Action `getWhatsAppUrl`
- Usar `await getWhatsAppUrl()` para obter URL dinâmica
- **Importante**: Converter para Server Component ou usar componente wrapper

**Solução recomendada**: Criar `WhatsAppButton.tsx` como Server Component

```tsx
// src/components/WhatsAppButton.tsx
import { getWhatsAppUrl } from "@/app/actions/links";

async function WhatsAppButton() {
  const whatsappUrl = await getWhatsAppUrl();

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      {/* ... restante do botão ... */}
    </a>
  );
}

export { WhatsAppButton };
```

### 4. Página Admin

#### Atualizar `src/app/admin/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { updateWhatsAppUrl } from "../actions/links";
import { toast } from "sonner";

export default function AdminPage() {
  const [url, setUrl] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateWhatsAppUrl(url, securityKey);

    if (result.success) {
      toast.success("URL do WhatsApp atualizada com sucesso!");
      setUrl("");
      setSecurityKey("");
    } else {
      toast.error(result.error || "Erro ao atualizar URL.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Admin - Promos da Mih
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Link do WhatsApp
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://chat.whatsapp.com/..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Chave de Segurança
            </label>
            <input
              type="password"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Atualizando..." : "Atualizar Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### 5. Implementação Passo a Passo

1. **Criar estrutura de dados**
   - Criar pasta `src/data/`
   - Criar arquivo `links.json` inicial
   - Adicionar `src/data/*.json` ao `.gitignore`

2. **Criar Server Actions**
   - Criar arquivo `src/app/actions/links.ts`
   - Implementar `getWhatsAppUrl()` e `updateWhatsAppUrl()`

3. **Refatorar componente do WhatsApp**
   - Criar `src/components/WhatsAppButton.tsx` como Server Component
   - Importar e usar em `src/app/page.tsx`

4. **Implementar página Admin**
   - Atualizar `src/app/admin/page.tsx` com formulário
   - Usar `sonner` para notificações (já instalado)

5. **Testar**
   - Acessar `/admin` e testar alteração de URL
   - Validar chave de segurança
   - Verificar se botão na home usa nova URL

### 6. Considerações de Segurança

✅ **Segurança implementada**:

- Chave de segurança obrigatória
- Validação de formato de URL (deve ser do WhatsApp)
- Arquivo de config fora do versionamento (.gitignore)
- Server Actions validam no servidor

⚠️ **Limitações**:

- Em Vercel, o sistema de arquivos é efêmero em ambientes serverless
- Arquivo pode ser perdido durante redeploys
- Solução: usar variáveis de ambiente como fallback principal em produção

### 7. Alternativa para Vercel (Opcional)

Se precisar de persistência durável em Vercel:

**Opção A - Vercel KV**:

- Adicionar `@vercel/kv` (grátis para uso básico)
- Armazenar chave `whatsapp_url` no KV
- Atualizar Server Actions para usar KV

**Opção B - Vercel Postgres**:

- Criar tabela `config` com `key` e `value`
- Similar ao KV, mas mais completo

**Opção C - API externa (JSONBin/Supabase)**:

- Serviços gratuitos para armazenamento simples
- Requer autenticação adicional

### 8. Comandos Úteis

```bash
# Criar arquivo de config inicial
mkdir -p src/data
cat > src/data/links.json << 'EOF'
{
  "whatsappUrl": "https://chat.whatsapp.com/CFwC3iqivEH8DbE6DqJL3l",
  "securityKey": "sua-chave-secreta-aqui"
}
EOF

# Adicionar ao .gitignore (se não estiver)
echo "src/data/*.json" >> .gitignore

# Testar em desenvolvimento
pnpm dev
# Acessar http://localhost:3000/admin
```

## Resumo

Esta solução oferece:

- ✅ Simplicidade (sem banco de dados)
- ✅ Segurança (chave de autenticação)
- ✅ Funcionalidade (troca dinâmica de URL)
- ✅ Fallback para produção (variáveis de ambiente)
- ⚠️ Limitação em Vercel (arquivos não persistem entre deploys)

Para uso em produção na Vercel, recomenda-se usar variáveis de ambiente ou Vercel KV como armazenamento primário.
