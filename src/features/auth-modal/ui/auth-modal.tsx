"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/src/shared/ui/card";
import { loginUser, registerUser } from "../../auth/actions"
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (isLogin) {
      // Логика Входа
      const result = await loginUser({ email, passwordHash: password });
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onClose();
        router.refresh(); // Обновляем страницу, чтобы применился статус авторизации
      }
    } else {
      // Логика Регистрации
      const result = await registerUser({ name, email, passwordHash: password });
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        onClose();
        router.refresh();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md relative animate-in fade-in zoom-in-95 duration-200 bg-white text-black border border-gray-100 shadow-2xl">
        <Button
          variant="ghost"
          size="icon-sm"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 cursor-pointer"
          disabled={isLoading}
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader className="pt-6">
          <CardTitle className="text-2xl font-bold tracking-wide text-black">
            {isLogin ? "Вход в аккаунт" : "Регистрация"}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            
            {/* Вывод ошибки */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg font-medium border border-red-100">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Ваше имя</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="bg-gray-50 text-black border-gray-200 focus-visible:border-black"
                  required={!isLogin}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="bg-gray-50 text-black border-gray-200 focus-visible:border-black"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 text-black border-gray-200 focus-visible:border-black"
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-6 mt-6">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full font-bold bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : isLogin ? (
                "Войти"
              ) : (
                "Создать аккаунт"
              )}
            </Button>

            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => {
                setError(null);
                setIsLogin(!isLogin);
              }}
              className="text-xs uppercase tracking-wider text-gray-500 hover:text-black font-bold cursor-pointer transition-colors"
              disabled={isLoading}
            >
              {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}