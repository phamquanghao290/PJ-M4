import { notification } from "antd";

const success = (type: string) => {
    notification.success({
        message: type,
        style: {
            top: 50,
        }
    })
}

const failed = (type: string) => {
    notification.error({
        message: type,
        style: {
            top: 50,
        }
    })
}

export { success, failed }