
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// 로그인 폼 스키마 정의
const loginFormSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    // 여기에서 백엔드에 로그인 요청을 보내게 됩니다
    console.log(values);
    
    // 성공 메시지 표시
    toast.success("로그인 성공!", {
      description: "Spring Book Club에 오신 것을 환영합니다!",
    });
    
    // 로그인 성공 후 홈페이지로 리디렉션
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-8">
        <Card className="border border-bookish-maroon/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif text-bookish-maroon">로그인</CardTitle>
            <CardDescription>
              Spring Book Club에 로그인하세요
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-bookish-maroon/70" />
                          <Input 
                            placeholder="email@example.com" 
                            className="pl-10"
                            type="email" 
                            {...field} 
                          />
                        </div>
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
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-bookish-maroon/70" />
                          <Input 
                            placeholder="비밀번호 입력" 
                            className="pl-10"
                            type="password" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-bookish-maroon hover:underline">
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-bookish-maroon hover:bg-bookish-dark"
                >
                  로그인
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center">
              계정이 없으신가요?{" "}
              <Link to="/signup" className="text-bookish-maroon hover:underline">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
