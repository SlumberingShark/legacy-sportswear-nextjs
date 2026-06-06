"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/shared/ui/card";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isLogin) {
			console.log("Вход:", { email, password });
		} else {
			console.log("Регистрация:", { name, email, password });
		}
		setName("");
		setEmail("");
		setPassword("");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
			{/* Сделали bg-white и text-black принудительно, чтобы карточка была белой */}
			<Card className="w-full max-w-md relative animate-in fade-in zoom-in-95 duration-200 bg-white text-black border border-gray-100 shadow-2xl">
				<Button
					variant="ghost"
					size="icon-sm"
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
					aria-label="Закрыть"
				>
					<X className="w-4 h-4" />
				</Button>

				<CardHeader className="pt-6">
					<CardTitle className="text-2xl font-bold tracking-wide text-black">{isLogin ? "Вход в аккаунт" : "Регистрация атлета"}</CardTitle>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
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
							/>
						</div>
					</CardContent>

					{/* mt-6 дает отличный зазор между инпутами и кнопкой войти */}
					<CardFooter className="flex flex-col gap-4 pb-6 mt-6">
						<Button type="submit" size="lg" className="w-full font-bold bg-black text-white hover:bg-gray-900 transition-colors">
							{isLogin ? "Войти" : "Создать аккаунт"}
						</Button>

						{/* Добавлен cursor-pointer и изменен цвет на серый, переходящий в черный */}
						<Button
							type="button"
							variant="link"
							size="sm"
							onClick={() => setIsLogin(!isLogin)}
							className="text-xs uppercase tracking-wider text-gray-500 hover:text-black font-bold cursor-pointer transition-colors"
						>
							{isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
