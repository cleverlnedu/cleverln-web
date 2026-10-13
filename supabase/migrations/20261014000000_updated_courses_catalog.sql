-- Migration: 20261014000000_updated_courses_catalog.sql
-- Updates the course catalog to the 24 modern courses with dedicated Supabase storage blob thumbnails.
-- Safely clears previous demo courses and dependent records in foreign key order.

DELETE FROM public.user_courses;
DELETE FROM public.order_item_courses;
DELETE FROM public.payments;
DELETE FROM public.order_items;
DELETE FROM public.orders;
DELETE FROM public.product_courses;
DELETE FROM public.course_lessons;
DELETE FROM public.course_modules;
DELETE FROM public.store_products;
DELETE FROM public.courses;

INSERT INTO public.users (id, name, email, role, plan)
VALUES ('10000000-0000-4000-8000-000000000001', 'CleverLN Course Team', 'course-team@cleverln.example', 'instructor', 'free')
ON CONFLICT (id) DO NOTHING;

WITH catalog(slug, title, description, image, category, rating, review_count, is_featured, is_recommended, is_trending, display_order) AS (VALUES
  ('agentic-ai', 'Agentic AI', 'Tune to the world of AI-Agents, through skill-up with CleverLN.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/agentic-ai.png', 'Next-Gen AI', 4.8, 780, true, true, false, 1),
  ('prompt-engineering', 'Prompt Engineering', 'Learn Prompt Engineering that turns your everyday words to creative power.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/prompt-engineering.png', 'Next-Gen AI', 4.7, 640, false, true, true, 2),
  ('mlops', 'MLOps', 'Learn MLOps to deploy, scale, and maintain professional AI systems.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/mlops.png', 'Next-Gen AI', 4.9, 512, true, false, true, 3),
  ('generative-ai', 'Generative AI', 'Turn your wildest thoughts into everyday tools with creative Generative AI.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/generative-ai.png', 'Next-Gen AI', 4.8, 890, false, true, true, 4),

  ('financial-analytics', 'Financial Analytics', 'Learn Financial Analytics to predict, scale, and maintain corporate value systems.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/financial-analytics.png', 'Finance', 4.7, 420, true, true, false, 5),
  ('financial-risk-management', 'Financial Risk Management', 'Master Financial Risk Management and become a corporate wealth guardian.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/financial-risk-management.png', 'Finance', 4.6, 380, false, false, true, 6),
  ('fin-tech-engineering', 'Fin-Tech Engineering', 'Learn to code future finance by mastering Fin-Tech Engineering skills.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/fin-tech-engineering.png', 'Finance', 4.8, 460, true, true, true, 7),

  ('ui-ux-design', 'UI/UX Design', 'Learn UI/UX and build your skills in a unique, modern way.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/ui-ux-design.png', 'DesignX', 4.9, 920, true, true, true, 8),
  ('product-designer', 'Product Designer', 'Learn to Design, Prototype, and Ship Apps as a Product Designer.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/product-designer.png', 'DesignX', 4.7, 530, false, true, false, 9),
  ('motion-graphics', 'Motion Graphics', 'Learn to Bring Static Art to Life in This Motion Graphic Course.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/motion-graphics.png', 'DesignX', 4.8, 410, false, false, true, 10),
  ('fashion-designing', 'Fashion Designing', 'Learn Fashion Designing Theory and Master Creative Structural Design Basic.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/fashion-designing.png', 'DesignX', 4.6, 340, true, false, false, 11),

  ('java-full-stack-developer', 'Java Full Stack Developer', 'Learn to Master Back-end and Front-end Systems as a Java Full Stack Developer.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/java-full-stack-developer.png', 'Tech Pro', 4.9, 1050, true, true, true, 12),
  ('automation-testing', 'Automation Testing', 'Learn Technical Inspection Capabilities By Mastering Modern Automation Testing.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/automation-testing.png', 'Tech Pro', 4.7, 490, false, false, true, 13),
  ('devops-engineering', 'DevOps Engineering', 'Launch Your Tech Future Today By Learning To Be A DevOps Engineer.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/devops-engineering.png', 'Tech Pro', 4.8, 720, true, true, true, 14),
  ('python-developer', 'Python Developer', 'Start Learning Backend Software Architecture As A Certified Python Developer.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/python-developer.png', 'Tech Pro', 4.8, 880, false, true, false, 15),

  ('hr-analytics-specialist', 'HR Analytics Specialist', 'Uses people data and insights to improve workforce planning and organizational performance.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/hr-analytics-specialist.png', 'HR Skills', 4.7, 380, true, true, false, 16),
  ('talent-acquisition-lead', 'Talent Acquisition Lead', 'Leads recruitment strategies to attract, assess, and hire top talent.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/talent-acquisition-lead.png', 'HR Skills', 4.8, 410, false, false, true, 17),
  ('people-operations-manager', 'People Operations Manager', 'Manages employee experiences, HR processes, policies, and workplace operations.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/people-operations-manager.png', 'HR Skills', 4.6, 320, true, true, false, 18),
  ('internal-recruitment-coordinator', 'Internal Recruitment Coordinator', 'Coordinates internal hiring processes and connects employees with new opportunities.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/internal-recruitment-coordinator.png', 'HR Skills', 4.6, 290, false, false, true, 19),

  ('digital-marketing', 'Digital Marketing', 'Master modern digital marketing campaigns, SEO, SEM, and multi-channel brand growth.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/digital-marketing.png', 'Business', 4.8, 650, true, true, true, 20),
  ('performance-marketing', 'Performance Marketing', 'Scale high-ROI paid advertising campaigns, conversion funnels, and data analytics.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/performance-marketing.png', 'Business', 4.7, 480, false, true, false, 21),
  ('social-media-manager', 'Social Media Manager', 'Build engaged communities, manage brand presence, and drive viral social media campaigns.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/social-media-manager.png', 'Business', 4.8, 540, true, false, true, 22),
  ('hotel-management', 'Hotel Management', 'Master hospitality operations, luxury guest experiences, and modern hotel leadership.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/hotel-management.png', 'Business', 4.6, 310, false, false, false, 23),
  ('corporate-event-management', 'Corporate Event Management', 'Plan, organize, and execute seamless corporate conferences, summits, and executive events.', 'https://qiavthkkhjldpjcpkdze.supabase.co/storage/v1/object/public/course-thumbnails/corporate-event-management.png', 'Business', 4.7, 370, true, true, false, 24)
), upsert_courses AS (
  INSERT INTO public.courses (id, slug, title, description, category, instructor_id, thumbnail_url, is_published, created_at, updated_at)
  SELECT (md5('cleverln-course:' || slug)::uuid), slug, title, description, category,
         '10000000-0000-4000-8000-000000000001'::uuid, image, true, now(), now()
  FROM catalog
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description,
    category = EXCLUDED.category, thumbnail_url = EXCLUDED.thumbnail_url, is_published = true, updated_at = now()
  RETURNING id, slug
), upsert_products AS (
  INSERT INTO public.store_products (id, slug, title, description, thumbnail_url, category, rating, review_count,
    is_featured, is_recommended, is_trending, display_order, delivery_mode, sessions, price_minor,
    compare_at_price_minor, currency, status, created_at, updated_at)
  SELECT (md5('cleverln-product:' || catalog.slug)::uuid), catalog.slug, catalog.title, catalog.description,
    catalog.image, catalog.category, catalog.rating, catalog.review_count, catalog.is_featured,
    catalog.is_recommended, catalog.is_trending, catalog.display_order, 'recorded', 0, 800000,
    999900, 'INR', 'published', now(), now()
  FROM catalog
  ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description,
    thumbnail_url = EXCLUDED.thumbnail_url, category = EXCLUDED.category, rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count, is_featured = EXCLUDED.is_featured,
    is_recommended = EXCLUDED.is_recommended, is_trending = EXCLUDED.is_trending,
    display_order = EXCLUDED.display_order, status = 'published', updated_at = now()
  RETURNING id, slug
)
INSERT INTO public.product_courses (product_id, course_id, position)
SELECT product.id, course.id, 0
FROM upsert_products product JOIN upsert_courses course USING (slug)
ON CONFLICT (product_id, course_id) DO NOTHING;
