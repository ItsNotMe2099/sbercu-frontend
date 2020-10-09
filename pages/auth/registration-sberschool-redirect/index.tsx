import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "js-cookie";
export default function AuthPage() {

  const router = useRouter()
  const { token } = router.query
  useEffect(() => {
    if(!token){
      return;
    }
    cookie.set("token", token, { expires: 1 });
    window.location.href = '/';
  }, [token])
  return (
          <></>


  )
}
