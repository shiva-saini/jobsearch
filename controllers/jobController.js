
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/CustomError.js";
// let jobs = [
//     {id:nanoid(),company:'apple',position:'front-end'},
//     {id:nanoid(),company:'google',position:'back-end'}
// ]

export const getAllJobs = async (req, res) => {
  // console.log(req.user.userId);
  const jobs = await Job.find({createdBy:req.user.userId});
  console.log("jobs",jobs);
  debugger
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  // const {company,position} = req.body;
  // const job = await Job.create({company,position});
  //when something went wrong we dont want entire server goes down
  //so to solve this problem we will use try - catch method
  //we will not write this code in 1000 of function so will use package
  req.body.createdBy = req.user.userId;
  console.log(req.body);
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

//get a single job with id
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ Message: "job is modified", updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ Message: "job deleted successfully", removedJob });
};
