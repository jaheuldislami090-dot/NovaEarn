import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const user = body?.user;

    if (!user?.id) {
      return NextResponse.json(
        { error: "Telegram user not found" },
        { status: 400 }
      );
    }

    const telegramId = String(user.id);

    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("telegram_id", telegramId)
      .maybeSingle();

    if (findError) {
      return NextResponse.json(
        { error: findError.message },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json({
        success: true,
        user: existingUser,
        isNew: false
      });
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        telegram_id: telegramId,
        username: user.username || null,
        first_name: user.first_name || null,
        last_name: user.last_name || null
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: newUser,
      isNew: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
    }
