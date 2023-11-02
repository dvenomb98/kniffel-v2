import { getUserData } from "@/lib/server-utils";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
      const { userData } = await getUserData();
      const { body: gameValues } = await request.json();
      const client = createClient(cookies());
  
      // Check if the update has already been done to prevent duplicate updates.
      const updateField = userData.userId === gameValues.winner ? 'winner' : 'loser';
      if (gameValues.updates[updateField]) {
        return new Response(JSON.stringify({ message: "User already updated!" }), { status: 409 });
      }
  
      // Prepare updates for the user statistics.
      const statsUpdate = {
        wins: userData.statistics.wins + (updateField === 'winner' ? 1 : 0),
        losts: userData.statistics.losts + (updateField === 'loser' ? 1 : 0),
      };
  
      // Update the user's statistics.
      const { error: userUpdateError } = await client
        .from("users_table")
        .update({ statistics: statsUpdate })
        .eq("userId", userData.userId);
  
      if (userUpdateError) {
        throw new Error(userUpdateError.message);
      }
  
      // Update the game session to reflect the completed update.
      const sessionUpdates = { [updateField]: true };
      const { error: sessionUpdateError } = await client
        .from("sessions_table")
        .update({ updates: sessionUpdates })
        .eq("id", gameValues.id);
  
      if (sessionUpdateError) {
        throw new Error(sessionUpdateError.message);
      }
  
      return new Response(JSON.stringify({ message: "User data updated successfully" }), { status: 200 });
    } catch (e: any) {
      // Simplified error response using optional chaining.
      return new Response(JSON.stringify({ message: e?.message || "Unknown Error occurred" }), { status: 500 });
    }
  }
