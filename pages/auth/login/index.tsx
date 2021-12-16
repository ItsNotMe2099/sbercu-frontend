import AuthSection from "components/auth/login/components/AuthSection";
import useBodyClass from "components/hooks/useBodyClass";

export default function AuthPage() {
    useBodyClass('grey');
  return (
          <AuthSection />
  )
}
