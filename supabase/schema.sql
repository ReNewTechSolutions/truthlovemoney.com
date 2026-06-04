create table if not exists public.vault_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entry_type text not null,
  title text not null,
  content text not null,
  status text not null default 'new'
);

alter table public.vault_entries enable row level security;

create policy "Authenticated users can read vault entries"
on public.vault_entries
for select
to authenticated
using (true);

create policy "Authenticated users can create vault entries"
on public.vault_entries
for insert
to authenticated
with check (true);

create policy "Authenticated users can update vault entries"
on public.vault_entries
for update
to authenticated
using (true)
with check (true);
