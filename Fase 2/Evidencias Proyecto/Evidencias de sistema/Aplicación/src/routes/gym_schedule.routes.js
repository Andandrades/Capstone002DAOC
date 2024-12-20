const { Router } = require("express");

const { getGymHours,getHoursByDate, createGymHour , updateGymHour, deleteGymHour, getSingleHour , getHourByDay , updateActualCap , getHoursByDateAdmin} = require("../controllers/gym_schedule.controllers");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')

const router = Router();


router.get("/gymHours", authenticateToken, autorizeRole([1,2,3,4]),getGymHours);
router.get("/gymHoursDate/:date", authenticateToken, autorizeRole([1,2,3,4]),getHoursByDate);
router.get("/gymHoursDateAdmin/:date", authenticateToken, autorizeRole([4]),getHoursByDateAdmin);
router.post("/gymHours", authenticateToken, autorizeRole([2,3,4]),createGymHour);
router.options("/gymHours/:id", authenticateToken, autorizeRole([2,3,4]));
router.put("/gymHours/:id", authenticateToken, autorizeRole([2,3,4]), updateGymHour);
router.patch("/gymHours/:id", authenticateToken, autorizeRole([2,3,4]),updateActualCap);
router.delete("/gymHours/:id", authenticateToken, autorizeRole([2,3,4]),deleteGymHour);
router.get("/gymHours/:id", authenticateToken, autorizeRole([1,2,3,4]),getSingleHour);
router.get("/gymHoursDay/:day", authenticateToken, autorizeRole([1,2,3,4]),getHourByDay);
router.get("/gymHoursDay/:day", authenticateToken, autorizeRole([1,2,3,4]));

//Endpoint para crear copia de horas de un dia



module.exports = router;
