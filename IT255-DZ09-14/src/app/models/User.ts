export class User {
  public id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: string;
  public token: string;

  constructor(
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    id?: number,
    token?: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.token = token;
  }
}
