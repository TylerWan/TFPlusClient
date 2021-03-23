import useSWR from 'swr'
import useAuthKey from "./useAuthKey";
import {useCookies} from "react-cookie";
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useSelfAccountInfo() {
    const { data, error } = useSWR(()=> '/api/user/self', fetcher)
    return {
        userInfo: data,
        isLoading: !error && !data,
        isError: error
    }
}
