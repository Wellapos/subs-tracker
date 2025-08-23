import { Router } from 'express'

import authorize from '../middleware/auth.middleware.js'
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', authorize, getUsers)

userRouter.get('/:id', authorize, getUser)

userRouter.post('/', (req, res) => {
  res.send({ message: 'Create new user' })
})

userRouter.put('/:id', (req, res) => {
  res.send({ message: 'Update user' })
})

userRouter.delete('/:id', (req, res) => {
  res.send({ message: 'Delete user' })
})

export default userRouter
