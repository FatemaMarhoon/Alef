import { User } from "firebase/auth";

export class UserSingleton {
  private static instance: UserSingleton;
  private user: User | undefined ;
  private token: string | undefined;

  private constructor() {
    // private constructor to prevent instantiation outside the class
  }

  public static getInstance(): UserSingleton {
    // Use this method to get the instance of the class
    if (!UserSingleton.instance) {
      UserSingleton.instance = new UserSingleton();
    }

    return UserSingleton.instance;
  }

  public setUser(user: User | undefined): void {
    console.log("new user stored: ", user?.email)
    this.user = user;
  }

  public getUser(): User | undefined {
    console.log("user to be returned from singleton: ", this.user)
    return this.user;
  }

  public setToken(token: string | undefined): void {
    this.token = token;
  }

  public getToken(): string |undefined{
    return this.token;
  }
}
