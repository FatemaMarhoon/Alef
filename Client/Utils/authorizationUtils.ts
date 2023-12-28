// authorizationUtils.ts

import { getPlan, currentUserRole, currentPreschool } from '@/services/authService';

interface AuthorizationInfo {
    plan?: number;
    role?: string; // Replace with the actual type of the role
    preschool_id?: number; // Replace with the actual type of the preschool_id
}

export const checkAuthorization = async (): Promise<AuthorizationInfo> => {
    try {
        const plan = await getPlan();
        // Assuming you have functions to get role and preschool_id, replace with the actual functions
        const role = await currentUserRole();
        const preschool_id = await currentPreschool();
        console.log("plan:", plan, role, preschool_id);

        // Check conditions and return the object
        return {
            plan: typeof plan === 'number' ? plan : undefined,
            role: typeof role === 'string' ? role : undefined,
            preschool_id: typeof preschool_id === 'number' ? preschool_id : undefined,
        };
    } catch (error) {
        console.error('Error checking authorization:', error);
        return {};
    }
};
