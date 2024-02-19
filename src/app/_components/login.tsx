"use client"
import { signIn } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
export default function Login() {
  const handleSubmit = async ({ email, password }: any) => {
    console.log({ email, password })
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return <Card className='flex p-7 flex-col gap-5 justify-center items-center text-sm'>
    <div className='self-start'>Login or Signup</div>
    <Input className='rounded-2xl' type="email" placeholder="Email" />
    <Input className='rounded-2xl' type="password" placeholder="Password" />
    <div>Forgot your Password</div>
    <div className='flex w-full justify-start items-center gap-3'>
      <Button className='rounded-3xl w-[40%]'>Continue</Button>
      <div className='text-sm'>Continue With Email</div>
    </div>

    <div className='grid grid-cols-12 justify-center items-center w-full gap-1 text-xs'>
      <div className='col-span-1 h-[1px] bg-gray-300'></div>
      <div className='col-span-3 items-center justify-center flex'>
        Or Continue With
      </div>
      <div className='col-span-7 h-[1px] bg-gray-300'></div>
    </div>
    <div className='flex justify-center w-full items-center gap-3'>
      <Button className='rounded-3xl w-[25%]'>Facebook</Button>
      <Button className='rounded-3xl w-[25%]'>Apple Id</Button>
      <Button className='rounded-3xl w-[25%]'>Google</Button>
    </div>
  </Card >
}

//<button onClick={() => { handleSubmit({ email: "admin", password: "admin" }) }}>login</button>
