import { validateGenerateInput } from '../middleware/security.js'; // ← AGREGAR
import Router from 'express';

const router = Router();

// Agregar validateGenerateInput como segundo argumento — antes de tu handler
router.post('/generate', validateGenerateInput, async (req, res) => {
  // req.body ya viene limpio y validado desde el middleware
  const { name, what, location, website } = req.body;

  // ... tu código actual sin cambios
});

export default router;
```

---

### Railway Variables — Lo hacés desde el dashboard, no en código
```
railway.app → tu proyecto → Variables → Raw Editor → pegar esto:
```
```
ANTHROPIC_API_KEY=sk-ant-TU_KEY_REAL
MP_ACCESS_TOKEN=APP_USR-TU_TOKEN_REAL
NODE_ENV=production
PORT=3000
```

Verificá que **ninguna de estas keys aparezca en ningún archivo del repo**. Buscá en GitHub con `Ctrl+F` en cada archivo de `src/routes/`.

---

### Checklist — en orden, antes de hacer push
```
□ 1. Crear src/middleware/security.js con el código de arriba
□ 2. Agregar trust proxy + securityHeaders + rateLimit en server.js
□ 3. Agregar validateGenerateInput en la route de /generate
□ 4. Verificar que ANTHROPIC_API_KEY y MP_ACCESS_TOKEN NO están en el código
□ 5. Agregar esas keys en Railway Variables dashboard
□ 6. Push a main → Railway redeploya automático
□ 7. Probar que /api/generate responde normal
□ 8. Probar que al llamarlo 9 veces seguidas devuelve 429
