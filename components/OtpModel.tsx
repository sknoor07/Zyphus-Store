import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { set } from "zod";
import { is } from "zod/locales";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { link } from "fs";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";


type OtpModelProps={
  email:string,
  accountId:string
}

function OtpModel(otpModelProps:OtpModelProps) {
  const {email, accountId}=otpModelProps;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const router= useRouter();

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const sessionId= await verifySecret({accountId,password});
      if(sessionId){
        router.push("/");
      }
    }catch(error){
      console.error("OTP verification failed", error);
    }finally{
      setIsLoading(false);
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true);
    await sendEmailOTP(email);
    setIsLoading(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog ">
        <AlertDialogHeader className="relative flex-col justify-center items-center gap-4">
          <AlertDialogTitle className="h2 text-center">Enter Your OTP</AlertDialogTitle>
          <Image 
          src="./assets/icons/close-dark.svg" 
          alt="Close" 
          width={20} height={20} 
          className="otp-close-button" 
          onClick={() => setIsOpen(false)} />
          <AlertDialogDescription className="subtitle-2 justify-center text-light-100">
            We&apos;ve send a code to <span className="pl-1 text-brand">{email} </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot shadow-md"/>
            <InputOTPSlot index={1} className="shad-otp-slot shadow-md"/>
            <InputOTPSlot index={2} className="shad-otp-slot shadow-md"/>
            <InputOTPSlot index={3} className="shad-otp-slot shadow-md"/>
            <InputOTPSlot index={4} className="shad-otp-slot shadow-md"/>
            <InputOTPSlot index={5} className="shad-otp-slot shadow-md"/>
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction className="shad-submit-btn h-12" type="button" onClick={handleSubmit}>Submit {isLoading && <Loader2 className="animate-spin"/>} </AlertDialogAction>
            <div className="flex justify-center">
              Didn&apos;t get a code? 
              <Button type="button" variant="link" className="pl-1 text-brand" onClick={()=>handleResendOtp}>
                click to resend
              </Button>
          </div>
          </div>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OtpModel;