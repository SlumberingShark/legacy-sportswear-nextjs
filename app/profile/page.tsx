import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma.client"; // Убедись, что импорт верный
import { ChangePasswordForm } from "@/src/features/user/ui/change-password-form";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  // Если нет ID сессии — значит не авторизован
  if (!sessionId) {
    return <div className="max-w-xl mx-auto py-12 px-6">Пожалуйста, войдите в систему</div>;
  }

  // Получаем юзера из БД по ID (который ты хранил в куке)
  const user = await prisma.user.findUnique({
    where: { id: sessionId },
  });

  if (!user) {
    return <div className="max-w-xl mx-auto py-12 px-6">Пользователь не найден</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-8">Профиль</h1>
      <div className="mb-8 bg-zinc-50 rounded-lg">
        <p className="text-sm text-zinc-500">Email</p>
        <p className="font-medium">{user.email}</p>
        <p className="text-sm text-zinc-500 mt-4">Имя</p>
        <p className="font-medium">{user.name}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Безопасность</h2>
      <ChangePasswordForm />
    </div>
  );
}