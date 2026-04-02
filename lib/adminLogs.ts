import { adminApi } from './api';

export type LogAction =
    | 'product_add' | 'product_edit' | 'product_delete'
    | 'category_add' | 'category_edit' | 'category_delete'
    | 'order_status' | 'order_cancel' | 'order_delete'
    | 'user_role' | 'user_delete'
    | 'comment_delete' | 'message_read' | 'message_delete'
    | 'subscriber_delete' | 'inventory_sync';

export const logAdminAction = async (action: LogAction, details: string, adminName: string = 'Directeur') => {
    try {
        await adminApi.createLog({ action, details, admin_name: adminName });
    } catch (error) {
        console.error("Error logging admin action:", error);
    }
};
