"use client";

import { useState } from "react";
import { changePasswordAction } from "@/src/features/user/model/actions";

export function ChangePasswordForm() {
	const [error, setError] = useState<string>("");

	return (
		<form
			action={async (formData) => {
				const result = await changePasswordAction(formData);
				if (result?.error) setError(result.error);
				else alert("Пароль успешно изменен");
			}}
			className="flex flex-col gap-4"
		>
			<input type="password" name="oldPassword" placeholder="Текущий пароль" className="border p-3 rounded" required />
			<input type="password" name="newPassword" placeholder="Новый пароль" className="border p-3 rounded" required />
			<button type="submit" className="bg-black text-white py-3 rounded uppercase font-medium hover:bg-zinc-800">
				Сменить пароль
			</button>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</form>
	);
}
