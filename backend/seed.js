import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Application } from "./models/application.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { User } from "./models/user.model.js";

dotenv.config();

const seedDatabase = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    await Promise.all([
        Application.deleteMany({}),
        Job.deleteMany({}),
        Company.deleteMany({}),
        User.deleteMany({}),
    ]);

    const password = await bcrypt.hash("Password123!", 10);
    const recruiterData = Array.from({ length: 10 }, (_, index) => ({
        fullname: `Recruiter ${index + 1}`,
        email: `recruiter${index + 1}@jobhunt.test`,
        phoneNumber: 9000000000 + index,
        password,
        role: "recruiter",
        profile: {
            bio: `Talent partner at a growing technology company.`,
            profilePhoto: "",
        },
    }));
    const studentData = Array.from({ length: 10 }, (_, index) => ({
        fullname: `Student ${index + 1}`,
        email: `student${index + 1}@jobhunt.test`,
        phoneNumber: 8000000000 + index,
        password,
        role: "student",
        profile: {
            bio: `Software professional looking for a new opportunity.`,
            skills: ["JavaScript", "React", "Node.js"],
            profilePhoto: "",
        },
    }));

    const recruiters = await User.insertMany([...recruiterData, ...studentData]);
    const recruiterUsers = recruiters.filter((user) => user.role === "recruiter");
    const studentUsers = recruiters.filter((user) => user.role === "student");

    const companyData = Array.from({ length: 20 }, (_, index) => ({
        name: `Seed Company ${index + 1}`,
        description: `A sample company used for local Job Hunt development data.`,
        website: `https://company-${index + 1}.example.com`,
        location: ["Bengaluru", "Mumbai", "Delhi", "Hyderabad"][index % 4],
        logo: "",
        userId: recruiterUsers[index % recruiterUsers.length]._id,
    }));
    const companies = await Company.insertMany(companyData);

    const jobData = Array.from({ length: 20 }, (_, index) => ({
        title: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Product Designer"][index % 4],
        description: "Work with a collaborative team to build, improve, and ship reliable products.",
        requirements: ["Strong communication", "Problem solving", "Relevant project experience"],
        salary: 5 + (index % 5),
        experienceLevel: index % 4,
        location: ["Bengaluru", "Mumbai", "Delhi", "Hyderabad"][index % 4],
        jobType: index % 3 === 0 ? "Part-time" : "Full-time",
        position: (index % 4) + 1,
        company: companies[index]._id,
        created_by: recruiterUsers[index % recruiterUsers.length]._id,
        applications: [],
    }));
    const jobs = await Job.insertMany(jobData);

    const applicationData = jobs.map((job, index) => ({
        job: job._id,
        applicant: studentUsers[index % studentUsers.length]._id,
        status: ["pending", "accepted", "rejected"][index % 3],
    }));
    const applications = await Application.insertMany(applicationData);

    await Promise.all(
        applications.map((application) =>
            Job.findByIdAndUpdate(application.job, {
                $push: { applications: application._id },
            })
        )
    );

    console.log("Seed complete: 20 users, 20 companies, 20 jobs, and 20 applications.");
    console.log("Seed password for every account: Password123!");
};

try {
    await seedDatabase();
} catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
