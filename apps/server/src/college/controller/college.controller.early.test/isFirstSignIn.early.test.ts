// Unit tests for: isFirstSignIn

import { Request, Response } from "express";
import College from "../../models/college";
import { isFirstSignIn } from "../college.controller";

jest.mock("../../models/college");

describe("isFirstSignIn() isFirstSignIn method", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    req = {
      //@ts-ignore
      user: {
        uid: "test-uid",
        email: "test@example.com",
      },
    };
    res = {
      status: statusMock,
    };
  });

  describe("Happy Path", () => {
    it("should return isFirstSignIn as true when no student is found", async () => {
      // Arrange
      (College.findOne as jest.Mock).mockResolvedValue(null);

      // Act
      await isFirstSignIn(req as Request, res as Response);

      // Assert
      expect(College.findOne).toHaveBeenCalledWith({
        $or: [{ googleId: "test-uid" }, { email: "test@example.com" }],
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        isFirstSignIn: true,
      });
    });

    it("should return isFirstSignIn as false when a student is found", async () => {
      // Arrange
      (College.findOne as jest.Mock).mockResolvedValue({});

      // Act
      await isFirstSignIn(req as Request, res as Response);

      // Assert
      expect(College.findOne).toHaveBeenCalledWith({
        $or: [{ googleId: "test-uid" }, { email: "test@example.com" }],
      });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        isFirstSignIn: false,
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle errors gracefully and return a 500 status", async () => {
      // Arrange
      (College.findOne as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      // Act
      await isFirstSignIn(req as Request, res as Response);

      // Assert
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ msg: "Internal Server Error" });
    });

    it("should handle missing user in request", async () => {
      // Arrange
      //@ts-ignore
      req.user = undefined;

      // Act
      await isFirstSignIn(req as Request, res as Response);

      // Assert
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ msg: "Internal Server Error" });
    });
  });
});

// End of unit tests for: isFirstSignIn
