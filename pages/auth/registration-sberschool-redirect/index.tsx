import useBodyClass from "components/hooks/useBodyClass";
import { useRouter } from "next/router";
import { useEffect } from "react";
import cookie from "js-cookie";
export default function AuthPage() {
  useBodyClass('grey');
  const router = useRouter()
  const { token } = router.query
  useEffect(() => {
    if(!token){
      return;
    }
    cookie.set("token", token, { expires: 7 });
    window.location.href = '/';
  }, [token])
  return (
          <></>


  )
}
