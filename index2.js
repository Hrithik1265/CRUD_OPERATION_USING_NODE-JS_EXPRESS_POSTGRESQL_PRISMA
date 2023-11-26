const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Get all staff with full name
app.get('/staff', async (req, res) => {
  const staff = await prisma.staff.findMany({
    select: { id: true, firstName: true, lastName: true, gender: true, salary: true },
  });

  // Add a new field 'fullName'
  const staffsWithFullName = staff.map(staff => ({
    ...staff,
    fullName: `${staff.firstName} ${staff.lastName}`,
  }));

  res.json(staffsWithFullName);
});

// Get a single staff by ID with full name
app.get('/staff/:id', async (req, res) => {
  const staffId = parseInt(req.params.id);
  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
    select: { id: true, firstName: true, lastName: true, gender: true , salary: true },
  });

  if (!staff) {
    return res.status(404).json({ error: 'Staff not found' });
  }

  // Add a new field 'fullName'
  const staffWithFullName = {
    ...staff,
    fullName: `${staff.firstName} ${staff.lastName}`,
  };

  res.json(staffWithFullName);
});

// Get all staff
// app.get('/staff', async (req, res) => {
//   const staff = await prisma.staff.findMany();
//   res.json(staff);
// });

// Get a single staff by ID
// app.get('/staff/:id', async (req, res) => {
//   const staffId = parseInt(req.params.id);
//   const staff = await prisma.staff.findUnique({
//     where: { id: staffId },
//   });

//   if (!staff) {
//     return res.status(404).json({ error: 'staff not found' });
//   }

//   res.json(staff);
// });

// Create a new staff
app.post('/staff', async (req, res) => {
  const { firstName, lastName, gender, salary } = req.body;

  const newstaff = await prisma.staff.create({
    data: { firstName, lastName, gender, salary },
  });

  res.json(newstaff);
});

// Update a staff by ID
app.put('/staff/:id', async (req, res) => {
  const staffId = parseInt(req.params.id);
  const { firstName, lastName, gender, salary } = req.body;

  const updatedstaff = await prisma.staff.update({
    where: { id: staffId },
    data: { firstName, lastName, gender, salary },
  });

  res.json(updatedstaff);
});

// Delete a staff by ID
app.delete('/staff/:id', async (req, res) => {
  const staffId = parseInt(req.params.id);

  const deletedstaff = await prisma.staff.delete({
    where: { id: staffId },
  });

  res.json(deletedstaff);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});