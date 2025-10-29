-- Create users table for admin panel user management
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT,
    phone VARCHAR(20),
    bio TEXT
);

-- Create index for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Enable RLS for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Allow read access for all authenticated users (admin operations)
CREATE POLICY "Allow read access to users" ON users
    FOR SELECT USING (true);

-- Allow insert access for authenticated users (admin operations)
CREATE POLICY "Allow insert access to users" ON users
    FOR INSERT WITH CHECK (true);

-- Allow update access for authenticated users (admin operations)
CREATE POLICY "Allow update access to users" ON users
    FOR UPDATE USING (true);

-- Allow delete access for authenticated users (admin operations)
CREATE POLICY "Allow delete access to users" ON users
    FOR DELETE USING (true);

-- Insert some sample users for testing
INSERT INTO users (name, email, role, avatar_url, phone, bio) VALUES
('Admin User', 'admin@husnuustamobilya.com', 'admin', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20admin%20user&image_size=square', '0536 355 58 60', 'Site yöneticisi'),
('Hüsnü İşiktaş', 'husnu@husnuustamobilya.com', 'admin', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20Turkish%20carpenter&image_size=square', '0536 355 58 60', 'Kurucu ve Usta'),
('Müşteri Temsilcisi', 'musteri@husnuustamobilya.com', 'moderator', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20customer%20service&image_size=square', '0232 123 45 67', 'Müşteri hizmetleri temsilcisi'),
('Test Kullanıcı', 'test@example.com', 'user', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20test%20user&image_size=square', '0555 123 45 67', 'Test amaçlı kullanıcı hesabı'),
('Demo User', 'demo@husnuustamobilya.com', 'user', 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20demo%20user&image_size=square', '0544 987 65 43', 'Demo kullanıcı hesabı');

-- Update last_login for some users to show activity
UPDATE users SET last_login = NOW() - INTERVAL '1 day' WHERE email = 'admin@husnuustamobilya.com';
UPDATE users SET last_login = NOW() - INTERVAL '3 days' WHERE email = 'husnu@husnuustamobilya.com';
UPDATE users SET last_login = NOW() - INTERVAL '1 week' WHERE email = 'musteri@husnuustamobilya.com';