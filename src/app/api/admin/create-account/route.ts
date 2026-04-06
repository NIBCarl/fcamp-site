import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify global admin
    const { data: adminRole } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!adminRole || adminRole.role !== 'global') {
      return NextResponse.json({ error: 'Forbidden. Only global admins can create accounts.' }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, district_id } = body;

    if (!email || !password || !district_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server misconfiguration: missing SUPABASE_SERVICE_ROLE_KEY env variable' }, { status: 500 });
    }

    // Initialize Supabase Admin Client using Service Role Key
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create the user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto confirm so they can login immediately
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
        return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    const newUserId = authData.user.id;

    // 2. Insert into admin_roles
    const { error: roleError } = await supabaseAdmin
      .from('admin_roles')
      .insert({
        user_id: newUserId,
        role: 'district',
        district_id: district_id
      });

    if (roleError) {
      // Rollback (delete the created user since role assignment failed)
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: roleError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'District Admin account created successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
