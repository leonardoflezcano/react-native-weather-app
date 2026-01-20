import  Router  from 'express'
import { enviarCorreoSoporte, getAllCorreosEnviados, GenerarEnviarCodigo, verificarCodigoController} from '../controllers/correoController.js'

const router = Router()

router.get('/all', getAllCorreosEnviados);

router.post('/codigo', GenerarEnviarCodigo);

router.post('/verificar_codigo', verificarCodigoController);

router.post('/', enviarCorreoSoporte);

export default router;