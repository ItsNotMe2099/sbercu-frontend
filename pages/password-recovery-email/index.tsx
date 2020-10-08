import { passwordRecoveryReset } from "pages/password-recovery-email/actions";
import EmailFormSection from "pages/password-recovery-email/components/EmailFormSection";
import EmailSent from "pages/password-recovery-email/components/EmailSent";
import { useEffect } from "react";
import { IRootState } from "types";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
export default function PasswordRecoveryEmail() {
  const formIsSuccess = useSelector((state: IRootState) => state.PWRecoverEmail.formIsSuccess)

    return (
      <>
      {formIsSuccess === true ? <EmailSent/> : <EmailFormSection/>}
      </>
  )
}
