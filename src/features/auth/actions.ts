"use server";

import { prisma } from "../../../prisma/prisma.client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const createSession = async (userId: string) => {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
	const cookieStore = await cookies();

	cookieStore.set("session_id", userId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
};

export async function checkAuth() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get("session_id")?.value;

	// Возвращаем true, если id сессии существует
	return !!sessionId;
}

// Экшен Регистрации
export async function registerUser(formData: { name: string; email: string; passwordHash: string }) {
	try {
		const { name, email, passwordHash } = formData;

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return { error: "Пользователь с таким Email уже зарегистрирован" };
		}

		const hashedPassword = await bcrypt.hash(passwordHash, 10);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: hashedPassword,
				cart: {
					create: {},
				},
			},
		});

		await createSession(newUser.id);
		return { success: true };
	} catch (error) {
		console.error("Ошибка регистрации:", error);
		return { error: "Что-то пошло не так при регистрации" };
	}
}

// Экшен Входа
export async function loginUser(formData: { email: string; passwordHash: string }) {
	try {
		const { email, passwordHash } = formData;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || !user.passwordHash) {
			return { error: "Неверный Email или пароль" };
		}

		const isPasswordValid = await bcrypt.compare(passwordHash, user.passwordHash);

		if (!isPasswordValid) {
			return { error: "Неверный Email или пароль" };
		}

		await createSession(user.id);
		return { success: true };
	} catch (error) {
		console.error("Ошибка входа:", error);
		return { error: "Что-то пошло не так при входе" };
	}
}

// Единственный экшен Выхода
export async function logoutUser() {
	const cookieStore = await cookies();
	cookieStore.delete("session_id");
}
