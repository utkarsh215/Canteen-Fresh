import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
export default function EmailVerifyFailure(){
    const navigate=useNavigate();
    return(
        <>
        
<section className="mt-4 mb-4 rounded-xl border-2 border-yellow-400 max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6 bg-white">
  <form class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-3xl">
      <div class="mt-28 w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
                <h2 class="font-manrope font-bold text-5xl leading-10 text-black text-center max-md:text-4xl">
                    Email Verification Failed!
                </h2>
                <p class="mt-12 font-normal text-lg leading-8 text-gray-500 mb-11 text-center max-md:mt-5">
                Invalied Link, Register Now!</p>
            </div>
      <div class="mt-6 sm:mt-8">
        <div class="relative overflow-x-auto border-b border-gray-200 ">
          <table class="w-full text-left font-medium text-gray-900  md:table-fixed">
            <tbody class="divide-y divide-gray-300">
            </tbody>
          </table>
        </div>

        <div class="mt-4 space-y-6">
          <div class="gap-4 sm:flex sm:items-center">
          <button type="button" onClick={()=>{navigate("/register")}}class="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-400 hover:bg-slate-950 focus:outline-none w-full bg-primary-600 hover:bg-primary-700 focus:ring-4focus:ring-primary-300 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Signup</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</section>
        </>
    )
}