// project related helper function goes here
import { toast } from "react-hot-toast";

export const validateAndGetJson = (schemaAttributes) => {
    let hasDuplicate = hasDuplicateNames(schemaAttributes);
    if (!hasDuplicate) {
        try {
            return JSON.stringify(schemaAttributes);
        } catch (error) {
            toast.error("Error while json conversion");
            return null;
        }
    }
};

export const hasDuplicateNames = (arr) => {
    const keys = new Set();
    for (const obj of arr) {
        if (!obj.key || !obj.value) {
            toast.error("Key and Value both are required for all fields.");
            return true;
        }
        if (keys.has(obj.key)) {
            toast.error("Duplicate Keys are not allowed. Key must be unique.");
            return true;
        }
        keys.add(obj.key);
    }
    return false;
};
