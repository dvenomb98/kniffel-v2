import { cookies } from "next/headers"
import { createClient } from "./supabase/server"
import { getErrorMessage } from "./utils"
import { UserData } from "@/types/userTypes"

export const getUserData = async () => {
    const cookiesStore = cookies()
    const client = createClient(cookiesStore)

    const {
		data: { user },
		error,
	} = await client.auth.getUser();

	if (error) {
		const errorM = getErrorMessage(error);
		throw new Error(errorM.message, { cause: errorM?.cause });
	}

    const {data: userData, error: dataError } = await client.from("users_table").select().eq("userId", user?.id)

    if(dataError) {
        const errorM = getErrorMessage(dataError);
		throw new Error(errorM.message, {cause: errorM});
    }

    return {
        user: user,
        userData: userData[0] as UserData
    }
}

export const getGameData = async (gameId: string) => {
    const cookiesStore = cookies()
    const client = createClient(cookiesStore)

    const {data, error} = await client.from("sessions_table").select().eq("id", gameId)

    if (error) {
		const errorM = getErrorMessage(error);
		throw new Error(errorM.message, { cause: errorM?.cause });
	}

    return data[0]



}