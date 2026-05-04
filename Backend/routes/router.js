import express from "express";
import { deleteAchievment, getAchievementById, getAchievement, getOneAchievement, postAchievement, updateAchievement } from "../controllers/achievementController.js";
import { deleteAcc, getUsers, handleLogout, login, register } from "../controllers/usersController.js";
import { verifyToken } from "../auth/verifyToken.js";
import { deleteContact, getContact, getContactById, getContactByName, postContact, updateContact } from "../controllers/contactMe.js";
import { getProject, postProject, deleteProject, updateProject, getProjectByName, getProjectById } from "../controllers/projectController.js";
import { deleteTechStack, getTechStack, getTechStackById, getTechStackByName, postTechStack, updateTechStack } from "../controllers/techStackController.js";
import { addEducation, deleteEducation, getEducation, getEducationById, getEducationByName, updateEducation } from "../controllers/educationController.js";
import { addDocumentation, deleteDocumentation, getDocumentation, getDocumentationById, getDocumentationByName, updateDocumentation } from "../controllers/documentationController.js";
import { addMyCv, deleteCV, getMyCv, updateCV } from "../controllers/myCvController.js";


const router = express.Router();

router.get('/users', getUsers);
router.post('/users', register);
router.delete('/users', deleteAcc);


// =========== SWAGGER ============
// ===========   AUTH  ============
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successfully
*/
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Logout User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout Successfully
*/
router.post('/logout', handleLogout);

// =========== SWAGGER ============
// =========== ACHIEVEMENT ============
/**
 * @swagger
 * /achievement:
 *  get:
 *     tags:
 *      - Achievement
 *     summary: Get Achievement
 *     responses:
 *       200:
 *         description: Get Achievement Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   imageAchievement:
 *                     type: string
 *                   nameAchievement:
 *                     type: string
 *                   dateAchievement:
 *                     type: string
 *                   typeAchievement:
 *                     type: string
*/
router.get('/achievement', getAchievement);
/**
 * @swagger
 * /achievement/name:
 *   get:
 *     tags:
 *       - Achievement
 *     summary: Get Achievement By Name
 *     parameters:
 *       - in: query
 *         name: nameAchievement
 *         required: true
 *         schema:
 *           type: string
 *         description: Name achievement
 *     responses:
 *       302:
 *         description: Redirect to /achievement/{id}
 *       400:
 *         description: Name Achievement is required
 *       404:
 *         description: Achievement not found
*/
router.get('/achievement/name', getOneAchievement);
/**
 * @swagger
 * /achievement/{id}:
 *   get:
 *     tags:
 *       - Achievement
 *     summary: Get Achievement By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Achievement
 *     responses:
 *       200:
 *         description: Get Achivement By ID is Successfully
*/
router.get('/achievement/:id', getAchievementById);

/**
 * @swagger
 * /achievement:
 *   post:
 *     tags:
 *      - Achievement
 *     summary: Add Achievement
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageAchievement:
 *                 type: string
 *               nameAchievement:
 *                 type: string
 *               dateAchievement:
 *                 type: string
 *                 format: date
 *               typeAchievement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Achievement Successfully
*/
router.post('/achievement',verifyToken, postAchievement);

/**
 * @swagger
 * /achievement:
 *   delete:
 *     tags:
 *      - Achievement
 *     summary: Delete Achievement
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameAchievement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Achievement Successfully
*/
router.delete('/achievement',verifyToken ,deleteAchievment);


/**
 * @swagger
 * /achievement:
 *   put:
 *     tags:
 *      - Achievement
 *     summary: Update Achievement
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldName:
 *                 type: string
 *               imageAchievement:
 *                 type: string
 *               nameAchievement:
 *                 type: string
 *               dateAchievement:
 *                 type: string
 *                 format: date
 *               typeAchievement:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Achivement Successfully
*/
router.put('/achievement', verifyToken,updateAchievement);

// =========== SWAGGER ============
// =========== CONTACT ME ============

/**
 * @swagger
 * /contactMe:
 *  get:
 *     tags:
 *      - Contact Me
 *     summary: Get Contact Me
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Contact Me Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   yourName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   subject:
 *                     type: string
 *                   message:
 *                     type: string
*/
router.get('/contactMe',verifyToken, getContact);
/**
 * @swagger
 * /contactMe/name:
 *   get:
 *     tags:
 *       - Contact Me
 *     summary: Get Contact By Name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: yourName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Contact
 *     responses:
 *       302:
 *         description: Redirect to /contactMe/{id}
 *       400:
 *         description: Name Contact is required
 *       404:
 *         description: Contact not found
*/
router.get('/contactMe/name',verifyToken, getContactByName)
/**
 * @swagger
 * /contactMe/{id}:
 *   get:
 *     tags:
 *       - Contact Me
 *     summary: Get Contact By Id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id Contact
 *         example: 69f2180631dc6da1afc12b42
 *     responses:
 *       200:
 *         description: Get Contact By ID is Successfully
*/
router.get('/contactMe/:id', verifyToken, getContactById)

/**
 * @swagger
 * /contactMe:
 *   post:
 *     tags:
 *      - Contact Me
 *     summary: Add Contact Me
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yourName:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Contact Successfully
*/
router.post('/contactMe',postContact);
/**
 * @swagger
 * /contactMe:
 *   delete:
 *     tags:
 *      - Contact Me
 *     summary: Delete Contact Me
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Contact Successfully
*/
router.delete('/contactMe',verifyToken ,deleteContact);
/**
 * @swagger
 * /contactMe:
 *   put:
 *     tags:
 *      - Contact Me
 *     summary: Update Contact Me
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldEmail:
 *                 type: string
 *               yourName:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Contact Me Successfully
*/
router.put('/contactMe',verifyToken, updateContact);

// =========== SWAGGER ============
// =========== PROJECT ============

/**
 * @swagger
 * /project:
 *  get:
 *     tags:
 *      - Project
 *     summary: Get Project
 *     responses:
 *       200:
 *         description: Get Project Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   thumbnail:
 *                     type: string
 *                   nameProject:
 *                     type: string
 *                   overview:
 *                     type: string
 *                   feature:
 *                     type: string
 *                   documentation:
 *                     type: array
 *                     items:
 *                      type: string
 *                   techStack:
 *                     type: array
 *                     items:
 *                      type: string
 *                   duration:
 *                     type: string
 *                   status:
 *                     type: array
 *                     items:
 *                      type: string
 *                      enum: [Pending, Ongoing, Complete]
 *                      default: Pending
 *                   typeProject:
 *                     type: string
*/
router.get('/project', getProject);
/**
 * @swagger
 * /project/name:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get Project By Name
 *     parameters:
 *       - in: query
 *         name: nameProject
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Project
 *     responses:
 *       302:
 *         description: Redirect to /project/{id}
 *       400:
 *         description: Name Project is required
 *       404:
 *         description: Project not found
*/
router.get('/project/name', getProjectByName)
/**
 * @swagger
 * /project/{id}:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get Project By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Project
 *     responses:
 *       200:
 *         description: Get Project By ID is Successfully
*/

router.get('/project/:id', getProjectById)

/**
 * @swagger
 * /project:
 *   post:
 *     tags:
 *      - Project
 *     summary: Add Project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *               nameProject:
 *                 type: string
 *               overview:
 *                 type: string
 *               feature:
 *                 type: string
 *               documentation:
 *                 type: array
 *                 items:
 *                  type: string
 *                  description: "ID of the Documentation document"
 *                  example: "60d5ec3a1029830015b3c321"
 *               techStack:
 *                 type: array
 *                 items:
 *                  type: string
 *                  description: "ID of the Tech Stack"
 *                  example: "60d5ec3a1029830015b3c321"
 *               duration:
 *                 type: string
 *               status:
 *                 type: array
 *                 items:
 *                  type: string
 *                  enum: [Pending, Ongoing, Complete]
 *                  default: Pending
 *               typeProject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Project Successfully
*/
router.post('/project',verifyToken, postProject);

/**
 * @swagger
 * /project:
 *   delete:
 *     tags:
 *      - Project
 *     summary: Delete Project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameProject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Contact Successfully
*/
router.delete('/project',verifyToken, deleteProject);

/**
 * @swagger
 * /project:
 *   put:
 *     tags:
 *      - Project
 *     summary: Update Project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldNameProject:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               nameProject:
 *                 type: string
 *               overview:
 *                 type: string
 *               feature:
 *                 type: string
 *               documentation:
 *                 type: array
 *                 items:
 *                  type: string
 *                  description: "ID of the Documentation document"
 *                  example: "60d5ec3a1029830015b3c321"
 *               techStack:
 *                 type: array
 *                 items:
 *                  type: string
 *                  description: "ID of the Tech Stack"
 *                  example: "60d5ec3a1029830015b3c321"
 *               duration:
 *                 type: string
 *               status:
 *                 type: array
 *                 items:
 *                  type: string
 *                  enum: [Pending, Ongoing, Complete]
 *                  default: Pending
 *               typeProject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Project Successfully
*/
router.put('/project',verifyToken, updateProject);

// =================   SWAGGER  ===============
// ================= TECH STACK ===============

/**
 * @swagger
 * /techStack:
 *  get:
 *     tags:
 *      - Tech Stack
 *     summary: Get Tech Stack
 *     responses:
 *       200:
 *         description: Get Tech Stack Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   icon:
 *                     type: string
*/
router.get('/techStack', getTechStack);
/**
 * @swagger
 * /techStack/name:
 *   get:
 *     tags:
 *       - Tech Stack
 *     summary: Get Tech Stack By Name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Tech Stack
 *     responses:
 *       302:
 *         description: Redirect to /Tech Stack/{id}
 *       400:
 *         description: Name Tech Stack is required
 *       404:
 *         description: Tech Stack not found
*/
router.get('/techStack/name', getTechStackByName);
/**
 * @swagger
 * /techStack/{id}:
 *   get:
 *     tags:
 *       - Tech Stack
 *     summary: Get Tech Stack By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Tech Stack
 *     responses:
 *       200:
 *         description: Get Tech Stack By ID is Successfully
*/
router.get('/techStack/:id', getTechStackById)

/**
 * @swagger
 * /techStack:
 *   post:
 *     tags:
 *      - Tech Stack
 *     summary: Add Tech Stack
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Tech Stack Successfully
*/
router.post('/techStack',verifyToken, postTechStack);

/**
 * @swagger
 * /techStack:
 *   delete:
 *     tags:
 *      - Tech Stack
 *     summary: Delete Tech Stack
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Tech Stack Successfully
*/
router.delete('/techStack',verifyToken, deleteTechStack);

/**
 * @swagger
 * /techStack:
 *   put:
 *     tags:
 *      - Tech Stack
 *     summary: Update Tech Stack
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldName:
 *                 type: string
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Tech Stack Successfully
*/
router.put('/techStack',verifyToken, updateTechStack);

// ================ SWAGGER ===================
// =============== EDUCATION ===================

/**
 * @swagger
 * /education:
 *  get:
 *     tags:
 *      - Education
 *     summary: Get Education
 *     responses:
 *       200:
 *         description: Get Education Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   institution:
 *                     type: string
 *                   major:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 *                   description:
 *                     type: string
*/
router.get('/education', getEducation);
/**
 * @swagger
 * /education/name:
 *   get:
 *     tags:
 *       - Education
 *     summary: Get Education By Name
 *     parameters:
 *       - in: query
 *         name: institution
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Institution
 *     responses:
 *       302:
 *         description: Redirect to /institution/{id}
 *       400:
 *         description: Name Institution is required
 *       404:
 *         description: Institution not found
*/
router.get('/education/name', getEducationByName);
/**
 * @swagger
 * /education/{id}:
 *   get:
 *     tags:
 *       - Education
 *     summary: Get Education By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Institution
 *     responses:
 *       200:
 *         description: Get Education By ID Successfully
*/
router.get('/education/:id', getEducationById);
/**
 * @swagger
 * /education:
 *   post:
 *     tags:
 *      - Education
 *     summary: Add Education
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *               major:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Education Successfully
*/
router.post('/education',verifyToken, addEducation);
/**
 * @swagger
 * /education:
 *   delete:
 *     tags:
 *      - Education
 *     summary: Delete Education
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Education Successfully
*/
router.delete('/education',verifyToken, deleteEducation);
/**
 * @swagger
 * /education:
 *   put:
 *     tags:
 *      - Education
 *     summary: Update Education
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldInstitution:
 *                 type: string
 *               institution:
 *                 type: string
 *               major:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Education Successfully
*/
router.put('/education',verifyToken, updateEducation);

// ================== SWAGGER ===================
// ================ DOCUMENTATION ===================

/**
 * @swagger
 * /documentation:
 *  get:
 *     tags:
 *      - Documentation
 *     summary: Get Documentation
 *     responses:
 *       200:
 *         description: Get All Documentation Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   imageUrl:
 *                     type: string
*/
router.get('/documentation', getDocumentation);
/**
 * @swagger
 * /documentation/name:
 *   get:
 *     tags:
 *       - Documentation
 *     summary: Get Documentation By Name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name Documentation
 *     responses:
 *       302:
 *         description: Redirect to /documentation/{id}
 *       400:
 *         description: Name Documentation is required
 *       404:
 *         description: Documentation not found
*/
router.get('/documentation/name', getDocumentationByName);
/**
 * @swagger
 * /documentation/{id}:
 *   get:
 *     tags:
 *       - Documentation
 *     summary: Get Documentation By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Documentation
 *     responses:
 *       200:
 *         description: Get Documentation By ID Successfully
*/
router.get('/documentation/:id', getDocumentationById);
/**
 * @swagger
 * /documentation:
 *   post:
 *     tags:
 *      - Documentation
 *     summary: Add Documentation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add Documentation Successfully
*/
router.post('/documentation',verifyToken, addDocumentation);
/**
 * @swagger
 * /documentation:
 *   delete:
 *     tags:
 *      - Documentation
 *     summary: Delete Documentation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete Documentation Successfully
*/
router.delete('/documentation', verifyToken, deleteDocumentation);
/**
 * @swagger
 * /documentation:
 *   put:
 *     tags:
 *      - Documentation
 *     summary: Update Documentation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldName:
 *                 type: string
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Documentation Successfully
*/
router.put('/documentation',verifyToken, updateDocumentation);
/**
 * @swagger
 * /myCv:
 *  get:
 *     tags:
 *      - My CV
 *     summary: Get My CV
 *     responses:
 *       200:
 *         description: Get My CV Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pdf:
 *                     type: string
*/
router.get('/myCv', getMyCv);
/**
 * @swagger
 * /myCv:
 *   post:
 *     tags:
 *      - My CV
 *     summary: Add My CV
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Add My CV Successfully
*/
router.post('/myCv', addMyCv);
/**
 * @swagger
 * /myCv:
 *   delete:
 *     tags:
 *      - My CV
 *     summary: Delete My CV
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete My CV Successfully
*/
router.delete('/myCv', deleteCV);
/**
 * @swagger
 * /myCv:
 *   put:
 *     tags:
 *      - My CV
 *     summary: Update My CV
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPdf:
 *                 type: string
 *               pdf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update My CV Successfully
*/
router.put('/myCv', updateCV);

export default router;