interface User {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

interface UpdateUser {
  name?: string;
  age?: number;
  email?: string;
  active?: boolean;
}

class UserManager {
  private users: User[] = [
    {
      name: "Juan",
      age: 19,
      email: "Juan@email.com",
      active: true,
    },
    {
      name: "Aghata",
      age: 14,
      email: "agatha@gmail.com",
      active: true,
    },
  ];

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

  desactiveUser(email: string): void {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      console.log("User not founded");
      return;
    }

    user.active = false;
    console.log("User desactived successfully");
  }

  updateUser(email: string, userUpdated: UpdateUser): void {
    const userFind = this.users.find((user) => user.email === email);

    if (!userFind) {
      console.log("User not founded");
      return;
    }

    if (userUpdated.name) {
      userFind.name = userUpdated.name;
    }

    if (userUpdated.age) {
      userFind.age = userUpdated.age;
    }

    if (userUpdated.email) {
      userFind.email = userUpdated.email;
    }

    if (userUpdated.active) {
      userFind.active = userUpdated.active;
    }

    console.log("User updated successfully");
  }
}

const manager = new UserManager();

// Method to add user
manager.addUser({
  name: "Gabriel",
  age: 23,
  email: "gabrielhas.tech@gmail.com",
  active: true,
});

// Method to desative user
manager.desactiveUser("agatha@gmail.com");

console.log(manager.listUsers());
