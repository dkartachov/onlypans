import { Router } from "express";

const router = Router();

const data = [
  {
    username: '@deniskartachov',
    body: 'This is the best social media app ever! Get it now!',
    vote: 'up',
  },
  {
    username: '@charlietheborzoi',
    body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
    vote: 'up',
  },
  {
    username: '@pennywise',
    body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
    vote: 'down',
  },
  {
    username: '@deniskartachov',
    body: 'This is the best social media app ever! Get it now!',
  },
  {
    username: '@charlietheborzoi',
    body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
    vote: 'up',
  },
  {
    username: '@pennywise',
    body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
  },
  {
    username: '@deniskartachov',
    body: 'This is the best social media app ever! Get it now!',
  },
  {
    username: '@charlietheborzoi',
    body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
  },
  {
    username: '@pennywise',
    body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
    vote: 'down',
  },
  {
    username: '@pennywise',
    body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
  },
  {
    username: '@deniskartachov',
    body: 'This is the best social media app ever! Get it now!',
  },
  {
    username: '@charlietheborzoi',
    body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
  },
  {
    username: '@pennywise',
    body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
  }
];

data.forEach((post, index) => {
  post.id = ++index;
});

router.get('/', async (req, res) => {
  try {
    res.status(200).json(data);
  } catch (e) {

  }
});

export default router;