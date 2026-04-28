UPDATE public.profiles SET status = 'approved' WHERE id = '1c71c7ee-d35a-4f14-9699-1903bef3bb3b';
DELETE FROM public.user_roles WHERE user_id = '1c71c7ee-d35a-4f14-9699-1903bef3bb3b';
INSERT INTO public.user_roles (user_id, role) VALUES ('1c71c7ee-d35a-4f14-9699-1903bef3bb3b', 'admin');