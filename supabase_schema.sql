-- ==============================================================================
-- FONDATION NFON MAYAP — SCHEMA DE BASE DE DONNEES SUPABASE
-- Tables pour la gestion des formulaires de contact et promesses de partenariat
-- ==============================================================================

-- 1. Table des messages de contact
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'nouveau',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active le Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique autorisant les visiteurs du site à insérer un nouveau message
CREATE POLICY "Permettre l'insertion publique des messages de contact"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Politique permettant aux administrateurs connectés de lire les messages
CREATE POLICY "Permettre aux administrateurs de lire les messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (true);


-- 2. Table des promesses de partenariat et de soutien
CREATE TABLE IF NOT EXISTS public.support_pledges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    support_type TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'en_attente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active le Row Level Security (RLS)
ALTER TABLE public.support_pledges ENABLE ROW LEVEL SECURITY;

-- Politique autorisant les visiteurs à soumettre une promesse de soutien
CREATE POLICY "Permettre l'insertion publique des soutiens"
    ON public.support_pledges
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Politique permettant aux administrateurs connectés de lire les promesses
CREATE POLICY "Permettre aux administrateurs de lire les promesses"
    ON public.support_pledges
    FOR SELECT
    TO authenticated
    USING (true);
