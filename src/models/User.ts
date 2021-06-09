import { MenuItem } from "./menuItem";
import { Role } from "./role";

export class User {
    userId: string;
    username: string;
    password: string;
    token?: string;
    role: string[];
    permissionList: string[];
    menuItem = new Map();
}