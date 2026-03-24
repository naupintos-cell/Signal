# Signal

> Que te encuentren. — Visibilidad sin esfuerzo en buscadores e IA.

---

## Estructura

```
signal/
├── public/
│   └── index.html       ← frontend completo
├── src/
│   ├── server.js        ← Express app
│   └── routes/
│       └── generate.js  ← proxy a Anthropic
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Correr localmente

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```
Abrí `.env` y pegá tu API key de Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxx
```
Conseguís tu key en: https://console.anthropic.com/keys

### 3. Iniciar el servidor
```bash
# Producción
npm start

# Desarrollo (auto-restart)
npm run dev
```

Abrí http://localhost:3000

---

## Deploy en Railway (recomendado)

Railway es la opción más simple. Plan gratuito incluido.

### Pasos:

1. **Crear cuenta** en https://railway.app (podés entrar con GitHub)

2. **Subir el código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Signal MVP"
   # Crear repo en github.com, luego:
   git remote add origin https://github.com/TU_USUARIO/signal.git
   git push -u origin main
   ```

3. **Crear proyecto en Railway**
   - New Project → Deploy from GitHub repo
   - Seleccioná el repo `signal`
   - Railway detecta Node automáticamente

4. **Agregar variable de entorno**
   - En el panel del proyecto → Variables
   - Agregar: `ANTHROPIC_API_KEY` = tu key

5. **Deploy automático**
   - Railway deployea solo. En ~2 minutos tenés una URL pública tipo:
   - `https://signal-production-xxxx.up.railway.app`

6. **Dominio propio (opcional)**
   - En Railway → Settings → Domains → Add custom domain
   - Apuntás tu DNS a Railway y listo

---

## Deploy en Render (alternativa gratuita)

1. Crear cuenta en https://render.com
2. New → Web Service → conectar GitHub repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Environment → agregar `ANTHROPIC_API_KEY`
6. Deploy

---

## Variables de entorno

| Variable            | Requerida | Descripción                    |
|---------------------|-----------|--------------------------------|
| `ANTHROPIC_API_KEY` | ✓         | Key de la API de Anthropic     |
| `PORT`              | No        | Puerto (default: 3000)         |

---

## Notas de seguridad

- La API key **nunca** se expone al browser
- El frontend llama a `/api/generate` (tu propio servidor)
- Tu servidor llama a Anthropic con la key segura en el backend
