const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const tours = await prisma.tour.findMany({
      include: {
        duration: true,
        activity: true,
        programs: {
          include: {
            images: true
          }
        },
        images: true
      }
    });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении туров' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: parseInt(id) },
      include: {
        duration: true,
        activity: true,
        programs: {
          include: {
            images: true
          }
        },
        images: true
      }
    });
    
    if (!tour) {
      return res.status(404).json({ error: 'Тур не найден' });
    }
    
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении тура' });
  }
});

router.post('/', async (req, res) => {
  const { title, price, location, description, durationId, activityId, included, excluded, accommodation } = req.body;
  try {
    const newTour = await prisma.tour.create({
      data: {
        title,
        price,
        location,
        description,
        durationId,
        activityId,
        included,
        excluded,
        accommodation
      }
    });
    res.status(201).json(newTour);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании тура' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price, location, description, durationId, activityId, included, excluded, accommodation } = req.body;
  try {
    const updatedTour = await prisma.tour.update({
      where: { id: parseInt(id) },
      data: {
        title,
        price,
        location,
        description,
        durationId,
        activityId,
        included,
        excluded,
        accommodation
      }
    });
    res.json(updatedTour);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении тура' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.program.deleteMany({
      where: { tourId: parseInt(id) }
    });
    
    await prisma.image.deleteMany({
      where: { tourId: parseInt(id) }
    });
    
    // Затем удаляем сам тур
    await prisma.tour.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении тура' });
  }
});

module.exports = router;