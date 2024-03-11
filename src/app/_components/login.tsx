"use client"
import { signIn } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '~/components/ui/use-toast';
import Link from 'next/link';
import LoginWithGoogle from './auth/loginWithGoogle';
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Invalid Password',
  }),
})
export default function Login() {

  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;
    console.log({ email, password })
    toast({
      title: "Signing In",
    })
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  }
  return <Card className='flex p-2 md:p-7  flex-col gap-5 justify-center items-center text-sm'>
    <div>Login or Signup</div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className='rounded-2xl' type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className='rounded-2xl' type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
        <div>Forgot your Password</div>
        <div className='grid grid-cols-2 w-full  gap-3'>
          <Button type="submit" className='rounded-3xl col-span-1'>Login</Button>
          <Link className='w-full' href="/registration">
            <Button type="button" className='rounded-3xl col-span-1'>Signup</Button>
          </Link>
        </div>

      </form>
    </Form>

    <div className='flex justify-center items-center w-full gap-1 text-xs'>
      <div className='h-[1px] w-[30%] bg-gray-300'></div>
      <div >
        Or Continue With
      </div>
      <div className=' h-[1px] bg-gray-300 w-[30%]'></div>
    </div>
    <div className='flex justify-center w-full items-center gap-3'>
      <LoginWithGoogle></LoginWithGoogle>
    </div>
  </Card >
}

//<button onClick={() => { handleSubmit({ email: "admin", password: "admin" }) }}>login</button>
