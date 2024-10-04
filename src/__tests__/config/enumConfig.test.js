import {
  USER_ROLE,
  TASK_PRIORITY,
  TASK_STATUS,
} from "../../config/enumConfig.js";

describe("enumConfig", () => {
  describe("USER_ROLE", () => {
    it("should define USER_ROLE with ADMIN and USER", () => {
      expect(USER_ROLE).toEqual({
        ADMIN: "ADMIN",
        USER: "USER",
      });
    });

    it("should be immutable", () => {
      expect(() => {
        USER_ROLE.ADMIN = "SUPER_ADMIN";
      }).toThrow();
      expect(USER_ROLE.ADMIN).toBe("ADMIN");
    });
  });

  describe("TASK_PRIORITY", () => {
    it("should define TASK_PRIORITY with LOW, MEDIUM, and HIGH", () => {
      expect(TASK_PRIORITY).toEqual({
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH",
      });
    });
    it("should be immutable", () => {
      expect(() => {
        TASK_PRIORITY.LOW = 'VERY_LOW';
      }).toThrow();
      expect(USER_ROLE.ADMIN).toBe("ADMIN");
    });
  });

  describe('TASK_STATUS', () => {
    it('should define TASK_STATUS with various states', () => {
      expect(TASK_STATUS).toEqual({
        PENDING: 'PENDING',
        IN_PROGRESS: 'IN_PROGRESS',
        COMPLETED: 'COMPLETED',
        ON_HOLD: 'ON_HOLD',
        CANCELLED: 'CANCELLED',
      });
    });

    it('should be immutable', () => {
      expect(() => {
        TASK_STATUS.PENDING = 'STARTED';
      }).toThrow();

      expect(TASK_STATUS.PENDING).toBe('PENDING');
    });
  });
});
