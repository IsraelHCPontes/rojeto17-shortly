PGDMP     4                    z            shortly    15.1 (Homebrew)    15.0 $    8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ;           1262    32897    shortly    DATABASE     i   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE shortly;
                israelpontes    false            ?            1259    33445    sessions    TABLE     ?   CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            ?            1259    33444    sessions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    217            <           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    216            ?            1259    33494    urls    TABLE     ?   CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);
    DROP TABLE public.urls;
       public         heap    postgres    false            ?            1259    33492    urls_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.urls_id_seq;
       public          postgres    false    220            =           0    0    urls_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;
          public          postgres    false    218            ?            1259    33493    urls_userId_seq    SEQUENCE     ?   CREATE SEQUENCE public."urls_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."urls_userId_seq";
       public          postgres    false    220            >           0    0    urls_userId_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."urls_userId_seq" OWNED BY public.urls."userId";
          public          postgres    false    219            ?            1259    33430    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    33429    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            ?           2604    33448    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            ?           2604    33497    urls id    DEFAULT     b   ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);
 6   ALTER TABLE public.urls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    218    220            ?           2604    33499    urls userId    DEFAULT     n   ALTER TABLE ONLY public.urls ALTER COLUMN "userId" SET DEFAULT nextval('public."urls_userId_seq"'::regclass);
 <   ALTER TABLE public.urls ALTER COLUMN "userId" DROP DEFAULT;
       public          postgres    false    219    220    220            ?           2604    33433    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            2          0    33445    sessions 
   TABLE DATA           D   COPY public.sessions (id, "userId", token, "createdAt") FROM stdin;
    public          postgres    false    217   7&       5          0    33494    urls 
   TABLE DATA           X   COPY public.urls (id, "shortUrl", url, "visitCount", "userId", "createdAt") FROM stdin;
    public          postgres    false    220   ?&       0          0    33430    users 
   TABLE DATA           @   COPY public.users (id, name, email, "passwordHash") FROM stdin;
    public          postgres    false    215   ?&       @           0    0    sessions_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);
          public          postgres    false    216            A           0    0    urls_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.urls_id_seq', 2, true);
          public          postgres    false    218            B           0    0    urls_userId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."urls_userId_seq"', 1, false);
          public          postgres    false    219            C           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    214            ?           2606    33454    sessions sessions_pk 
   CONSTRAINT     R   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pk;
       public            postgres    false    217            ?           2606    33456    sessions sessions_userId_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");
 H   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_key";
       public            postgres    false    217            ?           2606    33504    urls urls_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_pk;
       public            postgres    false    220            ?           2606    33506    urls urls_shortUrl_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");
 B   ALTER TABLE ONLY public.urls DROP CONSTRAINT "urls_shortUrl_key";
       public            postgres    false    220            ?           2606    33441    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            ?           2606    33439    users users_name_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT users_name_key;
       public            postgres    false    215            ?           2606    33443    users users_paswordHash_key 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_paswordHash_key" UNIQUE ("passwordHash");
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_paswordHash_key";
       public            postgres    false    215            ?           2606    33437    users users_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            postgres    false    215            ?           2606    33476    sessions sessions_fk0    FK CONSTRAINT     u   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);
 ?   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_fk0;
       public          postgres    false    3478    215    217            ?           2606    33507    urls urls_fk0    FK CONSTRAINT     m   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);
 7   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_fk0;
       public          postgres    false    220    3478    215            2   W   x?M˱? ?X?r?????'??Kx?7X???3*??Xgc??>׎q?Oy?0?????˞|xQ?Ł????"w?Q??ܿ??u?g      5   9   x?3?LJ3M?H47??())(???O??O?I?K????4B###]C#]#c?=... u??      0   ?   x?M̻?0 @ѹ??*??? ?X4q??Hx?W???D?{???????????Q?/?2? ?MU??!?m???>?
LM?????')|c?j??s6&???L????? ?((??k?ze?W?=?j?쫊??<???-?I???sʑ 3@?8S???A????u?:     