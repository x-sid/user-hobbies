import { Router, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserService } from "../../services/user";
import { HobbiesService } from "../../services/hobbies";
import {
  BadRequestResponse,
  NotFoundResponse,
} from "../../core/responseHandler";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *            type: string
 *            description: Auto generated unique id
 *         name:
 *            type: string
 *            description: User's name
 *       example:
 *         _id: 617065380d4b39a1048a08ba
 *         name: Sidney
 *         hobbies: {_id: 6170676e3a9eed9ca678f937,name: programming,passionLevel: high,year: 2016}  
 *         createdAt: 2021-10-20T19:01:02.934Z
 *         updatedAt: 2021-10-20T20:11:13.925Z    
 *       
 * 
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Hobbies:
 *       type: object
 *       required:
 *         - name
 *         - passionLevel
 *         - year
 *       properties:
 *         _id:
 *            type: string
 *            description: Auto generated unique id
 *         name:
 *           type: string
 *           description: Hobby name
 *         year:
 *           type: integer
 *           description: Year hobby was found
 *       example:
 *         _id: 617065380d4b39a1048a08ba
 *         name: programming
 *         passionLevel: 2016  
 *         createdAt: 2021-10-20T19:01:02.934Z
 *         updatedAt: 2021-10-20T20:11:13.925Z    
 * 
 */

/**
 * @swagger
 * /users:
 *   post:
 *     Summary: Creat user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad parameters
 */
router.post(
  "/",
  asyncHandler(async (req: any, res: Response) => {
    const newUser = await UserService.create(req.body);
    if (!newUser) return new BadRequestResponse().send(res);
    return res.json(newUser);
  })
);


/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     Summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad parameters
 */
router.put(
  "/:user_id",
  asyncHandler(async (req: any, res: Response) => {
    const userId: string = req.params.user_id;
    const updatedUser = await UserService.update(req.body, userId);
    if (!updatedUser) return new BadRequestResponse().send(res);
    return res.json(updatedUser);
  })
);

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     Summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's id
 *     responses:
 *       200:
 *         description: User was deleted successfully
 *       400:
 *         description: Bad parameters
 */
router.delete(
  "/:userId",
  asyncHandler(async (req: any, res: Response) => {
    const userId: string = req.params.userId;
    const deleted = await UserService.delete(userId);
    if (!deleted) return new BadRequestResponse().send(res);
    return res.json({});
  })
);

/**
 * @swagger
 * /users:
 *   get:
 *     Summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
*/
router.get(
  "/",
  asyncHandler(async (req: any, res: Response) => {
    const users = await UserService.fetch();
    if (!users.length) return new NotFoundResponse("Users not found").send(res);
    return res.json(users);
  })
);

/**
 * @swagger
 * /users/{user_id}/hobbies:
 *   post:
 *     Summary: Creat user hobbies
 *     tags: [Hobbies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hobbies'
 *     responses:
 *       200:
 *         description: Hobby was successfully created
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hobbies'
 *       400:
 *         description: Bad parameters
 */
router.post(
  "/:user_id/hobbies",
  asyncHandler(async (req: any, res: Response) => {
    const { user_id: userId } = req.params;
    const newHobby = await HobbiesService.create(req.body, userId);
    if (!newHobby) return new BadRequestResponse().send(res);
    return res.json(newHobby);
  })
);

/**
 * @swagger
 * /users/hobbies/{hobby_id}:
 *   put:
 *     Summary: Update hobbies
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: hobby_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hobby id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: '#/components/schemas/Hobbies'
 *     responses:
 *       200:
 *         description: Hobby was updated successfully updated
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hobbies'
 *       400:
 *         description: Bad parameters
 */
router.put(
  "/hobbies/:hobby_id",
  asyncHandler(async (req: any, res: Response) => {
    const hobbyId: string = req.params.hobby_id;
    const updatedHobby = await HobbiesService.update(req.body, hobbyId);
    if (!updatedHobby) return new BadRequestResponse().send(res);
    return res.json(updatedHobby);
  })
);


/**
 * @swagger
 * /users/{user_id}/hobbies/{hobby_id}:
 *   delete:
 *     summary: Delete Hobby
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's id
 *       - in: path
 *         name: hobby_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hobby id
 *     responses:
 *       200:
 *         description: Hobby was deleted successfully
 *       400:
 *         description: Bad parameters
 */
router.delete(
  "/:user_id/hobbies/:hobby_id",
  asyncHandler(async (req: any, res: Response) => {
    const hobbyId: string = req.params.hobby_id;
    const userId: string = req.params.user_id;
    const deleted = await HobbiesService.delete(hobbyId, userId);
    if (!deleted) return new BadRequestResponse().send(res);
    return res.json({});
  })
);

export default router;
