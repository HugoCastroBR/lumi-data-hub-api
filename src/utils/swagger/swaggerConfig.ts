/**
     * @swagger
     * tags:
     * - name: Health
     *   description: API Health check
     * /health:
     *   get:
     *     tags: [Health]
     *     summary: Return the health of the application
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 uptime:
     *                   type: number
     *                 status:
     *                   type: string
     *                 date:
     *                   type: string
     *      
     * @swagger
     * components:
     *   schemas:
     *     Client:
     *       type: object
     *       properties:
     *         registerN:
     *           type: string
     *         name:
     *           type: string
     *     ClientFull:
     *        type: object
     *        properties:
     *          name:
     *            type: string
     *          registerN:
     *            type: string
     *          createdAt:
     *            type: string
     *          updatedAt:
     *            type: string
     *          deletedAt:
     *            type: string
     *          ucs:
     *            type: array
     *            items:
     *              oneOf:
     *                   - $ref: '#/components/schemas/Uc' #
     *                   - type: object #
     *     Uc:
     *       type: object
     *       properties:
     *         clientId:
     *           type: number
     *         registerN:
     *           type: string
     *     UcFull:
     *       type: object
     *       properties:
     *         registerN:
     *           type: string
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *         deletedAt:
     *           type: string
     *         bills:
     *           type: array
     *           items:
     *              oneOf:
     *                   - $ref: '#/components/schemas/Bill' #
     *                   - type: object #
     *     Bill:
     *       type: object
     *       properties:
     *         month:
     *           type: integer
     *         year:
     *           type: integer
     *         electricity:
     *           type: number
     *         electricityCost:
     *           type: number
     *         electricityScee:
     *           type: number
     *         electricitySceeCost:
     *           type: number
     *         electricityCompensated:
     *           type: number
     *         electricityCompensatedCost:
     *           type: number
     *         electricityPublicCost:
     *           type: number
     * 
     *     BillFull:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *         month:
     *           type: integer
     *         year:
     *           type: integer
     *         electricity:
     *           type: number
     *         electricityCost:
     *           type: number
     *         electricityScee:
     *           type: number
     *         electricitySceeCost:
     *           type: number
     *         electricityCompensated:
     *           type: number
     *         electricityCompensatedCost:
     *           type: number
     *         electricityPublicCost:
     *           type: number
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *         deletedAt:
     *           type: string
     *         uc:
     *           oneOf:
     *               - $ref: '#/components/schemas/Uc' #
     *               - type: object #
     *         ucId:
     *           type: integer
     * 
     * /clients:
     *   get:
     *     tags: [Client]
     *     summary: Returns an array of clients
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ClientFull'
     *   post:
     *     tags: [Client]
     *     summary: Create a new client
     *     responses:
     *       201:
     *         description: Successful creation
     *       409:
     *         description: Client Already Exist
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Client'
     *      
     * 
     * /clients/{id}:
     *   get:
     *     tags: [Client]
     *     summary: Returns a client by id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:  
     *               $ref: '#/components/schemas/ClientFull'
     *       404:
     *         description: Client not found
     * 
     *   put:
     *     tags: [Client]
     *     summary: Update a client
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Client'
     *     responses:
     *       200:
     *         description: Successful update
     *         content:
     *           application/json:
     *             schema: {$ref: '#/components/schemas/ClientFull'}
     *       404:
     *         description: Client not found
     * 
     *   delete:
     *     tags: [Client]
     *     summary: Delete a client
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: No content
     *         content:
     *           application/json:
     *             schema:  
     *               type: object
     *       404:
     *         description: Client not found
     * 
     * 
     * 
     * /ucs:
     *   get:
     *     tags: [Uc]
     *     summary: Returns an array of Ucs
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/UcFull'
     *   post:
     *     tags: [Uc]
     *     summary: Create a new Uc
     *     responses:
     *       201:
     *         description: Successful creation
     *       409:
     *         description: UC Already Exist
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Uc'
     *      
     * /ucs/{id}:
     *   get:
     *     tags: [Uc]
     *     summary: Returns a uc by id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:  
     *               $ref: '#/components/schemas/UcFull'
     *       404:
     *         description: Uc not found
     * 
     *   put:
     *     tags: [Uc]
     *     summary: Update a Uc
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Uc'
     *     responses:
     *       200:
     *         description: Successful update
     *         content:
     *           application/json:
     *             schema: {$ref: '#/components/schemas/UcFull'}
     *       404:
     *         description: Uc not found
     * 
     *   delete:
     *     tags: [Uc]
     *     summary: Delete a Uc
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: No content
     *         content:
     *           application/json:
     *             schema:  
     *               type: object
     *       404:
     *         description: Uc not found
     * 
     * 
     * 
     * /bills:
     *   get:
     *     tags: [Bill]
     *     summary: Returns an array of Bills
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/BillFull'
     *   post:
     *     tags: [Bill]
     *     summary: Create a new Bill
     *     responses:
     *       201:
     *         description: Successful creation
     *       409:
     *         description: UC Already Exist
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Bill'
     * /bills/{id}:
     *   get:
     *     tags: [Bill]
     *     summary: Returns a Bill by id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:  
     *               $ref: '#/components/schemas/BillFull'
     *       404:
     *         description: Bill not found
     * 
     *   put:
     *     tags: [Bill]
     *     summary: Update a Bill
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Bill'
     *     responses:
     *       200:
     *         description: Successful update
     *         content:
     *           application/json:
     *             schema: {$ref: '#/components/schemas/BillFull'}
     *       404:
     *         description: Bill not found
     * 
     *   delete:
     *     tags: [Bill]
     *     summary: Delete a Bill
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: No content
     *         content:
     *           application/json:
     *             schema:  
     *               type: object
     *       404:
     *         description: Bill not found
     */