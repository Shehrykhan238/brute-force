"use client";
import { logo } from "@/images/Images";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { closeModal, toggleModal } from "@/store/modalSlice";
import { useForm } from "react-hook-form";
import { handleLogin } from "@/lib/helper/loginHandler";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";


const CheckoutLogin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const supabase = getSupabaseBrowserClient();

        const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
        } = useForm();
          const onSubmit = async (data: any) => {

            const email = data?.email;
            const password = data?.password;
            try{
              setLoading(true)
                  const { data: user, error: loginError } = await  supabase.auth.signInWithPassword({
                  email : email,
                  password : password,
                })

                  if(loginError?.message === "Invalid login credentials"){
                console.log("Email Or Password wasn't correct!")
                setLoading(false)
                return
              }

            if (loginError) {
              console.log("error", loginError.message)
              setLoading(false)
              throw new Error
            }
            setLoading(false)
            router.refresh()
            router.replace('/checkout')
            }catch(error){
              console.log(error)
            }
          };
        
    
  return (
    <div className='w-full min-h-screen font-maven  '> 
    <div  className=" w-[80%]  mx-auto  my-10 flex items-center justify-center gap-4  ">

    <div  className="w-[40%] p-4  ">


    <div className="flex flex-col items-center justify-center gap-2  ">
          {/* center  */}
          <div className="p-4">
            <h2 className="text-black font-maven text-2xl font-semibold  ">
              Guest Checkout
            </h2>
            <div  className="mt-3">
            <p className="font-semibold ">Want free shipping?</p>
            <p  className="text-md ">Sign up for  <span className="text-[#F53393] font-bold">FLX Membership</span>  (it’s free!) and get free standard shipping on every order.</p>
            </div>
          </div>

          {/* Bottom */}
          <div
            className=" bg-gray-50  w-full p-4"
          >
          

            <div className="w-full  flex flex-col gap-2 mt-6">
              <Link
              href={'/checkout'}
                type="button"
                className="bg-black text-white font-maven h-12 text-center 
                    border  rounded-none p-2  cursor-pointer text-md ">
                  Checkout as guest
              </Link>
              <Button
                type="button"
                onClick={() => router.push('/register')}
                className="bg-white  text-black font-semibold  font-maven h-12 border border-gray-600  rounded-none p-2  cursor-pointer  text-md 
                    shadow-[5px_5px_0px_0px_#EC4899]  text-center  hover:shadow-[7px_7px_0px_0px_#EC4899] 
                    "
              >
                Join for free shipping 
              </Button>
            </div>
          </div>
        </div>
    </div>



     <div  className="w-[43%] px-6  p-4 border-l border-gray-300   ">
    <div className="flex flex-col items-center justify-center gap-2 ">
          {/* center  */}
          <div className=" p-4">
            <h2 className="text-black font-maven text-2xl font-semibold  ">
              Sign in 
            </h2>
            <p  className="text-gray-800 lg:text-md text-[14px] mt-2 ">Sign in to secure free shipping and earn points on this order with FLX Membership</p>
          </div>

          {/* Bottom */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-gray-50  w-full   p-4 "
          >
            <input
              {...register("email")}
              required
              className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
              type="email"
              placeholder="Email Address*"
            />
            <input
              {...register("password")}
              required
              className="w-full mt-2 bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
              type="password"
              placeholder="Password*"
            />

            <div className="w-full  flex flex-col gap-2 mt-6">
              <Button
                type="submit"
                className="bg-black text-white font-maven h-12
                    border  rounded-none p-2  cursor-pointer text-md "
              >
                {loading ? (
                  <Spinner className="text-gray-300 w-6 h-6 " />
                ) : (
                  "Sign in"
                )}
              </Button>
              <Button
                type="button"
                onClick={() => router.push('/register')}
                className="bg-white  text-black   font-maven h-12 border border-gray-600  rounded-none p-2  cursor-pointer  text-md 
                    shadow-[5px_5px_0px_0px_#EC4899]  text-center  hover:shadow-[7px_7px_0px_0px_#EC4899] 
                    "
              >
                Join FLX
              </Button>
            </div>
          </form>
        </div>
    </div>

            </div>
    </div>
  )
}

export default CheckoutLogin
