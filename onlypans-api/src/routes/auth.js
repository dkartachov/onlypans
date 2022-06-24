import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const payload = jwt.verify(accessToken, process.env.ONLYPANS_API_SECRET);

    req.body.user = payload.user;
  } catch (e) {
    return res.status(401).json('Unauthorized');
  }

  next();
};