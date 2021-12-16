import NewPWFormSection from "components/auth/password-reset/components/NewPWFormSection";
import useBodyClass from "components/hooks/useBodyClass";

export default function PasswordRecoveryNew() {
  useBodyClass('grey');
  return (
         <NewPWFormSection/>
  )
}
