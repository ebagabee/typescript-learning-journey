enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

type Email = string;

interface BaseUser {
  name: string;
  age: number;
  email: Email;
  status: UserStatus;
}

interface User extends BaseUser {
  createdAt: Date;
  updatedAt?: Date;
}

// Custom Errors
class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

// Result type for operations
interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class UserManager {
  private users: User[] = [];

  constructor(initialUsers?: User[]) {
    this.users = initialUsers ?? [];
  }

  public addUser(user: Omit<User, "createdAt" | "updatedAt">): Result<User> {
    try {
      if (!this.validateEmail(user.email)) {
        return { success: false, error: "Invalid email format" };
      }

      const newUser: User = {
        ...user,
        createdAt: new Date(),
      };

      this.users.push(newUser);

      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to add user",
      };
    }
  }

  public listUsers(): Result<User[]> {
    return {
      success: true,
      data: this.users,
    };
  }

  public searchByEmail(email: Email): Result<User> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  }

  // E-mail validations ('@' and ".")
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public updateUserStatus(email: Email, status: UserStatus): Result<User> {
    const userResult = this.searchByEmail(email);

    if (!userResult.success || !userResult.data) {
      return { success: false, error: "User not found" };
    }

    const user = userResult.data;
    user.status = status;
    user.updatedAt = new Date();

    return { success: true, data: user };
  }

  public updateUser(email: Email, updates: Partial<BaseUser>): Result<User> {
    const userResult = this.searchByEmail(email);

    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const user = userResult.data;

    if (updates.email && !this.validateEmail(updates.email)) {
      return { success: false, error: "Invalid email format" };
    }

    Object.assign(user, {
      ...updates,
      updatedAt: new Date(),
    });

    return {
      success: true,
      data: user,
    };
  }

  public getActiveUsers(): Result<User[]> {
    return {
      success: true,
      data: this.users.filter((user) => user.status === UserStatus.ACTIVE),
    };
  }
}

const manager = new UserManager();

const addResult = manager.addUser({
  name: "Gabriel",
  age: 23,
  email: "gabriel@example.com",
  status: UserStatus.ACTIVE,
});

if (addResult.success) {
  console.log("User added:", addResult.data);
} else {
  console.error("Error adding user:", addResult.error);
}

const updateResult = manager.updateUserStatus(
  "gabriel@example.com",
  UserStatus.INACTIVE
);

if (updateResult.success) {
  console.log("User Status updated:", updateResult.data);
} else {
  console.error("Error updating user:", updateResult.error);
}
