--
-- PostgreSQL database dump
--

\restrict Bjp8acuAJSenoYUse58FXB7Boc8Vo4KW5ZMqh2rtXRcP9n9bNc7mHugf10h6hwY

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: AuditLogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AuditLogs" ("Id", "UserId", "UserName", "Action", "EntityName", "EntityId", "OldValues", "NewValues", "ChangedColumns", "Timestamp", "IpAddress", "UserAgent", "RequestId") FROM stdin;
1	\N	System	Create	RefreshToken	-2147482647				2026-07-30 15:55:31.620988+03			
2	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:04:07.488375Z","ExpiresAt":"2026-08-06T13:04:07.488342Z","IsRevoked":false,"Token":"kggVGvaDy8pJcGNfu\\u002BeSH46mbze\\u002BrwIQ8/1mfk2ALkk=","UserId":9}		2026-07-30 16:04:07.521863+03			
3	\N	System	Create	RefreshToken	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-30T13:04:15.595513Z","ExpiresAt":"2026-08-06T13:04:15.595513Z","IsRevoked":false,"Token":"ziMsQ7DfXX1wp6ZFayo1R/65UE7XhOC7SsV8TXy\\u002BeCc=","UserId":9}		2026-07-30 16:04:15.59606+03			
4	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"Audit Test Kategori"}		2026-07-30 16:04:15.614983+03			
5	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:10:27.89649Z","ExpiresAt":"2026-08-06T13:10:27.896462Z","IsRevoked":false,"Token":"iXfG3czurD8I7QVNbdH5xhPtT/n4kiV1QfLZ3era7K4=","UserId":9}		2026-07-30 16:10:27.925928+03			
6	9	Admin	Update	Category	24	{"Name":"Audit Test Kategori"}	{"Name":"Audit Test Kategori G\\u00DCNCEL"}	Name	2026-07-30 16:10:28.024573+03			
7	9	Admin	Delete	Category	24	{"Id":24,"Name":"Audit Test Kategori G\\u00DCNCEL"}			2026-07-30 16:10:28.058252+03			
8	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:12:11.123782Z","ExpiresAt":"2026-08-06T13:12:11.123755Z","IsRevoked":false,"Token":"NyJkQ5BgRdi0Df6lI1mJtrfRyCbxM2bTD92Nw7BeEoU=","UserId":9}		2026-07-30 16:12:11.154672+03			
9	\N	System	Create	RefreshToken	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-30T13:12:22.031497Z","ExpiresAt":"2026-08-06T13:12:22.031497Z","IsRevoked":false,"Token":"7snkZf4XaL6r6FOZmb6Qcp7uG7zsHcU69srPzHZ5HNU=","UserId":9}		2026-07-30 16:12:22.0321+03			
10	\N	System	Create	RefreshToken	-2147482645		{"Id":-2147482645,"CreatedAt":"2026-07-30T13:12:31.612312Z","ExpiresAt":"2026-08-06T13:12:31.612312Z","IsRevoked":false,"Token":"\\u002BasJJFxAYhXvM\\u002BbmiHnCxHQvU3v13FdJAkxTbbbuxUw=","UserId":9}		2026-07-30 16:12:31.612529+03			
11	\N	System	Create	RefreshToken	-2147482644		{"Id":-2147482644,"CreatedAt":"2026-07-30T13:12:39.799976Z","ExpiresAt":"2026-08-06T13:12:39.799976Z","IsRevoked":false,"Token":"rjGzXNqv5lOgpJe7PKqzIP1femqdzl5I3LJyd83MVMc=","UserId":9}		2026-07-30 16:12:39.800215+03			
12	9	Admin	Create	Product	-2147482647		{"Id":-2147482647,"Barcode":"audit-test-001","BrandId":1,"CategoryId":2,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"Audit Test \\u00DCr\\u00FCn","PurchasePrice":50,"SalePrice":100,"StockQuantity":10,"SupplierId":8,"xmin":0}		2026-07-30 16:12:39.838793+03			
13	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:12:39.865045Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":40,"Quantity":10,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-30 16:12:39.871939+03			
14	9	Admin	Update	Product	40	{"StockQuantity":10}	{"StockQuantity":7}	StockQuantity	2026-07-30 16:12:39.915578+03			
15	9	Admin	Create	StockMovement	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-30T13:12:39.921086Z","CreatedByUserId":9,"Description":"Audit test hareketi","ProductId":40,"Quantity":3,"TransactionAmounth":300,"TransactionType":"OUT"}		2026-07-30 16:12:39.921888+03			
16	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:16:37.365671Z","ExpiresAt":"2026-08-06T13:16:37.365642Z","IsRevoked":false,"Token":"H7P7XVNmzJYex0BqZ0yu0t64urHs/exiUFc2qEWxQmY=","UserId":9}		2026-07-30 16:16:37.398959+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVH:00000001
17	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"Final Test Kategori"}		2026-07-30 16:16:37.503236+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVI:00000001
18	9	Admin	Update	Category	25	{"Name":"Final Test Kategori"}	{"Name":"Final Test Kategori G\\u00DCNCEL"}	Name	2026-07-30 16:16:37.541188+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVJ:00000001
19	9	Admin	Create	Product	-2147482647		{"Id":-2147482647,"Barcode":"final-audit-002","BrandId":1,"CategoryId":2,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"Final Audit \\u00DCr\\u00FCn","PurchasePrice":50,"SalePrice":100,"StockQuantity":20,"SupplierId":8,"xmin":0}		2026-07-30 16:16:37.704795+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVK:00000001
20	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:16:37.731354Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":41,"Quantity":20,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-30 16:16:37.740169+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVK:00000001
21	9	Admin	Update	Product	41	{"StockQuantity":20}	{"StockQuantity":15}	StockQuantity	2026-07-30 16:16:37.792273+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVL:00000001
22	9	Admin	Create	StockMovement	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-30T13:16:37.797875Z","CreatedByUserId":9,"Description":"Final audit testi","ProductId":41,"Quantity":5,"TransactionAmounth":500,"TransactionType":"OUT"}		2026-07-30 16:16:37.798681+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVL:00000001
23	9	Admin	Delete	Category	25	{"Id":25,"Name":"Final Test Kategori G\\u00DCNCEL"}			2026-07-30 16:16:37.834217+03	::1	AuditTestClient/1.0	0HNNE7J4F5LVM:00000001
24	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-30T13:18:43.917023Z","ExpiresAt":"2026-08-06T13:18:43.916995Z","IsRevoked":false,"Token":"k8MUZUQS7ibUcoGqFjBxqWrjRjgoqcmI1kY5S6ypaIs=","UserId":9}		2026-07-30 16:18:43.946233+03	::1	curl/8.7.1	0HNNE7KA626CR:00000001
25	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T06:42:45.310439Z","ExpiresAt":"2026-08-07T06:42:45.310411Z","IsRevoked":false,"Token":"rVfmfzELWgD3gyzTR1j8SMiPxNy5tYG84Zh5CppspkQ=","UserId":9}		2026-07-31 09:42:45.34089+03	::1	curl/8.7.1	0HNNEPRMOV16D:00000001
26	9	Admin	Create	Supplier	-2147482647		{"Id":-2147482647,"Address":"Test Adres 1","CompanyName":"Test Tedarikci 1","ContactPerson":"Kisi 1","Email":"tedarikci1@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000001","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.453646+03	::1	curl/8.7.1	0HNNEPRMOV16E:00000001
27	9	Admin	Create	Supplier	-2147482646		{"Id":-2147482646,"Address":"Test Adres 2","CompanyName":"Test Tedarikci 2","ContactPerson":"Kisi 2","Email":"tedarikci2@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000002","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.473338+03	::1	curl/8.7.1	0HNNEPRMOV16F:00000001
28	9	Admin	Create	Supplier	-2147482645		{"Id":-2147482645,"Address":"Test Adres 3","CompanyName":"Test Tedarikci 3","ContactPerson":"Kisi 3","Email":"tedarikci3@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000003","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.486423+03	::1	curl/8.7.1	0HNNEPRMOV16G:00000001
29	9	Admin	Create	Supplier	-2147482644		{"Id":-2147482644,"Address":"Test Adres 4","CompanyName":"Test Tedarikci 4","ContactPerson":"Kisi 4","Email":"tedarikci4@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000004","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.49793+03	::1	curl/8.7.1	0HNNEPRMOV16H:00000001
30	9	Admin	Create	Supplier	-2147482643		{"Id":-2147482643,"Address":"Test Adres 5","CompanyName":"Test Tedarikci 5","ContactPerson":"Kisi 5","Email":"tedarikci5@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000005","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.509071+03	::1	curl/8.7.1	0HNNEPRMOV16I:00000001
31	9	Admin	Create	Supplier	-2147482642		{"Id":-2147482642,"Address":"Test Adres 6","CompanyName":"Test Tedarikci 6","ContactPerson":"Kisi 6","Email":"tedarikci6@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000006","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.519868+03	::1	curl/8.7.1	0HNNEPRMOV16J:00000001
32	9	Admin	Create	Supplier	-2147482641		{"Id":-2147482641,"Address":"Test Adres 7","CompanyName":"Test Tedarikci 7","ContactPerson":"Kisi 7","Email":"tedarikci7@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000007","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.531246+03	::1	curl/8.7.1	0HNNEPRMOV16K:00000001
33	9	Admin	Create	Supplier	-2147482640		{"Id":-2147482640,"Address":"Test Adres 8","CompanyName":"Test Tedarikci 8","ContactPerson":"Kisi 8","Email":"tedarikci8@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000008","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.541905+03	::1	curl/8.7.1	0HNNEPRMOV16L:00000001
34	9	Admin	Create	Supplier	-2147482639		{"Id":-2147482639,"Address":"Test Adres 9","CompanyName":"Test Tedarikci 9","ContactPerson":"Kisi 9","Email":"tedarikci9@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"1000000009","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.552162+03	::1	curl/8.7.1	0HNNEPRMOV16M:00000001
35	9	Admin	Create	Supplier	-2147482638		{"Id":-2147482638,"Address":"Test Adres 10","CompanyName":"Test Tedarikci 10","ContactPerson":"Kisi 10","Email":"tedarikci10@test.com","IsActive":true,"Phone":"05001112233","TaxNumber":"10000000010","TaxOffice":"Kadikoy"}		2026-07-31 09:42:45.562796+03	::1	curl/8.7.1	0HNNEPRMOV16N:00000001
36	9	Admin	Create	WarehouseLocation	-2147482647		{"Id":-2147482647,"Corridor":"Koridor-1","Section":"Bolum-1","Shelf":"Raf-1"}		2026-07-31 09:42:45.5846+03	::1	curl/8.7.1	0HNNEPRMOV16O:00000001
37	9	Admin	Create	WarehouseLocation	-2147482646		{"Id":-2147482646,"Corridor":"Koridor-2","Section":"Bolum-2","Shelf":"Raf-2"}		2026-07-31 09:42:45.599939+03	::1	curl/8.7.1	0HNNEPRMOV16P:00000001
38	9	Admin	Create	WarehouseLocation	-2147482645		{"Id":-2147482645,"Corridor":"Koridor-3","Section":"Bolum-3","Shelf":"Raf-3"}		2026-07-31 09:42:45.612231+03	::1	curl/8.7.1	0HNNEPRMOV16Q:00000001
39	9	Admin	Create	WarehouseLocation	-2147482644		{"Id":-2147482644,"Corridor":"Koridor-4","Section":"Bolum-4","Shelf":"Raf-4"}		2026-07-31 09:42:45.623121+03	::1	curl/8.7.1	0HNNEPRMOV16R:00000001
40	9	Admin	Create	WarehouseLocation	-2147482643		{"Id":-2147482643,"Corridor":"Koridor-5","Section":"Bolum-5","Shelf":"Raf-5"}		2026-07-31 09:42:45.633629+03	::1	curl/8.7.1	0HNNEPRMOV16S:00000001
41	9	Admin	Create	WarehouseLocation	-2147482642		{"Id":-2147482642,"Corridor":"Koridor-6","Section":"Bolum-6","Shelf":"Raf-6"}		2026-07-31 09:42:45.644365+03	::1	curl/8.7.1	0HNNEPRMOV16T:00000001
42	9	Admin	Create	WarehouseLocation	-2147482641		{"Id":-2147482641,"Corridor":"Koridor-7","Section":"Bolum-7","Shelf":"Raf-7"}		2026-07-31 09:42:45.655134+03	::1	curl/8.7.1	0HNNEPRMOV16U:00000001
43	9	Admin	Create	WarehouseLocation	-2147482640		{"Id":-2147482640,"Corridor":"Koridor-8","Section":"Bolum-8","Shelf":"Raf-8"}		2026-07-31 09:42:45.665954+03	::1	curl/8.7.1	0HNNEPRMOV16V:00000001
44	9	Admin	Create	WarehouseLocation	-2147482639		{"Id":-2147482639,"Corridor":"Koridor-9","Section":"Bolum-9","Shelf":"Raf-9"}		2026-07-31 09:42:45.67674+03	::1	curl/8.7.1	0HNNEPRMOV170:00000001
45	9	Admin	Create	WarehouseLocation	-2147482638		{"Id":-2147482638,"Corridor":"Koridor-10","Section":"Bolum-10","Shelf":"Raf-10"}		2026-07-31 09:42:45.687206+03	::1	curl/8.7.1	0HNNEPRMOV171:00000001
46	9	Admin	Create	Brand	-2147482647		{"Id":-2147482647,"Name":"Test Marka 1"}		2026-07-31 09:42:45.708984+03	::1	curl/8.7.1	0HNNEPRMOV172:00000001
47	9	Admin	Create	Brand	-2147482646		{"Id":-2147482646,"Name":"Test Marka 2"}		2026-07-31 09:42:45.724644+03	::1	curl/8.7.1	0HNNEPRMOV173:00000001
48	9	Admin	Create	Brand	-2147482645		{"Id":-2147482645,"Name":"Test Marka 3"}		2026-07-31 09:42:45.736538+03	::1	curl/8.7.1	0HNNEPRMOV174:00000001
49	9	Admin	Create	Brand	-2147482644		{"Id":-2147482644,"Name":"Test Marka 4"}		2026-07-31 09:42:45.747292+03	::1	curl/8.7.1	0HNNEPRMOV175:00000001
50	9	Admin	Create	Brand	-2147482643		{"Id":-2147482643,"Name":"Test Marka 5"}		2026-07-31 09:42:45.757904+03	::1	curl/8.7.1	0HNNEPRMOV176:00000001
51	9	Admin	Create	Brand	-2147482642		{"Id":-2147482642,"Name":"Test Marka 6"}		2026-07-31 09:42:45.768442+03	::1	curl/8.7.1	0HNNEPRMOV177:00000001
52	9	Admin	Create	Brand	-2147482641		{"Id":-2147482641,"Name":"Test Marka 7"}		2026-07-31 09:42:45.779467+03	::1	curl/8.7.1	0HNNEPRMOV178:00000001
53	9	Admin	Create	Brand	-2147482640		{"Id":-2147482640,"Name":"Test Marka 8"}		2026-07-31 09:42:45.790092+03	::1	curl/8.7.1	0HNNEPRMOV179:00000001
54	9	Admin	Create	Brand	-2147482639		{"Id":-2147482639,"Name":"Test Marka 9"}		2026-07-31 09:42:45.800646+03	::1	curl/8.7.1	0HNNEPRMOV17A:00000001
55	9	Admin	Create	Brand	-2147482638		{"Id":-2147482638,"Name":"Test Marka 10"}		2026-07-31 09:42:45.811651+03	::1	curl/8.7.1	0HNNEPRMOV17B:00000001
56	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"Test Kategori 1"}		2026-07-31 09:42:57.828387+03	::1	curl/8.7.1	0HNNEPRMOV17E:00000001
57	9	Admin	Create	Category	-2147482646		{"Id":-2147482646,"Name":"Test Kategori 2"}		2026-07-31 09:42:57.84408+03	::1	curl/8.7.1	0HNNEPRMOV17F:00000001
58	9	Admin	Create	Category	-2147482645		{"Id":-2147482645,"Name":"Test Kategori 3"}		2026-07-31 09:42:57.856498+03	::1	curl/8.7.1	0HNNEPRMOV17G:00000001
59	9	Admin	Create	Category	-2147482644		{"Id":-2147482644,"Name":"Test Kategori 4"}		2026-07-31 09:42:57.867198+03	::1	curl/8.7.1	0HNNEPRMOV17H:00000001
60	9	Admin	Create	Category	-2147482643		{"Id":-2147482643,"Name":"Test Kategori 5"}		2026-07-31 09:42:57.877987+03	::1	curl/8.7.1	0HNNEPRMOV17I:00000001
61	9	Admin	Create	Category	-2147482642		{"Id":-2147482642,"Name":"Test Kategori 6"}		2026-07-31 09:42:57.888489+03	::1	curl/8.7.1	0HNNEPRMOV17J:00000001
62	9	Admin	Create	Category	-2147482641		{"Id":-2147482641,"Name":"Test Kategori 7"}		2026-07-31 09:42:57.898852+03	::1	curl/8.7.1	0HNNEPRMOV17K:00000001
63	9	Admin	Create	Category	-2147482640		{"Id":-2147482640,"Name":"Test Kategori 8"}		2026-07-31 09:42:57.910073+03	::1	curl/8.7.1	0HNNEPRMOV17L:00000001
64	9	Admin	Create	Category	-2147482639		{"Id":-2147482639,"Name":"Test Kategori 9"}		2026-07-31 09:42:57.920548+03	::1	curl/8.7.1	0HNNEPRMOV17M:00000001
65	9	Admin	Create	Category	-2147482638		{"Id":-2147482638,"Name":"Test Kategori 10"}		2026-07-31 09:42:57.93121+03	::1	curl/8.7.1	0HNNEPRMOV17N:00000001
66	9	Admin	Create	Model	-2147482647		{"Id":-2147482647,"BrandId":2,"Name":"Test Model Deneme"}		2026-07-31 09:43:08.305775+03	::1	curl/8.7.1	0HNNEPRMOV17O:00000001
67	9	Admin	Create	Model	-2147482646		{"Id":-2147482646,"BrandId":3,"Name":"Test Model 1"}		2026-07-31 09:44:02.352881+03	::1	curl/8.7.1	0HNNEPRMOV17U:00000001
68	9	Admin	Create	Model	-2147482645		{"Id":-2147482645,"BrandId":4,"Name":"Test Model 2"}		2026-07-31 09:44:02.366602+03	::1	curl/8.7.1	0HNNEPRMOV17V:00000001
69	9	Admin	Create	Model	-2147482644		{"Id":-2147482644,"BrandId":5,"Name":"Test Model 3"}		2026-07-31 09:44:02.379079+03	::1	curl/8.7.1	0HNNEPRMOV180:00000001
70	9	Admin	Create	Model	-2147482643		{"Id":-2147482643,"BrandId":6,"Name":"Test Model 4"}		2026-07-31 09:44:02.391189+03	::1	curl/8.7.1	0HNNEPRMOV181:00000001
71	9	Admin	Create	Model	-2147482642		{"Id":-2147482642,"BrandId":7,"Name":"Test Model 5"}		2026-07-31 09:44:02.402337+03	::1	curl/8.7.1	0HNNEPRMOV182:00000001
72	9	Admin	Create	Model	-2147482641		{"Id":-2147482641,"BrandId":8,"Name":"Test Model 6"}		2026-07-31 09:44:02.413777+03	::1	curl/8.7.1	0HNNEPRMOV183:00000001
73	9	Admin	Create	Model	-2147482640		{"Id":-2147482640,"BrandId":9,"Name":"Test Model 7"}		2026-07-31 09:44:02.424798+03	::1	curl/8.7.1	0HNNEPRMOV184:00000001
74	9	Admin	Create	Model	-2147482639		{"Id":-2147482639,"BrandId":10,"Name":"Test Model 8"}		2026-07-31 09:44:02.435523+03	::1	curl/8.7.1	0HNNEPRMOV185:00000001
75	9	Admin	Create	Model	-2147482638		{"Id":-2147482638,"BrandId":11,"Name":"Test Model 9"}		2026-07-31 09:44:02.446393+03	::1	curl/8.7.1	0HNNEPRMOV186:00000001
76	9	Admin	Create	Product	-2147482647		{"Id":-2147482647,"Barcode":"test-barcode-1-1785480260070344000","BrandId":2,"CategoryId":26,"IsActive":true,"LocationId":6,"ModelId":2,"ProductName":"Test Urun 1","PurchasePrice":10,"SalePrice":20,"SkuCode":"TEST-SKU-1-1785480260072752000","StockQuantity":5,"SupplierId":13,"xmin":0}		2026-07-31 09:44:20.146165+03	::1	curl/8.7.1	0HNNEPRMOV18C:00000001
77	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T06:44:20.16913Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":42,"Quantity":5,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.177112+03	::1	curl/8.7.1	0HNNEPRMOV18C:00000001
78	9	Admin	Create	Product	-2147482646		{"Id":-2147482646,"Barcode":"test-barcode-2-1785480260191977000","BrandId":3,"CategoryId":27,"IsActive":true,"LocationId":7,"ModelId":3,"ProductName":"Test Urun 2","PurchasePrice":20,"SalePrice":40,"SkuCode":"TEST-SKU-2-1785480260193992000","StockQuantity":10,"SupplierId":14,"xmin":0}		2026-07-31 09:44:20.211771+03	::1	curl/8.7.1	0HNNEPRMOV18D:00000001
79	9	Admin	Create	StockMovement	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-31T06:44:20.214921Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":43,"Quantity":10,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.215003+03	::1	curl/8.7.1	0HNNEPRMOV18D:00000001
80	9	Admin	Create	Product	-2147482645		{"Id":-2147482645,"Barcode":"test-barcode-3-1785480260222323000","BrandId":4,"CategoryId":28,"IsActive":true,"LocationId":8,"ModelId":4,"ProductName":"Test Urun 3","PurchasePrice":30,"SalePrice":60,"SkuCode":"TEST-SKU-3-1785480260224467000","StockQuantity":15,"SupplierId":15,"xmin":0}		2026-07-31 09:44:20.238519+03	::1	curl/8.7.1	0HNNEPRMOV18E:00000001
81	9	Admin	Create	StockMovement	-2147482645		{"Id":-2147482645,"CreatedAt":"2026-07-31T06:44:20.241278Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":44,"Quantity":15,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.241355+03	::1	curl/8.7.1	0HNNEPRMOV18E:00000001
82	9	Admin	Create	Product	-2147482644		{"Id":-2147482644,"Barcode":"test-barcode-4-1785480260248466000","BrandId":5,"CategoryId":29,"IsActive":true,"LocationId":9,"ModelId":5,"ProductName":"Test Urun 4","PurchasePrice":40,"SalePrice":80,"SkuCode":"TEST-SKU-4-1785480260250517000","StockQuantity":20,"SupplierId":16,"xmin":0}		2026-07-31 09:44:20.262736+03	::1	curl/8.7.1	0HNNEPRMOV18F:00000001
83	9	Admin	Create	StockMovement	-2147482644		{"Id":-2147482644,"CreatedAt":"2026-07-31T06:44:20.265562Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":45,"Quantity":20,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.265637+03	::1	curl/8.7.1	0HNNEPRMOV18F:00000001
84	9	Admin	Create	Product	-2147482643		{"Id":-2147482643,"Barcode":"test-barcode-5-1785480260273100000","BrandId":6,"CategoryId":30,"IsActive":true,"LocationId":10,"ModelId":6,"ProductName":"Test Urun 5","PurchasePrice":50,"SalePrice":100,"SkuCode":"TEST-SKU-5-1785480260275177000","StockQuantity":25,"SupplierId":17,"xmin":0}		2026-07-31 09:44:20.287113+03	::1	curl/8.7.1	0HNNEPRMOV18G:00000001
85	9	Admin	Create	StockMovement	-2147482643		{"Id":-2147482643,"CreatedAt":"2026-07-31T06:44:20.289926Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":46,"Quantity":25,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.290056+03	::1	curl/8.7.1	0HNNEPRMOV18G:00000001
86	9	Admin	Create	Product	-2147482642		{"Id":-2147482642,"Barcode":"test-barcode-6-1785480260296963000","BrandId":7,"CategoryId":31,"IsActive":true,"LocationId":11,"ModelId":7,"ProductName":"Test Urun 6","PurchasePrice":60,"SalePrice":120,"SkuCode":"TEST-SKU-6-1785480260299010000","StockQuantity":30,"SupplierId":18,"xmin":0}		2026-07-31 09:44:20.312117+03	::1	curl/8.7.1	0HNNEPRMOV18H:00000001
87	9	Admin	Create	StockMovement	-2147482642		{"Id":-2147482642,"CreatedAt":"2026-07-31T06:44:20.314965Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":47,"Quantity":30,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.31504+03	::1	curl/8.7.1	0HNNEPRMOV18H:00000001
88	9	Admin	Create	Product	-2147482641		{"Id":-2147482641,"Barcode":"test-barcode-7-1785480260322631000","BrandId":8,"CategoryId":32,"IsActive":true,"LocationId":12,"ModelId":8,"ProductName":"Test Urun 7","PurchasePrice":70,"SalePrice":140,"SkuCode":"TEST-SKU-7-1785480260325012000","StockQuantity":35,"SupplierId":19,"xmin":0}		2026-07-31 09:44:20.33706+03	::1	curl/8.7.1	0HNNEPRMOV18I:00000001
89	9	Admin	Create	StockMovement	-2147482641		{"Id":-2147482641,"CreatedAt":"2026-07-31T06:44:20.33996Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":48,"Quantity":35,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.340075+03	::1	curl/8.7.1	0HNNEPRMOV18I:00000001
90	9	Admin	Create	Product	-2147482640		{"Id":-2147482640,"Barcode":"test-barcode-8-1785480260346745000","BrandId":9,"CategoryId":33,"IsActive":true,"LocationId":13,"ModelId":9,"ProductName":"Test Urun 8","PurchasePrice":80,"SalePrice":160,"SkuCode":"TEST-SKU-8-1785480260348677000","StockQuantity":40,"SupplierId":20,"xmin":0}		2026-07-31 09:44:20.36039+03	::1	curl/8.7.1	0HNNEPRMOV18J:00000001
91	9	Admin	Create	StockMovement	-2147482640		{"Id":-2147482640,"CreatedAt":"2026-07-31T06:44:20.363245Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":49,"Quantity":40,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.363304+03	::1	curl/8.7.1	0HNNEPRMOV18J:00000001
92	9	Admin	Create	Product	-2147482639		{"Id":-2147482639,"Barcode":"test-barcode-9-1785480260370239000","BrandId":10,"CategoryId":34,"IsActive":true,"LocationId":14,"ModelId":10,"ProductName":"Test Urun 9","PurchasePrice":90,"SalePrice":180,"SkuCode":"TEST-SKU-9-1785480260372857000","StockQuantity":45,"SupplierId":21,"xmin":0}		2026-07-31 09:44:20.384838+03	::1	curl/8.7.1	0HNNEPRMOV18K:00000001
93	9	Admin	Create	StockMovement	-2147482639		{"Id":-2147482639,"CreatedAt":"2026-07-31T06:44:20.387522Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":50,"Quantity":45,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.387621+03	::1	curl/8.7.1	0HNNEPRMOV18K:00000001
94	9	Admin	Create	Product	-2147482638		{"Id":-2147482638,"Barcode":"test-barcode-10-1785480260394643000","BrandId":11,"CategoryId":35,"IsActive":true,"LocationId":15,"ModelId":11,"ProductName":"Test Urun 10","PurchasePrice":100,"SalePrice":200,"SkuCode":"TEST-SKU-10-1785480260396556000","StockQuantity":50,"SupplierId":22,"xmin":0}		2026-07-31 09:44:20.40891+03	::1	curl/8.7.1	0HNNEPRMOV18L:00000001
95	9	Admin	Create	StockMovement	-2147482638		{"Id":-2147482638,"CreatedAt":"2026-07-31T06:44:20.411683Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":51,"Quantity":50,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 09:44:20.411738+03	::1	curl/8.7.1	0HNNEPRMOV18L:00000001
96	9	Admin	Update	Product	42	{"StockQuantity":5}	{"StockQuantity":10}	StockQuantity	2026-07-31 09:44:35.993831+03	::1	curl/8.7.1	0HNNEPRMOV18M:00000001
97	9	Admin	Create	StockMovement	-2147482637		{"Id":-2147482637,"CreatedAt":"2026-07-31T06:44:36.00158Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":42,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.002353+03	::1	curl/8.7.1	0HNNEPRMOV18M:00000001
98	9	Admin	Update	Product	43	{"StockQuantity":10}	{"StockQuantity":15}	StockQuantity	2026-07-31 09:44:36.03081+03	::1	curl/8.7.1	0HNNEPRMOV18N:00000001
99	9	Admin	Create	StockMovement	-2147482636		{"Id":-2147482636,"CreatedAt":"2026-07-31T06:44:36.033252Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":43,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.033314+03	::1	curl/8.7.1	0HNNEPRMOV18N:00000001
100	9	Admin	Update	Product	44	{"StockQuantity":15}	{"StockQuantity":20}	StockQuantity	2026-07-31 09:44:36.054749+03	::1	curl/8.7.1	0HNNEPRMOV18O:00000001
101	9	Admin	Create	StockMovement	-2147482635		{"Id":-2147482635,"CreatedAt":"2026-07-31T06:44:36.057312Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":44,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.057396+03	::1	curl/8.7.1	0HNNEPRMOV18O:00000001
102	9	Admin	Update	Product	45	{"StockQuantity":20}	{"StockQuantity":25}	StockQuantity	2026-07-31 09:44:36.075723+03	::1	curl/8.7.1	0HNNEPRMOV18P:00000001
103	9	Admin	Create	StockMovement	-2147482634		{"Id":-2147482634,"CreatedAt":"2026-07-31T06:44:36.078094Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":45,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.078147+03	::1	curl/8.7.1	0HNNEPRMOV18P:00000001
104	9	Admin	Update	Product	46	{"StockQuantity":25}	{"StockQuantity":30}	StockQuantity	2026-07-31 09:44:36.097775+03	::1	curl/8.7.1	0HNNEPRMOV18Q:00000001
105	9	Admin	Create	StockMovement	-2147482633		{"Id":-2147482633,"CreatedAt":"2026-07-31T06:44:36.101699Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":46,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.101753+03	::1	curl/8.7.1	0HNNEPRMOV18Q:00000001
106	9	Admin	Update	Product	47	{"StockQuantity":30}	{"StockQuantity":35}	StockQuantity	2026-07-31 09:44:36.121954+03	::1	curl/8.7.1	0HNNEPRMOV18R:00000001
107	9	Admin	Create	StockMovement	-2147482632		{"Id":-2147482632,"CreatedAt":"2026-07-31T06:44:36.124315Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":47,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.124382+03	::1	curl/8.7.1	0HNNEPRMOV18R:00000001
108	9	Admin	Update	Product	48	{"StockQuantity":35}	{"StockQuantity":40}	StockQuantity	2026-07-31 09:44:36.142503+03	::1	curl/8.7.1	0HNNEPRMOV18S:00000001
109	9	Admin	Create	StockMovement	-2147482631		{"Id":-2147482631,"CreatedAt":"2026-07-31T06:44:36.145049Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":48,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.14514+03	::1	curl/8.7.1	0HNNEPRMOV18S:00000001
110	9	Admin	Update	Product	49	{"StockQuantity":40}	{"StockQuantity":45}	StockQuantity	2026-07-31 09:44:36.166059+03	::1	curl/8.7.1	0HNNEPRMOV18T:00000001
111	9	Admin	Create	StockMovement	-2147482630		{"Id":-2147482630,"CreatedAt":"2026-07-31T06:44:36.168765Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":49,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.168822+03	::1	curl/8.7.1	0HNNEPRMOV18T:00000001
112	9	Admin	Update	Product	50	{"StockQuantity":45}	{"StockQuantity":50}	StockQuantity	2026-07-31 09:44:36.188414+03	::1	curl/8.7.1	0HNNEPRMOV18U:00000001
113	9	Admin	Create	StockMovement	-2147482629		{"Id":-2147482629,"CreatedAt":"2026-07-31T06:44:36.190831Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":50,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.190908+03	::1	curl/8.7.1	0HNNEPRMOV18U:00000001
114	9	Admin	Update	Product	51	{"StockQuantity":50}	{"StockQuantity":55}	StockQuantity	2026-07-31 09:44:36.208862+03	::1	curl/8.7.1	0HNNEPRMOV18V:00000001
115	9	Admin	Create	StockMovement	-2147482628		{"Id":-2147482628,"CreatedAt":"2026-07-31T06:44:36.211187Z","CreatedByUserId":9,"Description":"Test stok hareketi","ProductId":51,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-07-31 09:44:36.211241+03	::1	curl/8.7.1	0HNNEPRMOV18V:00000001
116	9	Admin	Create	User	-2147482647		{"UserId":-2147482647,"Email":"testuser1@test.com","Name":"Test Kullanici 1","PasswordHash":"$2a$11$k3JGBRhqWZqW5sJ27STVNOjNM5NFTs1O1cB1uSdO9M6T4tMqBKjPi","Role":"User"}		2026-07-31 09:44:49.190269+03	::1	curl/8.7.1	0HNNEPRMOV190:00000001
117	9	Admin	Create	User	-2147482646		{"UserId":-2147482646,"Email":"testuser2@test.com","Name":"Test Kullanici 2","PasswordHash":"$2a$11$BkdI4AFb9DRimOdfI00En.Anp4OqL.pFHx1zOv0HtJ4odKrwdUfEa","Role":"User"}		2026-07-31 09:44:49.350534+03	::1	curl/8.7.1	0HNNEPRMOV191:00000001
118	9	Admin	Create	User	-2147482645		{"UserId":-2147482645,"Email":"testuser3@test.com","Name":"Test Kullanici 3","PasswordHash":"$2a$11$KRMz.D2CNoxyGIu2AnLc3./dRF8sZVBBdB1J1r4.ypoHJIp.s8aaS","Role":"User"}		2026-07-31 09:44:49.543981+03	::1	curl/8.7.1	0HNNEPRMOV192:00000001
119	9	Admin	Create	User	-2147482644		{"UserId":-2147482644,"Email":"testuser4@test.com","Name":"Test Kullanici 4","PasswordHash":"$2a$11$amYruDKSvJdShmoZvVdylOMkI4s3w2IgApSRxtvxtETLY70kY4q6O","Role":"User"}		2026-07-31 09:44:49.701293+03	::1	curl/8.7.1	0HNNEPRMOV193:00000001
120	9	Admin	Create	User	-2147482643		{"UserId":-2147482643,"Email":"testuserdeneme@test.com","Name":"Test Kullanici Deneme","PasswordHash":"$2a$11$.Aj.AqsGgZy2Pp2Go1/LfOYB96s70/zDV.p86kxxNXWBBSPRAPjUq","Role":"User"}		2026-07-31 09:44:59.822127+03	::1	curl/8.7.1	0HNNEPRMOV194:00000001
121	9	Admin	Create	User	-2147482642		{"UserId":-2147482642,"Email":"testuser5@test.com","Name":"Test Kullanici 5","PasswordHash":"$2a$11$ENg.5yFmZIn5CoxCPCYm5.nNJs03E9HmeqSZqof.IgOS9j3LwDShC","Role":"User"}		2026-07-31 09:46:49.289111+03	::1	curl/8.7.1	0HNNEPRMOV19A:00000001
122	9	Admin	Create	User	-2147482641		{"UserId":-2147482641,"Email":"testuser6@test.com","Name":"Test Kullanici 6","PasswordHash":"$2a$11$oqmYvrI2OWQ2Nu/w9TNU9ed12g5JQf885bBVLevTPI.mTYvLSQVWq","Role":"User"}		2026-07-31 09:46:49.442029+03	::1	curl/8.7.1	0HNNEPRMOV19B:00000001
123	9	Admin	Create	User	-2147482640		{"UserId":-2147482640,"Email":"testuser7@test.com","Name":"Test Kullanici 7","PasswordHash":"$2a$11$ViiGmw1uzw5hUqAaWPS9tuCL4yJMfcNV9WeNFRabe/famuAoLoVfG","Role":"User"}		2026-07-31 09:46:49.614509+03	::1	curl/8.7.1	0HNNEPRMOV19C:00000001
124	9	Admin	Create	User	-2147482639		{"UserId":-2147482639,"Email":"testuser8@test.com","Name":"Test Kullanici 8","PasswordHash":"$2a$11$8dsJqCICo3F9/VRUfmoIjuJ3UnVuDytWbldJ9/jbe3LTp8wMsbt9G","Role":"User"}		2026-07-31 09:46:49.780111+03	::1	curl/8.7.1	0HNNEPRMOV19D:00000001
125	9	Admin	Create	User	-2147482638		{"UserId":-2147482638,"Email":"testuser9@test.com","Name":"Test Kullanici 9","PasswordHash":"$2a$11$fguv3tth.hBvL.mwsC2wOeex5UvivM0gcYucIfRKJRKH4XTyTXu0G","Role":"User"}		2026-07-31 09:46:49.933748+03	::1	curl/8.7.1	0HNNEPRMOV19E:00000001
126	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T06:56:34.419118Z","ExpiresAt":"2026-08-07T06:56:34.419091Z","IsRevoked":false,"Token":"Ar2IwZP1Zezt100vYh1ghBQKY7Mcn20XbG4I4n4414A=","UserId":9}		2026-07-31 09:56:34.45234+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEPVPSION0:00000002
127	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T07:04:07.284544Z","ExpiresAt":"2026-08-07T07:04:07.284508Z","IsRevoked":false,"Token":"ttDEfeJmSFQ5wc81LbX\\u002BAQk73kW4VoS8QzGL1mdDXXU=","UserId":9}		2026-07-31 10:04:07.315852+03	::1	curl/8.7.1	0HNNEQ7KQNROV:00000001
128	9	Admin	Create	Brand	-2147482647		{"Id":-2147482647,"CategoryId":2,"Name":"Test Marka Kategori"}		2026-07-31 10:04:07.424128+03	::1	curl/8.7.1	0HNNEQ7KQNRP0:00000001
129	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T07:15:22.772273Z","ExpiresAt":"2026-08-07T07:15:22.772247Z","IsRevoked":false,"Token":"IoXjKpBcE4WgYriPfi\\u002BeZWUtvvLoghgH6ogfd5u4Njg=","UserId":9}		2026-07-31 10:15:22.801944+03	::1	curl/8.7.1	0HNNEQDU4A689:00000001
130	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"Silinecek Test Kategori"}		2026-07-31 10:15:22.899262+03	::1	curl/8.7.1	0HNNEQDU4A68A:00000001
131	9	Admin	Create	Product	-2147482647		{"Id":-2147482647,"Barcode":"reassign-test-1","BrandId":1,"CategoryId":36,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"Reassign Test Urun","PurchasePrice":10,"SalePrice":20,"SkuCode":"REASSIGN-SKU-1","StockQuantity":5,"SupplierId":8,"xmin":0}		2026-07-31 10:15:23.052479+03	::1	curl/8.7.1	0HNNEQDU4A68B:00000001
132	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T07:15:23.079012Z","CreatedByUserId":null,"Description":"\\u0130lk stok giri\\u015Fi","ProductId":52,"Quantity":5,"TransactionAmounth":0,"TransactionType":"IN"}		2026-07-31 10:15:23.087376+03	::1	curl/8.7.1	0HNNEQDU4A68B:00000001
133	\N	System	Create	RefreshToken	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-31T07:15:34.92962Z","ExpiresAt":"2026-08-07T07:15:34.92962Z","IsRevoked":false,"Token":"5jc9eloFRb3DoXV2ojanrYthxW/CtJ/sDhqv7FTkIbQ=","UserId":9}		2026-07-31 10:15:34.93007+03	::1	curl/8.7.1	0HNNEQDU4A68D:00000001
134	9	Admin	Update	Product	52	{"CategoryId":36}	{"CategoryId":15}	CategoryId	2026-07-31 10:15:35.146831+03	::1	curl/8.7.1	0HNNEQDU4A68F:00000001
135	9	Admin	Delete	Category	36	{"Id":36,"Name":"Silinecek Test Kategori"}			2026-07-31 10:15:35.16828+03	::1	curl/8.7.1	0HNNEQDU4A68F:00000001
136	\N	System	Create	RefreshToken	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-07-31T07:32:21.169738Z","ExpiresAt":"2026-08-07T07:32:21.169712Z","IsRevoked":false,"Token":"emFFs\\u002B/JEfr3f6pj48fcMSJjJQa7fVsk9EYZEUZ7sek=","UserId":9}		2026-07-31 10:32:21.198053+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3EG:00000002
137	\N	System	Create	RefreshToken	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-07-31T10:16:13.099605Z","ExpiresAt":"2026-08-07T10:16:13.099604Z","IsRevoked":false,"Token":"lX3wWjDqeqDdT7nHH4vOVEquOzFbP1cwDmf473ZknLU=","UserId":9}		2026-07-31 13:16:13.1008+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3FS:00000005
138	\N	System	Create	RefreshToken	-2147482645		{"Id":-2147482645,"CreatedAt":"2026-07-31T11:05:23.536925Z","ExpiresAt":"2026-08-07T11:05:23.536924Z","IsRevoked":false,"Token":"2DIUmYTolpclLM96UPpmqOxI6B33w28zKbACuHan2vo=","UserId":9}		2026-07-31 14:05:23.53768+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3GA:00000004
139	9	Admin	Delete	Product	52	{"Id":52,"Barcode":"reassign-test-1","BrandId":1,"CategoryId":15,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"Reassign Test Urun","PurchasePrice":10,"SalePrice":20,"SkuCode":"REASSIGN-SKU-1","StockQuantity":5,"SupplierId":8,"xmin":1207}			2026-07-31 14:19:50.442582+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3H5:0000000F
140	9	Admin	Delete	Product	41	{"Id":41,"Barcode":"final-audit-002","BrandId":1,"CategoryId":2,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"Final Audit \\u00DCr\\u00FCn","PurchasePrice":50,"SalePrice":100,"SkuCode":"SKU-41","StockQuantity":15,"SupplierId":8,"xmin":1066}			2026-07-31 14:19:53.968014+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3H5:00000013
141	9	Admin	Delete	Product	25	{"Id":25,"Barcode":"sku-1001","BrandId":1,"CategoryId":22,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"yeni g\\u00FCncel","PurchasePrice":1,"SalePrice":1,"SkuCode":"SKU-25","StockQuantity":500,"SupplierId":10,"xmin":1066}			2026-07-31 14:19:59.505489+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3HA:00000003
142	9	Admin	Delete	Product	39	{"Id":39,"Barcode":"sku-1005","BrandId":1,"CategoryId":21,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"test","PurchasePrice":1,"SalePrice":1,"SkuCode":"SKU-39","StockQuantity":500,"SupplierId":10,"xmin":1066}			2026-07-31 14:24:13.968906+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3HK:0000000B
143	9	Admin	Delete	Product	37	{"Id":37,"Barcode":"sku-1003","BrandId":1,"CategoryId":23,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"elif","PurchasePrice":1,"SalePrice":1,"SkuCode":"SKU-37","StockQuantity":1,"SupplierId":10,"xmin":1066}			2026-07-31 14:24:22.776631+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3HK:0000000F
144	9	Admin	Update	Product	26	{"LocationId":2}	{"LocationId":null}	LocationId	2026-07-31 15:14:53.931491+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3JL:00000005
145	9	Admin	Update	Product	27	{"LocationId":2,"ProductName":"USB-C Hizli Sarj Kablosu 1m"}	{"LocationId":null,"ProductName":"degisti"}	LocationId,ProductName	2026-07-31 15:15:01.816163+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3JN:00000005
146	9	Admin	Update	Product	28	{"LocationId":3,"ProductName":"Bluetooth Kulaklik"}	{"LocationId":null,"ProductName":"de\\u011Fi\\u015Ftirdim"}	LocationId,ProductName	2026-07-31 15:16:25.251879+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3K2:00000004
147	9	Admin	Delete	Product	29	{"Id":29,"Barcode":"8690002000010","BrandId":1,"CategoryId":20,"IsActive":true,"LocationId":4,"ModelId":1,"ProductName":"Turk Kahvesi 250g","PurchasePrice":45,"SalePrice":79.90,"SkuCode":"SKU-29","StockQuantity":590,"SupplierId":11,"xmin":1066}			2026-07-31 15:18:16.789889+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3KA:00000002
171	9	Admin	Delete	Category	19	{"Id":19,"Name":"Elektronik"}			2026-08-03 13:16:01.280207+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:00000008
148	9	Admin	Delete	Product	31	{"Id":31,"Barcode":"8690002000034","BrandId":1,"CategoryId":20,"IsActive":true,"LocationId":4,"ModelId":1,"ProductName":"Maden Suyu 500ml 24lu Koli","PurchasePrice":60,"SalePrice":95,"SkuCode":"SKU-31","StockQuantity":80,"SupplierId":11,"xmin":1066}			2026-07-31 15:18:26.310008+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3KA:00000007
149	\N	System	Create	RefreshToken	-2147482644		{"Id":-2147482644,"CreatedAt":"2026-07-31T12:36:43.055781Z","ExpiresAt":"2026-08-07T12:36:43.055781Z","IsRevoked":false,"Token":"VyNU1ZOSyA96mQ6dbwcVzlsMsUKj09lIoL9OWquVWkc=","UserId":9}		2026-07-31 15:36:43.056037+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3L2:00000002
150	9	Admin	Update	Product	30	{"BrandId":1,"CategoryId":20,"LocationId":4,"ModelId":1}	{"BrandId":3,"CategoryId":21,"LocationId":null,"ModelId":3}	BrandId,CategoryId,LocationId,ModelId	2026-07-31 15:37:20.275161+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3LF:00000008
151	\N	System	Create	RefreshToken	-2147482643		{"Id":-2147482643,"CreatedAt":"2026-08-03T06:04:46.986621Z","ExpiresAt":"2026-08-10T06:04:46.986619Z","IsRevoked":false,"Token":"oBr/rsXZMWZZoYFvc0h0BCY4irL8QMRRT5mAzniRAWg=","UserId":9}		2026-08-03 09:04:46.987444+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3O2:00000002
152	\N	System	Create	RefreshToken	-2147482642		{"Id":-2147482642,"CreatedAt":"2026-08-03T06:17:08.247443Z","ExpiresAt":"2026-08-10T06:17:08.247443Z","IsRevoked":false,"Token":"2p4Uau2XUIbRchUM8D3vFfilPNOm4pGTydFjsyP/kUQ=","UserId":9}		2026-08-03 09:17:08.248131+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3Q3:00000003
153	\N	System	Create	RefreshToken	-2147482641		{"Id":-2147482641,"CreatedAt":"2026-08-03T06:30:45.449805Z","ExpiresAt":"2026-08-10T06:30:45.449804Z","IsRevoked":false,"Token":"npCT7S7cMhdha0sKEzu5nVEhOKNBkNmKkQn2mc6FjGA=","UserId":9}		2026-08-03 09:30:45.450089+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3QE:00000004
154	\N	System	Create	RefreshToken	-2147482640		{"Id":-2147482640,"CreatedAt":"2026-08-03T06:33:32.692424Z","ExpiresAt":"2026-08-10T06:33:32.692424Z","IsRevoked":false,"Token":"vSTNgtukGcjcb7D0Igr4xK\\u002BO11AwRsBlHYNlVcQuLoI=","UserId":9}		2026-08-03 09:33:32.692593+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3R0:00000002
155	\N	System	Create	RefreshToken	-2147482639		{"Id":-2147482639,"CreatedAt":"2026-08-03T06:51:16.715894Z","ExpiresAt":"2026-08-10T06:51:16.715894Z","IsRevoked":false,"Token":"MG2XVIF6k43/6L59Q3eBtbhZm3Ih3H4qmYwXxaLdVm0=","UserId":9}		2026-08-03 09:51:16.716056+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV3RF:00000004
156	9	Admin	Update	Product	30	{"StockQuantity":500}	{"StockQuantity":300}	StockQuantity	2026-08-03 11:09:47.352755+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV456:0000001E
157	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-08-03T08:09:47.374674Z","CreatedByUserId":9,"Description":"Sat\\u0131\\u015F","ProductId":30,"Quantity":200,"TransactionAmounth":0,"TransactionType":"OUT"}		2026-08-03 11:09:47.385749+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV456:0000001E
158	9	Admin	Delete	Product	32	{"Id":32,"Barcode":"8690003000011","BrandId":1,"CategoryId":21,"IsActive":true,"LocationId":5,"ModelId":1,"ProductName":"A4 Fotokopi Kagidi 5li Paket","PurchasePrice":180,"SalePrice":249.90,"SkuCode":"SKU-32","StockQuantity":120,"SupplierId":12,"xmin":1066}			2026-08-03 11:19:58.623161+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV47C:00000004
161	9	Admin	Delete	Category	17	{"Id":17,"Name":"TEST1"}			2026-08-03 11:46:29.416678+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4A4:0000000B
162	9	Admin	Update	Product	30	{"CategoryId":21}	{"CategoryId":15}	CategoryId	2026-08-03 11:46:36.549934+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4A4:0000000F
163	9	Admin	Update	Product	33	{"CategoryId":21}	{"CategoryId":15}	CategoryId	2026-08-03 11:46:36.550086+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4A4:0000000F
164	9	Admin	Update	Product	34	{"CategoryId":21}	{"CategoryId":15}	CategoryId	2026-08-03 11:46:36.55017+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4A4:0000000F
165	9	Admin	Delete	Category	21	{"Id":21,"Name":"Ofis Malzemeleri"}			2026-08-03 11:46:36.559732+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4A4:0000000F
166	\N	System	Create	RefreshToken	-2147482638		{"Id":-2147482638,"CreatedAt":"2026-08-03T08:56:52.416953Z","ExpiresAt":"2026-08-10T08:56:52.416953Z","IsRevoked":false,"Token":"tBdIIff12zSD0y0XQBpn8bcxcBXLdYbb5WK7X/VJ10E=","UserId":9}		2026-08-03 11:56:52.417739+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4B8:00000002
167	9	Admin	Update	Product	26	{"CategoryId":19}	{"CategoryId":23}	CategoryId	2026-08-03 13:16:01.225584+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:00000008
168	9	Admin	Update	Product	27	{"CategoryId":19}	{"CategoryId":23}	CategoryId	2026-08-03 13:16:01.227852+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:00000008
169	9	Admin	Update	Product	28	{"CategoryId":19}	{"CategoryId":23}	CategoryId	2026-08-03 13:16:01.227872+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:00000008
170	9	Admin	Update	Product	35	{"CategoryId":19}	{"CategoryId":23}	CategoryId	2026-08-03 13:16:01.22788+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:00000008
172	9	Admin	Delete	Category	22	{"Id":22,"Name":"Temizlik \\u00DCr\\u00FCnleri"}			2026-08-03 13:16:07.349673+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:0000000A
173	9	Admin	Delete	Category	20	{"Id":20,"Name":"G\\u0131da ve \\u0130\\u00E7ecek"}			2026-08-03 13:16:11.830351+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4BK:0000000C
174	9	Admin	Delete	Product	34	{"Id":34,"Barcode":"8690003000035","BrandId":1,"CategoryId":15,"IsActive":true,"LocationId":5,"ModelId":1,"ProductName":"Plastik Dosya Klasoru","PurchasePrice":8,"SalePrice":16.90,"SkuCode":"SKU-34","StockQuantity":150,"SupplierId":12,"xmin":1242}			2026-08-03 14:00:45.983522+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4DN:00000004
175	\N	System	Create	RefreshToken	-2147482637		{"Id":-2147482637,"CreatedAt":"2026-08-03T11:01:45.419028Z","ExpiresAt":"2026-08-10T11:01:45.419027Z","IsRevoked":false,"Token":"sUlzrOiD72\\u002BVaS42td7oEQqs\\u002B0XCiY428UhwNtTXQPE=","UserId":9}		2026-08-03 14:01:45.419292+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4DV:00000001
176	\N	System	Create	RefreshToken	-2147482636		{"Id":-2147482636,"CreatedAt":"2026-08-03T11:01:59.849207Z","ExpiresAt":"2026-08-10T11:01:59.849207Z","IsRevoked":false,"Token":"mMoXWnxzaxc3wdMpmICFoc/iplmEUQqSgXvH4GzyBvE=","UserId":9}		2026-08-03 14:01:59.849429+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4DV:00000002
177	9	Admin	Update	Product	51	{"CategoryId":35}	{"CategoryId":15}	CategoryId	2026-08-03 14:33:53.51787+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4I5:0000001E
178	9	Admin	Delete	Category	35	{"Id":35,"Name":"Test Kategori 10"}			2026-08-03 14:33:53.525629+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4I5:0000001E
179	\N	System	Create	RefreshToken	-2147482635		{"Id":-2147482635,"CreatedAt":"2026-08-03T11:34:16.707411Z","ExpiresAt":"2026-08-10T11:34:16.707411Z","IsRevoked":false,"Token":"ITmcTkySEQy2hfOzPwSemjOxs2i3l62BKoj4b5OOJXw=","UserId":9}		2026-08-03 14:34:16.707671+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4I5:00000022
180	\N	System	Create	RefreshToken	-2147482634		{"Id":-2147482634,"CreatedAt":"2026-08-03T13:18:03.459808Z","ExpiresAt":"2026-08-10T13:18:03.459808Z","IsRevoked":false,"Token":"ikAfwHK/zS5R\\u002B4ExKbQYBamyHRSpHmoLBXchw8xr\\u002BEg=","UserId":9}		2026-08-03 16:18:03.460402+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4O3:00000006
181	\N	System	Create	RefreshToken	-2147482633		{"Id":-2147482633,"CreatedAt":"2026-08-04T06:09:45.514154Z","ExpiresAt":"2026-08-11T06:09:45.514154Z","IsRevoked":false,"Token":"qLfgFLzoXnpf55cgGhQtZpmVrmGGeiljKu7gBAMefqs=","UserId":9}		2026-08-04 09:09:45.514894+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4PN:00000002
182	\N	System	Create	RefreshToken	-2147482632		{"Id":-2147482632,"CreatedAt":"2026-08-04T11:12:15.489993Z","ExpiresAt":"2026-08-11T11:12:15.489993Z","IsRevoked":false,"Token":"/d64CTT9B9L/\\u002B1UXoLTJ6aN69cwnFDgX8x/iZIU/jns=","UserId":9}		2026-08-04 14:12:15.490779+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV4S6:0000000A
183	9	Admin	Update	Product	38	{"StockQuantity":1}	{"StockQuantity":2}	StockQuantity	2026-08-04 15:24:04.217457+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5DH:00000014
184	9	Admin	Create	StockMovement	-2147482646		{"Id":-2147482646,"CreatedAt":"2026-08-04T12:24:04.244567Z","CreatedByUserId":9,"Description":"sdac","ProductId":38,"Quantity":1,"TransactionAmounth":0,"TransactionType":"IN"}		2026-08-04 15:24:04.245251+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5DH:00000014
185	9	Admin	Delete	Product	38	{"Id":38,"Barcode":"sku-1004","BrandId":1,"CategoryId":23,"IsActive":true,"LocationId":null,"ModelId":1,"ProductName":"adnan","PurchasePrice":1,"SalePrice":1,"SkuCode":"SKU-38","StockQuantity":2,"SupplierId":10,"xmin":1262}			2026-08-04 15:26:19.275221+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5F2:0000000C
186	\N	System	Create	RefreshToken	-2147482631		{"Id":-2147482631,"CreatedAt":"2026-08-04T13:23:09.684236Z","ExpiresAt":"2026-08-11T13:23:09.684236Z","IsRevoked":false,"Token":"0l0TGfrij1HI7rBuAnCDIbfGD7qJB/zA4TYxjIKyPEE=","UserId":9}		2026-08-04 16:23:09.685854+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5SI:00000002
187	\N	System	Create	RefreshToken	-2147482630		{"Id":-2147482630,"CreatedAt":"2026-08-04T13:33:57.233795Z","ExpiresAt":"2026-08-11T13:33:57.233795Z","IsRevoked":false,"Token":"o85nrk2LbKeHHgtdjryfHoyxA3GJH999auQXBlQVhVk=","UserId":9}		2026-08-04 16:33:57.234242+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5T0:00000002
188	\N	System	Create	RefreshToken	-2147482629		{"Id":-2147482629,"CreatedAt":"2026-08-05T05:57:45.612057Z","ExpiresAt":"2026-08-12T05:57:45.612056Z","IsRevoked":false,"Token":"r5v2RHIJx6nE3W24VlAJRCof9hXioV4Sh0w\\u002BO\\u002B8a6PM=","UserId":9}		2026-08-05 08:57:45.612614+03	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5TP:00000002
189	\N	System	Create	RefreshToken	-2147482628		{"Id":-2147482628,"CreatedAt":"2026-08-05T05:59:41.616211Z","ExpiresAt":"2026-08-12T05:59:41.616211Z","IsRevoked":false,"Token":"sBWrVvZTzMb4X5zm4OyPPHwk9UDRkhVAkvdfcZKvMHk=","UserId":9}		2026-08-05 08:59:41.61639+03	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5UF:00000003
190	\N	System	Create	RefreshToken	-2147482627		{"Id":-2147482627,"CreatedAt":"2026-08-05T05:59:44.52164Z","ExpiresAt":"2026-08-12T05:59:44.52164Z","IsRevoked":false,"Token":"UX6XhICi28dCcwlHU1tUIF49MKsGP22RquP/hKymZ1s=","UserId":9}		2026-08-05 08:59:44.521782+03	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV5UF:00000004
191	\N	System	Create	RefreshToken	-2147482626		{"Id":-2147482626,"CreatedAt":"2026-08-05T06:52:14.452239Z","ExpiresAt":"2026-08-12T06:52:14.452239Z","IsRevoked":false,"Token":"ew9QXBCTqma0\\u002BT6C2ddpUi7cv1Rhw2jiG5rRgeLiYGQ=","UserId":9}		2026-08-05 09:52:14.452691+03	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNEQM8AV60C:00000003
\.


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Categories" ("Id", "Name") FROM stdin;
2	Elektronikgjb
12	das
13	a
15	Kategorisiz
23	Giyim
26	Test Kategori 1
27	Test Kategori 2
28	Test Kategori 3
29	Test Kategori 4
30	Test Kategori 5
31	Test Kategori 6
32	Test Kategori 7
33	Test Kategori 8
34	Test Kategori 9
\.


--
-- Data for Name: Brands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Brands" ("Id", "Name", "CategoryId") FROM stdin;
1	Bilinmiyor	15
2	Test Marka 1	15
3	Test Marka 2	15
4	Test Marka 3	15
5	Test Marka 4	15
6	Test Marka 5	15
7	Test Marka 6	15
8	Test Marka 7	15
9	Test Marka 8	15
10	Test Marka 9	15
11	Test Marka 10	15
12	Test Marka Kategori	2
\.


--
-- Data for Name: Equipments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipments" ("Id", "EquipmentName", "Status", "CurrentHolderName", "EquipmentCode") FROM stdin;
1	Dell Latitude 5440 Dizüstü Bilgisayar	InUse	Ahmet Yılmaz	EQP-001
2	Logitech MX Master 3 Kablosuz Mouse	InUse	Ayşe Demir	EQP-002
3	iPhone 14 Pro (Şirket Telefonu)	Available	\N	EQP-003
4	HP LaserJet Pro MFP Yazıcı	UnderMaintenance	\N	EQP-004
5	Dell UltraSharp 27 Monitör	Retired	\N	EQP-005
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("UserId", "Name", "Email", "PasswordHash", "Role") FROM stdin;
1	Test Kullanici	test@ornek.com	$2a$11$I2OQ2x1D0jBteSDF4vioRu8kF1PX.HDF9fpggzCV/.i2yH9AJPkK6	User
2			$2a$11$3jDv8Sn1Z716KMT6RvV5/u3gmqyov9puIBkq.hie6o36soo.2zuo.	User
3	Ali Veli	ali3@ornek.com	$2a$11$Vr9cu8YDPc0wz.bcVHZ0sOa.406B0lClxnSDH8OfR2t4/tWBSzlMG	User
5	Test Refresh	test.refresh.checklist@example.com	$2a$11$vhBUY8QdM5Bljo9tkIZ1G.Xa.1392MmJVvKY324vGfnmOGkxV8OH.	User
6	Test Refresh 2	test.refresh.checklist2@example.com	$2a$11$A.7I.DQXyjMckVkoI9Ynw.QvYTqfz71qKSBIqg.yE7h.H/yazW2CO	User
4	Adnan Emir	emirkirim5101@gmail.com	$2a$11$HxhPt9pxgq.T98NOw1.RoOAR4D6lkpWHtjkrpBIN2x6h3JA/rHBPG	Admin
9	Admin	admin@admin.com	$2a$11$955BmuZM10ZxtQNrmZoIX.oxOp3gby24YRkdR5KgX.BRJVn9lizXe	Admin
10	Test Kullanici 1	testuser1@test.com	$2a$11$k3JGBRhqWZqW5sJ27STVNOjNM5NFTs1O1cB1uSdO9M6T4tMqBKjPi	User
11	Test Kullanici 2	testuser2@test.com	$2a$11$BkdI4AFb9DRimOdfI00En.Anp4OqL.pFHx1zOv0HtJ4odKrwdUfEa	User
12	Test Kullanici 3	testuser3@test.com	$2a$11$KRMz.D2CNoxyGIu2AnLc3./dRF8sZVBBdB1J1r4.ypoHJIp.s8aaS	User
13	Test Kullanici 4	testuser4@test.com	$2a$11$amYruDKSvJdShmoZvVdylOMkI4s3w2IgApSRxtvxtETLY70kY4q6O	User
14	Test Kullanici Deneme	testuserdeneme@test.com	$2a$11$.Aj.AqsGgZy2Pp2Go1/LfOYB96s70/zDV.p86kxxNXWBBSPRAPjUq	User
15	Test Kullanici 5	testuser5@test.com	$2a$11$ENg.5yFmZIn5CoxCPCYm5.nNJs03E9HmeqSZqof.IgOS9j3LwDShC	User
16	Test Kullanici 6	testuser6@test.com	$2a$11$oqmYvrI2OWQ2Nu/w9TNU9ed12g5JQf885bBVLevTPI.mTYvLSQVWq	User
17	Test Kullanici 7	testuser7@test.com	$2a$11$ViiGmw1uzw5hUqAaWPS9tuCL4yJMfcNV9WeNFRabe/famuAoLoVfG	User
18	Test Kullanici 8	testuser8@test.com	$2a$11$8dsJqCICo3F9/VRUfmoIjuJ3UnVuDytWbldJ9/jbe3LTp8wMsbt9G	User
19	Test Kullanici 9	testuser9@test.com	$2a$11$fguv3tth.hBvL.mwsC2wOeex5UvivM0gcYucIfRKJRKH4XTyTXu0G	User
\.


--
-- Data for Name: EquipmentTransactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentTransactions" ("Id", "EquipmentId", "EmployeeName", "Type", "Condition", "Date", "Notes", "CreatedByUserId") FROM stdin;
1	1	Ahmet Yılmaz	CheckOut	Working	2026-01-05 12:30:00+03	Yeni işe başlayan personel için teslim edildi.	\N
2	2	Ayşe Demir	CheckOut	Working	2026-02-10 17:00:00+03	\N	\N
3	3	Mehmet Kaya	CheckOut	Working	2026-01-15 13:00:00+03	Saha ziyaretleri için teslim edildi.	\N
4	3	Mehmet Kaya	CheckIn	Working	2026-03-01 14:15:00+03	Proje tamamlandı, cihaz iade edildi.	\N
5	4	Zeynep Şahin	CheckOut	Working	2026-01-20 12:00:00+03	Muhasebe departmanına kuruldu.	\N
6	4	Zeynep Şahin	CheckIn	NeedsRepair	2026-04-12 19:45:00+03	Kağıt sıkışması arızası var, teknik servise gönderildi.	\N
7	5	Emir Kırım	CheckOut	Working	2025-11-01 12:00:00+03	\N	\N
8	5	Emir Kırım	CheckIn	Damaged	2026-02-20 16:30:00+03	Ekranda çatlak oluştu, kullanılamaz durumda.	\N
\.


--
-- Data for Name: Models; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Models" ("Id", "Name", "BrandId") FROM stdin;
1	Bilinmiyor	1
2	Test Model Deneme	2
3	Test Model 1	3
4	Test Model 2	4
5	Test Model 3	5
6	Test Model 4	6
7	Test Model 5	7
8	Test Model 6	8
9	Test Model 7	9
10	Test Model 8	10
11	Test Model 9	11
\.


--
-- Data for Name: Suppliers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Suppliers" ("Id", "CompanyName", "ContactPerson", "Phone", "Email", "Address", "IsActive", "TaxNumber", "TaxOffice") FROM stdin;
8	test	test	05555555555	test@test.com	test	f	1234567890	kartal
10	Anadolu Elektronik San. Tic. A.Ş.	Mehmet Yılmaz	0212 555 12 34	info@anadoluelektronik.com.tr	Barbaros Mah. Sanayi Cad. No:14 Kadıköy/İstanbul	t	1234567890	Kadıköy
11	Ege Gıda Dağıtım Ltd. Şti.	Ayşe Kaya	0232 444 56 78	siparis@egegida.com.tr	Gaziemir Serbest Bölge No:22 İzmir	t	9876543210	Bornova
12	Marmara Ofis ve Kırtasiye A.Ş.	Emre Demir	0216 333 90 00	destek@marmaraofis.com	İkitelli OSB Mah. No:8 İstanbul	t	5647382910	Ümraniye
13	Test Tedarikci 1	Kisi 1	05001112233	tedarikci1@test.com	Test Adres 1	t	1000000001	Kadikoy
14	Test Tedarikci 2	Kisi 2	05001112233	tedarikci2@test.com	Test Adres 2	t	1000000002	Kadikoy
15	Test Tedarikci 3	Kisi 3	05001112233	tedarikci3@test.com	Test Adres 3	t	1000000003	Kadikoy
16	Test Tedarikci 4	Kisi 4	05001112233	tedarikci4@test.com	Test Adres 4	t	1000000004	Kadikoy
17	Test Tedarikci 5	Kisi 5	05001112233	tedarikci5@test.com	Test Adres 5	t	1000000005	Kadikoy
18	Test Tedarikci 6	Kisi 6	05001112233	tedarikci6@test.com	Test Adres 6	t	1000000006	Kadikoy
19	Test Tedarikci 7	Kisi 7	05001112233	tedarikci7@test.com	Test Adres 7	t	1000000007	Kadikoy
20	Test Tedarikci 8	Kisi 8	05001112233	tedarikci8@test.com	Test Adres 8	t	1000000008	Kadikoy
21	Test Tedarikci 9	Kisi 9	05001112233	tedarikci9@test.com	Test Adres 9	t	1000000009	Kadikoy
22	Test Tedarikci 10	Kisi 10	05001112233	tedarikci10@test.com	Test Adres 10	t	10000000010	Kadikoy
\.


--
-- Data for Name: WarehouseLocations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."WarehouseLocations" ("Id", "Corridor", "Shelf", "Section") FROM stdin;
2	A	1	1
3	A	2	1
4	B	1	3
5	C	4	2
6	Koridor-1	Raf-1	Bolum-1
7	Koridor-2	Raf-2	Bolum-2
8	Koridor-3	Raf-3	Bolum-3
9	Koridor-4	Raf-4	Bolum-4
10	Koridor-5	Raf-5	Bolum-5
11	Koridor-6	Raf-6	Bolum-6
12	Koridor-7	Raf-7	Bolum-7
13	Koridor-8	Raf-8	Bolum-8
14	Koridor-9	Raf-9	Bolum-9
15	Koridor-10	Raf-10	Bolum-10
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Products" ("Id", "ProductName", "PurchasePrice", "SalePrice", "Barcode", "StockQuantity", "CategoryId", "IsActive", "SupplierId", "LocationId", "BrandId", "ModelId", "SkuCode") FROM stdin;
42	Test Urun 1	10	20	test-barcode-1-1785480260070344000	10	26	t	13	6	2	2	TEST-SKU-1-1785480260072752000
43	Test Urun 2	20	40	test-barcode-2-1785480260191977000	15	27	t	14	7	3	3	TEST-SKU-2-1785480260193992000
44	Test Urun 3	30	60	test-barcode-3-1785480260222323000	20	28	t	15	8	4	4	TEST-SKU-3-1785480260224467000
45	Test Urun 4	40	80	test-barcode-4-1785480260248466000	25	29	t	16	9	5	5	TEST-SKU-4-1785480260250517000
46	Test Urun 5	50	100	test-barcode-5-1785480260273100000	30	30	t	17	10	6	6	TEST-SKU-5-1785480260275177000
47	Test Urun 6	60	120	test-barcode-6-1785480260296963000	35	31	t	18	11	7	7	TEST-SKU-6-1785480260299010000
48	Test Urun 7	70	140	test-barcode-7-1785480260322631000	40	32	t	19	12	8	8	TEST-SKU-7-1785480260325012000
49	Test Urun 8	80	160	test-barcode-8-1785480260346745000	45	33	t	20	13	9	9	TEST-SKU-8-1785480260348677000
50	Test Urun 9	90	180	test-barcode-9-1785480260370239000	50	34	t	21	14	10	10	TEST-SKU-9-1785480260372857000
30	Bitter Cikolata 80g	12	24.90	8690002000027	300	15	t	11	\N	3	3	SKU-30
33	Tukenmez Kalem Kutusu 50 Adet	90	149.90	8690003000028	40	15	t	12	5	1	1	SKU-33
26	Kablosuz Optik Mouse	90	159.90	8690001000019	210	23	t	10	\N	1	1	SKU-26
27	degisti	35	69.90	8690001000026	200	23	t	10	\N	1	1	SKU-27
28	değiştirdim	250	449.90	8690001000033	45	23	t	10	\N	1	1	SKU-28
35	Yuzey Temizleyici 750ml	28	49.90	8690004000012	80	23	t	10	\N	1	1	SKU-35
51	Test Urun 10	100	200	test-barcode-10-1785480260394643000	55	15	t	22	15	11	11	TEST-SKU-10-1785480260396556000
40	Audit Test Ürün	50	100	audit-test-001	7	2	t	8	\N	1	1	SKU-40
\.


--
-- Data for Name: RefreshTokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RefreshTokens" ("Id", "Token", "UserId", "ExpiresAt", "IsRevoked", "CreatedAt") FROM stdin;
1	j4A5v+axpUUoav6spztslrWBXM4XCq+6aLTAK78xwgVpHDKcvUeOPwfkR7HY35IttXDPRg9bKO9YpbhWQlEb7w==	6	2026-07-23 15:04:51.051836+03	t	2026-07-16 15:04:51.051862+03
2	H7ZdnvZZyahuBuPbthUJmb60hebLxScsXsDuxDkkQlO5BYNd0WwKiqX04+vPmasUbigNp75xcRm7+EGYmgOL4w==	6	2026-07-23 15:05:12.990782+03	t	2026-07-16 15:05:12.990782+03
5	XjPYgPvwvdDxqhp3Pd20iiw9SCEwsLj8F6G3CWIJPQk=	6	2026-07-23 15:16:37.73255+03	t	2026-07-16 15:16:37.73255+03
3	XOB2KSTx27MsWtCcgdXqFy6AxBY1moPz8amHd2PWSIeG47inTsgTP6NccBEJ/z/lnu40GfbEYwnQ8YHfpKE5jQ==	6	2026-07-15 15:06:50.109811+03	t	2026-07-16 15:06:50.004483+03
4	r9Wolc6yhtDtHBoaIKE236W7xLdKHlXXJVNcdbYncAk=	6	2026-07-23 15:15:48.682435+03	t	2026-07-16 15:15:48.682463+03
6	9kbXJoxXKGfdzgtZVQ49RjJD21SxNSpqB1Wi9YZ+a6I=	6	2026-07-23 15:16:37.778248+03	t	2026-07-16 15:16:37.778248+03
7	oy3OuVozILosXQtwyvRqUt0JLbDizZ++nWlnacEeIZI=	4	2026-07-24 09:55:06.337189+03	f	2026-07-17 09:55:06.337217+03
8	kLLBYhln35WTwY1iWaaZeT4XZK0WMkWeC7eRXL4GEss=	4	2026-07-24 10:06:09.323008+03	f	2026-07-17 10:06:09.323034+03
10	jRNKYntGWVCiSL9hEWIogm24nb7g8UFffdWkKbVoFuw=	4	2026-07-24 10:10:44.630965+03	f	2026-07-17 10:10:44.630966+03
11	i+/gWW2BlV0ILI1LJqkg6K5Ataj641r7lvSOOwwCjiE=	4	2026-07-24 10:11:06.761152+03	f	2026-07-17 10:11:06.761153+03
12	XyaW5YgacWt1KMxdCYtCvhnbNsadfbU3jZYKthWXPP8=	4	2026-07-24 11:07:00.760798+03	f	2026-07-17 11:07:00.760828+03
13	7jkkjD2GkDjhka5aHUuSBGHeWOpgizpGXPEWEp8Z5Wc=	4	2026-07-24 12:48:29.711274+03	f	2026-07-17 12:48:29.711304+03
14	Oru2+H8XtY4N9RDBMJTjGlh8cgTRuvTy2JWhFQsOdrs=	4	2026-07-24 12:48:39.163346+03	f	2026-07-17 12:48:39.163346+03
15	FlZcxkwIPU1fpFZ1yGiXOHSY8SQqC3XHPQ5qkgNcZHI=	4	2026-07-24 12:48:51.664927+03	f	2026-07-17 12:48:51.664927+03
16	5TUUVCHOZuMbs9CF+GOI4zgkZ/VKVsU464NnufAuCEc=	4	2026-07-24 13:07:54.163826+03	f	2026-07-17 13:07:54.163852+03
17	oENpGgp3SjGLlaFQ/qjaUEMbsBfciadZVUA2D2E8UTM=	4	2026-07-24 13:08:22.261858+03	f	2026-07-17 13:08:22.261858+03
18	5x/BXgwHjXY/9k0n0kGUW5500kn4+khmnDfK7HOPj0A=	4	2026-07-24 13:09:30.101041+03	f	2026-07-17 13:09:30.101069+03
19	stS6/iNPuzGmVreGKX/tGIOwiTnKeg545/ven/Uzdw8=	4	2026-07-24 13:09:42.772009+03	f	2026-07-17 13:09:42.77201+03
20	2q2VR7FyuafP/PDbYWqevmQfvJ5fMZm+pm0MlE1fYu8=	4	2026-07-24 13:35:45.513606+03	f	2026-07-17 13:35:45.513633+03
21	tMe4P+rQalZmhzuXCxOI5Zj+nsW5/G22OMLbkDmT3pE=	4	2026-07-24 13:35:56.975496+03	f	2026-07-17 13:35:56.975496+03
22	ZiCHrFkGct0m3gpqGqrvzrUZr5Kl49CIYf3ThhrvSUI=	4	2026-07-24 13:36:07.375257+03	f	2026-07-17 13:36:07.375257+03
23	T8eWnoO5vJIUwzI623WK3fODhtaFCr9j9GuM9QYau2A=	4	2026-07-24 13:36:23.535482+03	f	2026-07-17 13:36:23.535482+03
24	M3tRLMNKti56hUMYXNf7HnTpptM2MAHxYKkUUqROQXQ=	4	2026-07-24 13:41:19.883951+03	f	2026-07-17 13:41:19.883951+03
25	/WE4lkRezNmN5lbJtV6BFmsftmKcM9RqDP8cvd5goTU=	4	2026-07-24 13:41:34.2013+03	f	2026-07-17 13:41:34.2013+03
26	PjEKAjNJ1S1n2H2OFL9szggdB8+KcAxOdfTRzRDTjGk=	4	2026-07-24 13:41:46.081226+03	f	2026-07-17 13:41:46.081226+03
27	lHkk7cMhhVfhXr34a+/5G7JvNHFW5NXwD0bndX2Hzhk=	4	2026-07-24 13:41:57.101942+03	f	2026-07-17 13:41:57.101944+03
28	18yVMu2s/fXmvmSlt7N52CY4c7LrGywkMqgH+AozLic=	4	2026-07-24 13:42:06.081326+03	f	2026-07-17 13:42:06.081326+03
29	fvD//PU1XYX7udH0i5/lZ3e96MGRt+FPqyGsFDmZj+g=	4	2026-07-24 13:42:27.891698+03	f	2026-07-17 13:42:27.891698+03
30	wZP1O3AmF1q1Fp4LAENZSIdPuLhqRMH9Qoyrm+L/d5Y=	4	2026-07-24 13:43:12.957312+03	f	2026-07-17 13:43:12.957312+03
31	7hGZ6F1xFqvs5Z8BZ4I+3yfmdLt/j2MVPo7kSIBTUNM=	4	2026-07-24 13:59:25.699598+03	f	2026-07-17 13:59:25.699624+03
32	7CRuJiRxIhhvOt0M85nEqdpLU1Y3iqLkDV+tzMN/38I=	4	2026-07-24 14:02:40.069624+03	f	2026-07-17 14:02:40.069624+03
33	53ChgKipq2NOLVswqgMRJKv/qw35Bviu+UbQd8f6UWk=	4	2026-07-24 14:14:18.028293+03	f	2026-07-17 14:14:18.028321+03
34	U4ZcS1ZFD3vhMe79CyzfD64vQwqRluIeV93UdIqSWfI=	4	2026-07-24 14:30:09.139616+03	f	2026-07-17 14:30:09.139642+03
35	GEKTCVDOdFRZEuFmS9uGFjY7K/kXbXGxC8Lb0ejb76A=	4	2026-07-24 14:35:33.04577+03	f	2026-07-17 14:35:33.04577+03
36	rBK9KbB33rUGK4dl1GwqZo7v3Ibl3xw9s+G6i36FrQk=	4	2026-07-24 15:04:30.946388+03	f	2026-07-17 15:04:30.946388+03
37	kuNThBisFzbrFtNrqQ+lLHlczbxodNTCfa0XX3UjlDQ=	4	2026-07-24 15:22:06.999696+03	f	2026-07-17 15:22:06.999696+03
38	GNxrXsV5+FFRIX1p7ecwe6DNcUhYzTL79/o1G/C6E5E=	4	2026-07-24 15:43:24.981767+03	f	2026-07-17 15:43:24.981767+03
39	0RUSOUSdVDn3I9VggXZamLO5V432ABFWv6PLSCxI4/g=	4	2026-07-24 15:45:46.483316+03	f	2026-07-17 15:45:46.483317+03
40	g2RtqwwEnd7d05hARDbFewOhfH4Th6OgJM0kKvMZaEc=	4	2026-07-24 15:59:37.071146+03	f	2026-07-17 15:59:37.071172+03
41	dudMSBBqCzkK5dTl4WyW9+337NAAOz2j9UPx3O34GiY=	4	2026-07-24 16:03:01.280439+03	f	2026-07-17 16:03:01.28044+03
42	+q9kImNXAzk9rPpPAhttTwavJVP9xMvKySCvjMoBmog=	4	2026-07-24 16:24:53.121925+03	f	2026-07-17 16:24:53.121925+03
43	ZdSBBiJLmVcvlJ+1vK/JSm7oEd9yNMNIi9KiFeyxeIg=	9	2026-08-06 14:57:54.848804+03	f	2026-07-30 14:57:54.848832+03
44	FE/vuK5AX41sKeeKxq+2rJ9BSdg7uQNgo/E8OtS1QIc=	9	2026-08-06 14:58:01.410498+03	f	2026-07-30 14:58:01.410498+03
45	rXT1TCV8wefawqYIJv3oaZ3mnGvoH4YnyTf1p0gszuw=	9	2026-08-06 15:12:42.955241+03	f	2026-07-30 15:12:42.955271+03
46	/6LXbHMc7a/WkpKxApqdorS0OaK8aSgv25hBdI0LYJw=	9	2026-08-06 15:37:59.094899+03	f	2026-07-30 15:37:59.094929+03
47	tPpTXvo8l0mV63f/gX+cYi8aLLaTvf3JFub61ZI6L18=	9	2026-08-06 15:50:39.986314+03	f	2026-07-30 15:50:39.986314+03
48	8ni827+j01WL0a8R7PdDV739jq7PLUx/hQUdyk5O33Q=	9	2026-08-06 15:55:31.585312+03	f	2026-07-30 15:55:31.585344+03
49	kggVGvaDy8pJcGNfu+eSH46mbze+rwIQ8/1mfk2ALkk=	9	2026-08-06 16:04:07.488342+03	f	2026-07-30 16:04:07.488375+03
50	ziMsQ7DfXX1wp6ZFayo1R/65UE7XhOC7SsV8TXy+eCc=	9	2026-08-06 16:04:15.595513+03	f	2026-07-30 16:04:15.595513+03
51	iXfG3czurD8I7QVNbdH5xhPtT/n4kiV1QfLZ3era7K4=	9	2026-08-06 16:10:27.896462+03	f	2026-07-30 16:10:27.89649+03
52	NyJkQ5BgRdi0Df6lI1mJtrfRyCbxM2bTD92Nw7BeEoU=	9	2026-08-06 16:12:11.123755+03	f	2026-07-30 16:12:11.123782+03
53	7snkZf4XaL6r6FOZmb6Qcp7uG7zsHcU69srPzHZ5HNU=	9	2026-08-06 16:12:22.031497+03	f	2026-07-30 16:12:22.031497+03
54	+asJJFxAYhXvM+bmiHnCxHQvU3v13FdJAkxTbbbuxUw=	9	2026-08-06 16:12:31.612312+03	f	2026-07-30 16:12:31.612312+03
55	rjGzXNqv5lOgpJe7PKqzIP1femqdzl5I3LJyd83MVMc=	9	2026-08-06 16:12:39.799976+03	f	2026-07-30 16:12:39.799976+03
56	H7P7XVNmzJYex0BqZ0yu0t64urHs/exiUFc2qEWxQmY=	9	2026-08-06 16:16:37.365642+03	f	2026-07-30 16:16:37.365671+03
57	k8MUZUQS7ibUcoGqFjBxqWrjRjgoqcmI1kY5S6ypaIs=	9	2026-08-06 16:18:43.916995+03	f	2026-07-30 16:18:43.917023+03
58	rVfmfzELWgD3gyzTR1j8SMiPxNy5tYG84Zh5CppspkQ=	9	2026-08-07 09:42:45.310411+03	f	2026-07-31 09:42:45.310439+03
59	Ar2IwZP1Zezt100vYh1ghBQKY7Mcn20XbG4I4n4414A=	9	2026-08-07 09:56:34.419091+03	f	2026-07-31 09:56:34.419118+03
60	ttDEfeJmSFQ5wc81LbX+AQk73kW4VoS8QzGL1mdDXXU=	9	2026-08-07 10:04:07.284508+03	f	2026-07-31 10:04:07.284544+03
61	IoXjKpBcE4WgYriPfi+eZWUtvvLoghgH6ogfd5u4Njg=	9	2026-08-07 10:15:22.772247+03	f	2026-07-31 10:15:22.772273+03
62	5jc9eloFRb3DoXV2ojanrYthxW/CtJ/sDhqv7FTkIbQ=	9	2026-08-07 10:15:34.92962+03	f	2026-07-31 10:15:34.92962+03
63	emFFs+/JEfr3f6pj48fcMSJjJQa7fVsk9EYZEUZ7sek=	9	2026-08-07 10:32:21.169712+03	f	2026-07-31 10:32:21.169738+03
64	lX3wWjDqeqDdT7nHH4vOVEquOzFbP1cwDmf473ZknLU=	9	2026-08-07 13:16:13.099604+03	f	2026-07-31 13:16:13.099605+03
65	2DIUmYTolpclLM96UPpmqOxI6B33w28zKbACuHan2vo=	9	2026-08-07 14:05:23.536924+03	f	2026-07-31 14:05:23.536925+03
66	VyNU1ZOSyA96mQ6dbwcVzlsMsUKj09lIoL9OWquVWkc=	9	2026-08-07 15:36:43.055781+03	f	2026-07-31 15:36:43.055781+03
67	oBr/rsXZMWZZoYFvc0h0BCY4irL8QMRRT5mAzniRAWg=	9	2026-08-10 09:04:46.986619+03	f	2026-08-03 09:04:46.986621+03
68	2p4Uau2XUIbRchUM8D3vFfilPNOm4pGTydFjsyP/kUQ=	9	2026-08-10 09:17:08.247443+03	f	2026-08-03 09:17:08.247443+03
69	npCT7S7cMhdha0sKEzu5nVEhOKNBkNmKkQn2mc6FjGA=	9	2026-08-10 09:30:45.449804+03	f	2026-08-03 09:30:45.449805+03
70	vSTNgtukGcjcb7D0Igr4xK+O11AwRsBlHYNlVcQuLoI=	9	2026-08-10 09:33:32.692424+03	f	2026-08-03 09:33:32.692424+03
71	MG2XVIF6k43/6L59Q3eBtbhZm3Ih3H4qmYwXxaLdVm0=	9	2026-08-10 09:51:16.715894+03	f	2026-08-03 09:51:16.715894+03
72	tBdIIff12zSD0y0XQBpn8bcxcBXLdYbb5WK7X/VJ10E=	9	2026-08-10 11:56:52.416953+03	f	2026-08-03 11:56:52.416953+03
73	sUlzrOiD72+VaS42td7oEQqs+0XCiY428UhwNtTXQPE=	9	2026-08-10 14:01:45.419027+03	f	2026-08-03 14:01:45.419028+03
74	mMoXWnxzaxc3wdMpmICFoc/iplmEUQqSgXvH4GzyBvE=	9	2026-08-10 14:01:59.849207+03	f	2026-08-03 14:01:59.849207+03
75	ITmcTkySEQy2hfOzPwSemjOxs2i3l62BKoj4b5OOJXw=	9	2026-08-10 14:34:16.707411+03	f	2026-08-03 14:34:16.707411+03
76	ikAfwHK/zS5R+4ExKbQYBamyHRSpHmoLBXchw8xr+Eg=	9	2026-08-10 16:18:03.459808+03	f	2026-08-03 16:18:03.459808+03
77	qLfgFLzoXnpf55cgGhQtZpmVrmGGeiljKu7gBAMefqs=	9	2026-08-11 09:09:45.514154+03	f	2026-08-04 09:09:45.514154+03
78	/d64CTT9B9L/+1UXoLTJ6aN69cwnFDgX8x/iZIU/jns=	9	2026-08-11 14:12:15.489993+03	f	2026-08-04 14:12:15.489993+03
79	0l0TGfrij1HI7rBuAnCDIbfGD7qJB/zA4TYxjIKyPEE=	9	2026-08-11 16:23:09.684236+03	f	2026-08-04 16:23:09.684236+03
80	o85nrk2LbKeHHgtdjryfHoyxA3GJH999auQXBlQVhVk=	9	2026-08-11 16:33:57.233795+03	f	2026-08-04 16:33:57.233795+03
81	r5v2RHIJx6nE3W24VlAJRCof9hXioV4Sh0w+O+8a6PM=	9	2026-08-12 08:57:45.612056+03	f	2026-08-05 08:57:45.612057+03
82	sBWrVvZTzMb4X5zm4OyPPHwk9UDRkhVAkvdfcZKvMHk=	9	2026-08-12 08:59:41.616211+03	f	2026-08-05 08:59:41.616211+03
83	UX6XhICi28dCcwlHU1tUIF49MKsGP22RquP/hKymZ1s=	9	2026-08-12 08:59:44.52164+03	f	2026-08-05 08:59:44.52164+03
84	ew9QXBCTqma0+T6C2ddpUi7cv1Rhw2jiG5rRgeLiYGQ=	9	2026-08-12 09:52:14.452239+03	f	2026-08-05 09:52:14.452239+03
\.


--
-- Data for Name: StockMovements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StockMovements" ("Id", "ProductId", "TransactionType", "Quantity", "CreatedAt", "Description", "TransactionAmounth", "CreatedByUserId") FROM stdin;
5	26	IN	100	2026-07-17 13:44:50.504373+03	Ilk stok girisi	8500	4
6	26	OUT	10	2026-07-17 13:44:50.539039+03	Magaza satisi	1499	4
10	35	OUT	10	2026-07-17 13:44:50.602097+03	Temizlik departmanina sevkiyat	499	4
11	40	IN	10	2026-07-30 16:12:39.865045+03	İlk stok girişi	0	\N
12	40	OUT	3	2026-07-30 16:12:39.921086+03	Audit test hareketi	300	9
15	42	IN	5	2026-07-31 09:44:20.16913+03	İlk stok girişi	0	\N
16	43	IN	10	2026-07-31 09:44:20.214921+03	İlk stok girişi	0	\N
17	44	IN	15	2026-07-31 09:44:20.241278+03	İlk stok girişi	0	\N
18	45	IN	20	2026-07-31 09:44:20.265562+03	İlk stok girişi	0	\N
19	46	IN	25	2026-07-31 09:44:20.289926+03	İlk stok girişi	0	\N
20	47	IN	30	2026-07-31 09:44:20.314965+03	İlk stok girişi	0	\N
21	48	IN	35	2026-07-31 09:44:20.33996+03	İlk stok girişi	0	\N
22	49	IN	40	2026-07-31 09:44:20.363245+03	İlk stok girişi	0	\N
23	50	IN	45	2026-07-31 09:44:20.387522+03	İlk stok girişi	0	\N
24	51	IN	50	2026-07-31 09:44:20.411683+03	İlk stok girişi	0	\N
25	42	IN	5	2026-07-31 09:44:36.00158+03	Test stok hareketi	100	9
26	43	IN	5	2026-07-31 09:44:36.033252+03	Test stok hareketi	100	9
27	44	IN	5	2026-07-31 09:44:36.057312+03	Test stok hareketi	100	9
28	45	IN	5	2026-07-31 09:44:36.078094+03	Test stok hareketi	100	9
29	46	IN	5	2026-07-31 09:44:36.101699+03	Test stok hareketi	100	9
30	47	IN	5	2026-07-31 09:44:36.124315+03	Test stok hareketi	100	9
31	48	IN	5	2026-07-31 09:44:36.145049+03	Test stok hareketi	100	9
32	49	IN	5	2026-07-31 09:44:36.168765+03	Test stok hareketi	100	9
33	50	IN	5	2026-07-31 09:44:36.190831+03	Test stok hareketi	100	9
34	51	IN	5	2026-07-31 09:44:36.211187+03	Test stok hareketi	100	9
36	30	OUT	200	2026-08-03 11:09:47.374674+03	Satış	0	9
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20260709083954_InitialCreate	10.0.9
20260710064535_AddSupplierDetailsFields	10.0.9
20260710070501_AddWarehouseLocation	10.0.9
20260713125405_ReplaceBrandIdWithBrandName	10.0.9
20260714062056_AddUser	10.0.9
20260715140801_AddTransactionAmounthToStockMovement	10.0.9
20260716105319_AddRefreshToken	10.0.9
20260717100701_AddCreatedByUserToStockMovement	10.0.9
20260717103458_ChangeCategorySupplierDeleteBehaviorToRestrict	10.0.9
20260721130435_AddModelFieldToProduct	10.0.9
20260729081426_AddBrandAndModelTables	10.0.9
20260723133806_AddUniqueIndexToUserEmail	10.0.9
20260723143227_AddXminConcurrencyTokenToProduct	10.0.9
20260730072727_AuditLog	10.0.9
20260731060940_AddSkuCodeToProduct	10.0.9
20260731070023_AddCategoryToBrand	10.0.9
20260806124428_EquipmentAdd	10.0.9
20260807083711_EquipmentRedesign	10.0.9
20260807084125_SeedEquipmentData	10.0.9
\.


--
-- Name: AuditLogs_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AuditLogs_Id_seq"', 191, true);


--
-- Name: Brands_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Brands_Id_seq"', 12, true);


--
-- Name: Categories_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Categories_Id_seq"', 36, true);


--
-- Name: EquipmentTransactions_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EquipmentTransactions_Id_seq"', 9, false);


--
-- Name: Equipments_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Equipments_Id_seq"', 6, false);


--
-- Name: Models_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Models_Id_seq"', 11, true);


--
-- Name: Products_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Products_Id_seq"', 52, true);


--
-- Name: RefreshTokens_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RefreshTokens_Id_seq"', 84, true);


--
-- Name: StockMovements_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."StockMovements_Id_seq"', 37, true);


--
-- Name: Suppliers_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Suppliers_Id_seq"', 22, true);


--
-- Name: Users_UserId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_UserId_seq"', 19, true);


--
-- Name: WarehouseLocations_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WarehouseLocations_Id_seq"', 15, true);


--
-- PostgreSQL database dump complete
--

\unrestrict Bjp8acuAJSenoYUse58FXB7Boc8Vo4KW5ZMqh2rtXRcP9n9bNc7mHugf10h6hwY

