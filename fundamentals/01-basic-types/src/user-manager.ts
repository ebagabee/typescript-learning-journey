interface User {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    if (!this.validateEmail(user.email)) {
      console.log("E-mail don't is valid!");
      return;
    }

    this.users.push(user);
    console.log("User add successfully");
  }

  listUsers(): User[] {
    return this.users;
  }

  searchByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  // E-mail validations ('@' and ".")
  private validateEmail(email: string): boolean {
    if (!(email.includes("@") && email.includes("."))) {
      return false;
    }

    return true;
  }
}

const manager = new UserManager();

manager.addUser({
  name: "Gabriel",
  age: 23,
  email: "gabrielhas.tech@gmail.com",
  active: true,
});

// Todos:

// E-mail validations ('@' and ".") [x]
// Method to desative user []