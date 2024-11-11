import { Response } from "express";
import { IRequest } from "../types/api.types";
import { asyncHandler } from "../utils/async-handler";
import { validateLogInput } from "../schema/validation";
import { securityLog } from "../features/security-log";
import mongoose from "mongoose";
import { responseType } from "../constants";
import { ApiResponse } from "../utils/custom-api-response";
import { ApiError } from "../utils/custom-api-error";

// GET ALL LOGS OF A PARTICULAR USER (USING ITS USER-ID)
export const getLogsByUserId = asyncHandler(
  async (req: IRequest, res: Response) => {
    // Auth-middleware: Authenticate the user (or admin)
    const adminId = req.admin?.id;

    // Project-Validation-middleware: Validate the project
    const projectId = req.project?.id as string | mongoose.Types.ObjectId;

    // Get the details from the request-body
    const { page, itemLimit, userId, startDate, endDate } = req.body;

    // Validate the format of the request-body details
    const validationResponse = validateLogInput({
      page,
      itemLimit,
      startDate,
      endDate,
      userId,
    });
    if (!validationResponse.success) {
      throw new ApiError(
        responseType.VALIDATION_ERROR.code,
        responseType.VALIDATION_ERROR.type,
        "Invalid data is passed in the Request-body.",
        validationResponse.errors
      );
    }

    // Get the documents from the database
    const logsFromDB = await securityLog.getLogsByUserID({
      userId,
      page,
      projectId,
      queryItemCount: itemLimit,
      startDate,
      endDate,
    });

    // Send response with data
    res
      .status(responseType.SUCCESSFUL.code)
      .json(
        new ApiResponse(
          responseType.SUCCESSFUL.code,
          responseType.SUCCESSFUL.type,
          "Logs between the given dates fetched successfully",
          logsFromDB
        )
      );
  }
);

// GET ALL LOGS OF A PROJECT USING THE EVENT
export const getLogsByEventCode = asyncHandler(
  async (req: IRequest, res: Response) => {
    // Auth-middleware: Authenticate the user (or admin)
    const userId = req.user?.id;
    const adminId = req.admin?.id;

    // Project-Validation-middleware: Validate the project

    // Get the details from the request-body
    const { page, itemLimit, projectId, startDate, endDate, eventCode } =
      req.body;

    // Validate the format of the request-body details
    const validationResponse = validateLogInput({
      page,
      itemLimit,
      startDate,
      endDate,
      projectId,
      eventCode,
    });
    if (!validationResponse.success) {
      throw new ApiError(
        responseType.VALIDATION_ERROR.code,
        responseType.VALIDATION_ERROR.type,
        "Invalid data is passed in the Request-body.",
        validationResponse.errors
      );
    }

    // Get the documents from the database
    const logsFromDB = await securityLog.getLogsByEvent({
      projectId,
      eventCode,
      page,
      queryItemCount: itemLimit,
      startDate,
      endDate,
    });

    // Send response with data
    res
      .status(responseType.SUCCESSFUL.code)
      .json(
        new ApiResponse(
          responseType.SUCCESSFUL.code,
          responseType.SUCCESSFUL.type,
          "Logs between the given dates fetched successfully",
          logsFromDB
        )
      );
  }
);

// CLEAR ALL LOGS OF A PARTICULAR USER (USING ITS USER-ID)
export const clearUserLogs = asyncHandler(
  async (req: IRequest, res: Response) => {
    // Admin-auth-middleware: Authenticate the admin
    const adminId = req.admin?.id;

    // Get the userId
    const { userId } = req.body;
  }
);