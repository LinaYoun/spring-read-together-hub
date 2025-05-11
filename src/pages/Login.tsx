import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Lock } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MemberType } from './Signup';

// Define login form schema
const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your username."
  }),
  password: z.string().min(1, {
    message: "Please enter your password."
  })
});
type LoginFormValues = z.infer<typeof loginFormSchema>;

// Define UserStatus type to match the Admin.tsx file
type UserStatus = 'pending' | 'approved' | 'rejected';

// Mock user data with properly typed status - in a real app, this would come from your API/backend
const mockUsers: {
  username: string;
  status: UserStatus;
  memberType: MemberType;
}[] = [{
  username: 'janesmith',
  status: 'pending',
  memberType: 'Member'
}, {
  username: 'markjohnson',
  status: 'pending',
  memberType: 'Member'
}, {
  username: 'saraconnor',
  status: 'pending',
  memberType: 'Librarian'
}, {
  username: 'robertkim',
  status: 'approved',
  memberType: 'Member'
}, {
  username: 'emilywong',
  status: 'rejected',
  memberType: 'Librarian'
}];
const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const onSubmit = (values: LoginFormValues) => {
    // Check for admin credentials first
    if (values.username === 'admin' && values.password === 'admin') {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: values.username,
        role: 'admin'
      }));
      toast.success("Admin login successful!", {
        description: "Welcome to Admin Dashboard"
      });

      // Redirect to admin page
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
      return;
    }

    // Mock login verification for regular users
    const user = mockUsers.find(u => u.username === values.username);

    // Check if user exists and is approved
    if (user) {
      if (user.status === 'approved') {
        // Store user info in localStorage for approved users
        localStorage.setItem('user', JSON.stringify({
          username: values.username,
          memberType: user.memberType
        }));

        // Show success message for approved users
        toast.success("Login successful!", {
          description: `Welcome to Spring Book Club as a ${user.memberType}!`
        });

        // Redirect to homepage after successful login
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if (user.status === 'pending') {
        // Show pending message
        toast.error("Account pending approval", {
          description: "Your account is awaiting administrator approval."
        });
      } else {
        // Show rejection message
        toast.error("Account access denied", {
          description: "Your registration request has been rejected."
        });
      }
    } else {
      // User not found
      toast.error("Login failed", {
        description: "Invalid username or password"
      });
    }
  };
  return <Layout>
      <div className="container max-w-md mx-auto py-8">
        <Card className="border border-bookish-maroon/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif text-bookish-maroon">Login</CardTitle>
            <CardDescription>
              Sign in to Spring Book Club
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="username" render={({
                field
              }) => <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-bookish-maroon/70" />
                          <Input placeholder="Enter your username" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-bookish-maroon/70" />
                          <Input placeholder="Enter password" className="pl-10" type="password" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-bookish-maroon hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full bg-bookish-maroon hover:bg-bookish-dark">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-bookish-maroon hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>;
};
export default Login;