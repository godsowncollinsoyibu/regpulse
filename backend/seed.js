import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Requirement from "./models/Requirement.js";
import Task from "./models/Task.js";

dotenv.config();

const daysFromNow = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

const seed = async () => {
  await connectDB();

  console.log("Clearing existing data...");
  await Promise.all([User.deleteMany(), Requirement.deleteMany(), Task.deleteMany()]);

  console.log("Creating users...");
  const admin = await User.create({
    name: "Admin User",
    email: "admin@regpulse.com",
    password: "admin123",
    role: "Admin",
  });

  const officer = await User.create({
    name: "Compliance Officer",
    email: "officer@regpulse.com",
    password: "officer123",
    role: "Officer",
  });

  console.log("Creating requirements...");
  const requirements = await Requirement.insertMany([
    {
      title: "NDPR Data Protection Audit",
      description: "Annual audit for Nigeria Data Protection Regulation compliance",
      category: "Data Protection",
      frequency: "Annually",
      createdBy: admin._id,
    },
    {
      title: "CBN Monthly Returns",
      description: "Submit monthly regulatory returns to the Central Bank of Nigeria",
      category: "Reporting",
      frequency: "Monthly",
      createdBy: admin._id,
    },
    {
      title: "AML/CFT Compliance Review",
      description: "Quarterly anti-money laundering review",
      category: "Anti-Money Laundering",
      frequency: "Quarterly",
      createdBy: admin._id,
    },
    {
      title: "Business Licence Renewal",
      description: "Renew operating licence with regulatory body",
      category: "Licensing",
      frequency: "Annually",
      createdBy: admin._id,
    },
  ]);

  console.log("Creating tasks...");
  await Task.insertMany([
    { requirement: requirements[0]._id, assignedTo: officer._id, deadline: daysFromNow(-3), status: "Pending" },
    { requirement: requirements[1]._id, assignedTo: officer._id, deadline: daysFromNow(2), status: "In Progress" },
    { requirement: requirements[2]._id, assignedTo: officer._id, deadline: daysFromNow(10), status: "Pending" },
    {
      requirement: requirements[3]._id,
      assignedTo: admin._id,
      deadline: daysFromNow(-20),
      status: "Completed",
      completedAt: daysFromNow(-25),
    },
    { requirement: requirements[1]._id, assignedTo: admin._id, deadline: daysFromNow(35), status: "Pending" },
  ]);

  console.log("Seed complete.");
  console.log("Login with: admin@regpulse.com / admin123  OR  officer@regpulse.com / officer123");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
