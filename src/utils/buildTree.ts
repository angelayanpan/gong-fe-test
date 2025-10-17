import type { User } from '../types/user';

export function buildTree(users: User[]): User[] {

    const userMap = new Map<number, User>(); //dedupe and clean
    const roots = new Set<User>();  //these users do not have a manager

    users.forEach(user=> {
        const copy = {...user};
        copy.children = [];
        userMap.set(user.id, copy);
        if(!copy.managerId){
            roots.add(copy);
        }
    })
    // connect the node
    userMap.forEach(user => {
        if (user.managerId) {
            const manager = userMap.get(user.managerId);
            if (manager) {
                manager.children!.push(user);
            }
        }
    });

    return [...roots];
}