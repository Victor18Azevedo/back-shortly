--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1ubuntu1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" character varying(16) NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT "urls_userId_check" CHECK (("userId" > 0)),
    CONSTRAINT "urls_visitCount_check" CHECK (("visitCount" >= 0))
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(62) NOT NULL,
    password character varying(60) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'https://www.globo.com', 'DBQayg3BTU', 0, 1, '2022-12-14 17:32:04.632496');
INSERT INTO public.urls VALUES (23, 'https://www.globo.com', 'eDHeyrNYO9', 8, 2, '2022-12-21 07:57:42.718354');
INSERT INTO public.urls VALUES (1, 'https://www.uol.com', 'twKCr4H3F-', 1, 1, '2022-12-14 17:31:01.003919');
INSERT INTO public.urls VALUES (15, 'https://www.globo.com', 'JGpy9VJO7S', 1, 2, '2022-12-15 09:56:31.938001');
INSERT INTO public.urls VALUES (16, 'https://www.globo.com', 'gvMoU19BGf', 0, 2, '2022-12-15 11:56:59.118423');
INSERT INTO public.urls VALUES (17, 'https://www.globo.com', 'GRir1JM7nC', 0, 2, '2022-12-15 11:56:59.625785');
INSERT INTO public.urls VALUES (18, 'https://www.globo.com', 'pqv-Qhzhd9', 0, 2, '2022-12-15 11:57:06.26685');
INSERT INTO public.urls VALUES (19, 'https://www.globo.com', '6lxMmWntqc', 0, 2, '2022-12-15 11:57:06.727631');
INSERT INTO public.urls VALUES (22, 'https://www.globo.com', '6XdKdjPQyV', 2, 1, '2022-12-21 07:39:16.97415');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Jose', 'jose@uol.com', '$2b$10$bxjVKobR0xan7..7EgdcRuG.jzMJb.qWzCTCq6guKRbVlsnYBD9MW', '2022-12-14 14:24:55.490694');
INSERT INTO public.users VALUES (2, 'Victor', 'victor@uol.com', '$2b$10$p9uuwEZry7VPArQwRKYc2.F1ZMCV7os9ne.aUpUjF5joSt/uQ0rea', '2022-12-14 14:25:07.101836');
INSERT INTO public.users VALUES (3, 'Azevedo', 'azevedo@uol.com', '$2b$10$0p3NkwGrVeChVK/aBt/ny.TRqiFGi.ngBOi/rVnCIlahlzPQeyHma', '2022-12-21 07:56:59.668955');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls fk_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT fk_users FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

