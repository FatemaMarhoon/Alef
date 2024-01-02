export interface User {
  id: number;
  email: string;
  password: string;
  role_name: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  preschool_id: number | null;
}
export class UserStorage {
  static getCurrentUser(): User | null {
    const userObjectString = localStorage.getItem('currentUser');
    if (userObjectString) {
      const userObject = JSON.parse(userObjectString);
      return userObject;
    }
    return null;
  }
}