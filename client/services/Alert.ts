import { toast } from 'sonner'

export default class Alert {
    static send(msg: string, success: boolean): void {
        if (success) {
            toast.success(msg, {
                position: "bottom-right",
            })
        } else {
            console.error(msg)
            toast.error(msg, {
                position: 'bottom-right',
            })
        }
    }
}