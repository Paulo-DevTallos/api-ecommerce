const { createSession, getSessions, updateSession, removeSession } = require('../controllers/session.controller');
const router = require('./index');

router.get('/session', getSessions);
router.post('/session/create', createSession);
router.patch('/session/update/:id', updateSession);
router.delete('/session/remove/:id', removeSession);

module.exports = router;
