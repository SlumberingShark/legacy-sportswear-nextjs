"use server";
import { prisma } from "@/prisma/prisma.client";
import { compare, hash } from "bcryptjs"; // Убедись, что используешь bcryptjs
import { cookies } from "next/headers";

export async function changePasswordAction(formData: FormData) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  
  // 1. Получаем ID из куки
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_id")?.value;

  if (!userId) return { error: "Вы не авторизованы" };

  // 2. Ищем пользователя
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) return { error: "Пользователь не найден" };
  if (!user.passwordHash) return { error: "У вас не задан пароль" };

  // 3. Сравниваем пароли
  const isMatch = await compare(oldPassword, user.passwordHash);
  if (!isMatch) return { error: "Неверный текущий пароль" };

  // 4. Обновляем
  const hashedPassword = await hash(newPassword, 10);
  await prisma.user.update({ 
    where: { id: userId }, 
    data: { passwordHash: hashedPassword } // Убедись, что поле называется passwordHash, а не password
  });

  return { success: true };
}