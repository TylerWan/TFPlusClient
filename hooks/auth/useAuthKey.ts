import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";

export default function useAuthKey() {
    const [cookies, setCookie, removeCookie] = useCookies(['tfplusauthkey']);
    const [authKey, setAuthKey] = useState(null);

    useEffect(()=>{
        return () => {
            setAuthKey(cookies['tfplusauthkey'])
        }
    })
    return {
        authKey
    }
}
