import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type LogAction =
    | 'product_add' | 'product_edit' | 'product_delete'
    | 'category_add' | 'category_edit' | 'category_delete'
    | 'order_status' | 'order_cancel' | 'order_delete'
    | 'user_role' | 'user_delete'
    | 'comment_delete' | 'message_read' | 'message_delete'
    | 'subscriber_delete' | 'inventory_sync';

export const logAdminAction = async (action: LogAction, details: string, adminName: string = 'Directeur') => {
    try {
        await addDoc(collection(db, 'admin_logs'), {
            action,
            details,
            adminName,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error("Error logging admin action:", error);
    }
};
