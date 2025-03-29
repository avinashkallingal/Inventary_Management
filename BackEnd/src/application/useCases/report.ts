import { IOrder } from "../../domain/entities/IOrder";
import { ReportRepository } from "../../infrastructure/persistance/repository/reportRepository";
import uploadImage from "../../application/services/upload/upload";



export class ReportService {
    private reportRepo: ReportRepository

    constructor() {
        this.reportRepo = new ReportRepository();
    }

    async getSalesReport() {
        try {
          
          
                const result = await this.reportRepo.getSalesReport();
                if (result) {
                    return { success: true, message: 'sales report successfully created.',report:result };
                } else {
                    return { success: false, message: 'sales report  failed. Please try again later.' };
                }
         
        } catch (error) {
            console.error('Error in AddItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    
    async getItemsReport() {
        try {
          
          
                const result = await this.reportRepo.getItemsReport();
                if (result) {
                    return { success: true, message: 'items report successfully created.',report:result };
                } else {
                    return { success: false, message: 'sales report  failed. Please try again later.' };
                }
         
        } catch (error) {
            console.error('Error in AddItem:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    

    async getCustomerLedger(data:string) {
        try {
            const result = await this.reportRepo.getCustomerLedger(data)
            if (result) {
                return { success: true, message: 'ledger details fetched successful', report: result }
            }
            return { success: false, message: 'Failed to fect ledger data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }




      async getOrders() {
        try {
            const result = await this.reportRepo.getOrders()
            if (result) {
                return { success: true, message: 'Blog details fetched successful', itemData: result }
            }
            return { success: false, message: 'Failed to fect Blog data.' };
        } catch (error) {
            console.error('Error in getBlog:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

 

}