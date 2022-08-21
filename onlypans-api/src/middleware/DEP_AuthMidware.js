// import jwt from 'jsonwebtoken';
// import MESSAGE from '../utils/messages.js';
// import STATUS from '../utils/status.js';

// export default (req, res, next) => {
//   const { authorization } = req.headers;
//   const accessToken = authorization && authorization.split(' ')[1];

//   if (!accessToken) {
//     return res.status(STATUS.FORBIDDEN).json(MESSAGE.CUSTOM('Forbidden', 'Missing access token'));
//   }

//   try {
//     const payload = jwt.verify(accessToken, process.env.ONLYPANS_API_SECRET);

//     req.body.auth = {};
//     req.body.auth.user = payload.user;
//   } catch (e) {
//     return res.status(STATUS.UNAUTHORIZED).json(MESSAGE.CUSTOM('Unauthorized', 'Invalid access token'));
//   }

//   next();
// };