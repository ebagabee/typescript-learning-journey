interface User {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  listUsers(): User[] {
    return this.users;
  }

  searchByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}

const manager = new UserManager();

manager.addUser({
  name: "Gabriel",
  age: 23,
  email: "gabrielhas.tech@gmail.com",
  active: true,
});
