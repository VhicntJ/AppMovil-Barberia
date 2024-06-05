import axios from "axios";
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ADNROID } from '@env';
import { Platform } from "react-native";

export const API_URL =
    (STAGE === "prod")
    ? PROD_URL
    : Platform.OS === "ios"
        ? API_URL_IOS
        : API_URL_ADNROID;



const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

// TODO: INTERCEPTORS


export {
    tesloApi,
}