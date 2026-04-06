-- Create districts table
CREATE TABLE districts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Insert predefined districts
INSERT INTO districts (name) VALUES
('Surigao Metro District'),
('Surigao Suborb District'),
('Sison District'),
('Siargao District'),
('Dinagat South District'),
('Dinagat North District'),
('Claver District'),
('Bad-as District'),
('Mainit District'),
('Malimono District'),
('Kitcharao District');

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  district_id INTEGER REFERENCES districts(id) NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')) NOT NULL,
  age INTEGER NOT NULL,
  arrived_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_roles table
CREATE TABLE admin_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('global', 'district')),
  district_id INTEGER REFERENCES districts(id) CHECK (
    (role = 'global' AND district_id IS NULL) OR
    (role = 'district' AND district_id IS NOT NULL)
  ),
  UNIQUE(user_id)
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public can insert profiles
CREATE POLICY "Public can insert profiles" ON profiles
  FOR INSERT
  WITH CHECK (true);

-- Admins can view/update profiles
CREATE POLICY "Global admins can view all profiles" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'global'
    )
  );

CREATE POLICY "Global admins can update all profiles" ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'global'
    )
  );

CREATE POLICY "District admins can view their district profiles" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'district'
      AND admin_roles.district_id = profiles.district_id
    )
  );

CREATE POLICY "District admins can update their district profiles" ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'district'
      AND admin_roles.district_id = profiles.district_id
    )
  );

CREATE POLICY "Global admins can delete profiles" ON profiles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'global'
    )
  );

CREATE POLICY "District admins can delete their district profiles" ON profiles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'district'
      AND admin_roles.district_id = profiles.district_id
    )
  );

-- Admin roles RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view their own role" ON admin_roles
  FOR SELECT
  USING (user_id = auth.uid());

-- Districts RLS
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view districts" ON districts
  FOR SELECT
  USING (true);
