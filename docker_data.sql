--
-- PostgreSQL database dump
--

\restrict 0O8fAmw3d0ovOsMNV5XWfCFPvi9iKXiKMf5FySQ8vsCNENDz56xRilc18qmDaNZ

-- Dumped from database version 16.14
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
6	9	Admin	Update	Product	1	{"IsActive":true}	{"IsActive":false}	IsActive	2026-08-03 10:19:00.012124+00	192.168.65.1	curl/8.7.1	0HNNH920UAVTQ:00000001
7	9	Admin	Update	Product	1	{"LocationId":8}	{"LocationId":null}	LocationId	2026-08-03 10:19:00.039272+00	192.168.65.1	curl/8.7.1	0HNNH920UAVTR:00000001
9	9	Admin	Update	Product	1	{"IsActive":false,"LocationId":null}	{"IsActive":true,"LocationId":8}	IsActive,LocationId	2026-08-03 10:19:21.85544+00	192.168.65.1	curl/8.7.1	0HNNH920UAVTV:00000001
11	9	Admin	Update	Product	1	{"SalePrice":64999}	{"SalePrice":65999}	SalePrice	2026-08-03 10:27:20.659907+00	192.168.65.1	curl/8.7.1	0HNNH97689C0U:00000001
13	9	Admin	Update	Product	1	{"SalePrice":65999}	{"SalePrice":64999}	SalePrice	2026-08-03 10:27:32.737175+00	192.168.65.1	curl/8.7.1	0HNNH97689C11:00000001
43	9	Admin	Delete	Product	11	{"Id":11,"Barcode":"8690000010110","BrandId":3,"CategoryId":1,"IsActive":true,"LocationId":17,"ModelId":11,"ProductName":"Xiaomi Xiaomi 14 256 GB","PurchasePrice":34999,"SalePrice":37999,"SkuCode":"SKU-ELE-0011","StockQuantity":271,"SupplierId":1,"xmin":1099}			2026-08-05 08:15:24.476977+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNIP3J3JBRE:00000008
49	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"Cache Test Kategori"}		2026-08-05 10:56:24.373343+00	192.168.65.1	curl/8.7.1	0HNNIS0OC6IF1:00000001
51	9	Admin	Delete	Category	23	{"Id":23,"Name":"Cache Test Kategori"}			2026-08-05 10:56:35.337574+00	192.168.65.1	curl/8.7.1	0HNNIS0OC6IF6:00000001
55	9	Admin	Update	Product	1	{"StockQuantity":62}	{"StockQuantity":67}	StockQuantity	2026-08-05 10:59:55.69852+00	192.168.65.1	curl/8.7.1	0HNNIS2CD4LNV:00000001
56	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-08-05T10:59:55.7073252Z","CreatedByUserId":9,"Description":"SignalR test hareketi","ProductId":1,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}		2026-08-05 10:59:55.716248+00	192.168.65.1	curl/8.7.1	0HNNIS2CD4LNV:00000001
57	9	Admin	Update	Product	1	{"StockQuantity":67}	{"StockQuantity":62}	StockQuantity	2026-08-05 11:00:17.062889+00	192.168.65.1	curl/8.7.1	0HNNIS2CD4LO2:00000001
58	9	Admin	Delete	StockMovement	793	{"Id":793,"CreatedAt":"2026-08-05T10:59:55.707325Z","CreatedByUserId":9,"Description":"SignalR test hareketi","ProductId":1,"Quantity":5,"TransactionAmounth":100,"TransactionType":"IN"}			2026-08-05 11:00:17.074985+00	192.168.65.1	curl/8.7.1	0HNNIS2CD4LO2:00000001
64	9	Admin	Update	Product	33	{"StockQuantity":289}	{"StockQuantity":290}	StockQuantity	2026-08-05 12:23:33.445366+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNISF81PI5B:00000002
65	9	Admin	Create	StockMovement	-2147482647		{"Id":-2147482647,"CreatedAt":"2026-08-05T12:23:33.4583059Z","CreatedByUserId":9,"Description":"aaf","ProductId":33,"Quantity":1,"TransactionAmounth":0,"TransactionType":"IN"}		2026-08-05 12:23:33.4624+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNISF81PI5B:00000002
84	9	Admin	Create	Category	-2147482647		{"Id":-2147482647,"Name":"AuditTestCheck"}		2026-08-06 06:02:22.727648+00	192.168.65.1	curl/8.7.1	0HNNIVA124OKF:00000001
86	9	Admin	Delete	Category	24	{"Id":24,"Name":"AuditTestCheck"}			2026-08-06 06:03:54.077841+00	192.168.65.1	curl/8.7.1	0HNNIVA124OKK:00000001
87	9	Admin	Create	Category	25		{"Id":25,"Name":"AuditFixCheck"}		2026-08-06 06:10:32.628686+00	192.168.65.1	curl/8.7.1	0HNNJG5LV4KLG:00000001
88	9	Admin	Update	Category	25	{"Name":"AuditFixCheck"}	{"Name":"AuditFixCheckUpdated"}	Name	2026-08-06 06:10:48.4633+00	192.168.65.1	curl/8.7.1	0HNNJG5LV4KLI:00000001
89	9	Admin	Delete	Category	25	{"Id":25,"Name":"AuditFixCheckUpdated"}			2026-08-06 06:10:48.500049+00	192.168.65.1	curl/8.7.1	0HNNJG5LV4KLJ:00000001
90	1	Admin	Create	Product	200	{}	{"Id": 200, "ProductName": "Apple AirPods Pro 2 USB-C", "SalePrice": 11499, "StockQuantity": 51}		2020-01-15 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20200115000000-3286
91	1	Admin	Delete	StockMovement	301	{"Id": 301, "ProductId": 2, "TransactionType": "OUT", "Quantity": 38}	{}		2020-02-28 00:00:00+00	172.16.0.12	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20200228000000-1488
92	1	Admin	Create	Category	52	{}	{"Id": 52, "Name": "Giyim"}		2020-03-22 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20200322000000-4257
93	9	Admin	Create	Category	53	{}	{"Id": 53, "Name": "Temizlik Urunleri"}		2020-05-04 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20200504000000-1106
94	1	Admin	Update	Supplier	3	{"IsActive": false}	{"IsActive": true}	IsActive	2020-06-18 00:00:00+00	10.0.0.5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20200618000000-4527
95	9	Admin	Update	Product	2	{"SalePrice": 51943}	{"SalePrice": 53999}	SalePrice	2020-08-02 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20200802000000-6635
96	9	Admin	Create	Product	206	{}	{"Id": 206, "ProductName": "Samsung Galaxy Tab S9 128GB Wi-Fi", "SalePrice": 30999, "StockQuantity": 290}		2020-09-11 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20200911000000-7201
97	9	Admin	Create	Supplier	87	{}	{"Id": 87, "CompanyName": "Akdeniz Temizlik Urunleri San.", "IsActive": true}		2020-10-04 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20201004000000-1750
98	1	Admin	Update	Category	1	{"Name": "Elektronik"}	{"Name": "Elektronik (Guncel)"}	Name	2020-11-15 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20201115000000-7227
99	9	Admin	Create	Supplier	89	{}	{"Id": 89, "CompanyName": "Apple Teknoloji ve Satis Limited Sirketi", "IsActive": true}		2020-12-14 00:00:00+00	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20201214000000-4432
100	9	Admin	Update	Product	3	{"SalePrice": 77312}	{"SalePrice": 79999}	SalePrice	2021-01-25 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20210125000000-8573
101	9	Admin	Delete	StockMovement	308	{"Id": 308, "ProductId": 4, "TransactionType": "OUT", "Quantity": 44}	{}		2021-02-27 00:00:00+00	10.0.0.5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20210227000000-4752
102	1	Admin	Create	Supplier	92	{}	{"Id": 92, "CompanyName": "Marmara Ofis ve Kirtasiye A.S.", "IsActive": true}		2021-04-15 00:00:00+00	10.0.0.5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20210415000000-4456
103	9	Admin	Create	Category	63	{}	{"Id": 63, "Name": "Temizlik Urunleri"}		2021-05-24 00:00:00+00	172.16.0.12	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20210524000000-3340
104	1	Admin	Create	Category	64	{}	{"Id": 64, "Name": "Giyim"}		2021-06-22 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20210622000000-8019
105	9	Admin	Create	Supplier	95	{}	{"Id": 95, "CompanyName": "Apple Teknoloji ve Satis Limited Sirketi", "IsActive": true}		2021-08-10 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20210810000000-2489
106	1	Admin	Update	Product	3	{"SalePrice": 78844}	{"SalePrice": 79999}	SalePrice	2021-09-24 00:00:00+00	172.16.0.12	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20210924000000-7304
107	9	Admin	Delete	StockMovement	314	{"Id": 314, "ProductId": 5, "TransactionType": "OUT", "Quantity": 36}	{}		2021-10-27 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20211027000000-9797
108	9	Admin	Create	Supplier	98	{}	{"Id": 98, "CompanyName": "Anadolu Elektronik San. Tic. A.S.", "IsActive": true}		2021-12-11 00:00:00+00	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20211211000000-3591
109	1	Admin	Update	Category	5	{"Name": "Giyim"}	{"Name": "Giyim (Guncel)"}	Name	2022-01-15 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20220115000000-5889
110	1	Admin	Delete	Product	6	{"Id": 6, "ProductName": "Samsung Galaxy S24 256 GB"}	{}		2022-03-03 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20220303000000-6310
111	1	Admin	Update	Product	6	{"SalePrice": 51240}	{"SalePrice": 52999}	SalePrice	2022-04-08 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20220408000000-4946
112	1	Admin	Update	Product	8	{"SalePrice": 30216}	{"SalePrice": 30999}	SalePrice	2022-05-27 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20220527000000-3103
113	9	Admin	Delete	StockMovement	320	{"Id": 320, "ProductId": 3, "TransactionType": "OUT", "Quantity": 17}	{}		2022-07-08 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20220708000000-4470
114	1	Admin	Update	Category	4	{"Name": "Temizlik Urunleri"}	{"Name": "Temizlik Urunleri (Guncel)"}	Name	2022-08-15 00:00:00+00	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20220815000000-9479
115	1	Admin	Create	Category	75	{}	{"Id": 75, "Name": "Gida ve Icecek"}		2022-09-19 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20220919000000-1344
116	1	Admin	Create	Category	76	{}	{"Id": 76, "Name": "Elektronik"}		2022-10-28 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20221028000000-4750
117	1	Admin	Create	Supplier	107	{}	{"Id": 107, "CompanyName": "Anadolu Elektronik San. Tic. A.S.", "IsActive": true}		2022-11-20 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20221120000000-5562
118	9	Admin	Create	Category	78	{}	{"Id": 78, "Name": "Giyim"}		2023-01-01 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20230101000000-4981
119	9	Admin	Update	Supplier	2	{"IsActive": false}	{"IsActive": true}	IsActive	2023-02-16 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230216000000-8062
120	9	Admin	Update	Supplier	4	{"IsActive": false}	{"IsActive": true}	IsActive	2023-03-20 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230320000000-1993
121	9	Admin	Update	Product	4	{"SalePrice": 34715}	{"SalePrice": 35999}	SalePrice	2023-04-22 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20230422000000-3296
122	1	Admin	Update	Category	4	{"Name": "Temizlik Urunleri"}	{"Name": "Temizlik Urunleri (Guncel)"}	Name	2023-05-26 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230526000000-8260
123	1	Admin	Create	Product	233	{}	{"Id": 233, "ProductName": "Apple iPhone 16 128 GB", "SalePrice": 64999, "StockQuantity": 62}		2023-07-11 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230711000000-3724
124	9	Admin	Create	StockMovement	334	{}	{"Id": 334, "ProductId": 4, "TransactionType": "IN", "Quantity": 107}		2023-08-14 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230814000000-7209
125	9	Admin	Update	Category	4	{"Name": "Temizlik Urunleri"}	{"Name": "Temizlik Urunleri (Guncel)"}	Name	2023-09-04 00:00:00+00	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20230904000000-8973
126	1	Admin	Update	Category	2	{"Name": "Gida ve Icecek"}	{"Name": "Gida ve Icecek (Guncel)"}	Name	2023-09-29 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20230929000000-6138
127	1	Admin	Create	StockMovement	337	{}	{"Id": 337, "ProductId": 3, "TransactionType": "IN", "Quantity": 19}		2023-10-21 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20231021000000-4044
128	1	Admin	Create	Category	88	{}	{"Id": 88, "Name": "Temizlik Urunleri"}		2023-11-13 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20231113000000-1651
129	1	Admin	Update	Supplier	5	{"IsActive": false}	{"IsActive": true}	IsActive	2023-12-23 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20231223000000-5272
130	9	Admin	Create	Category	90	{}	{"Id": 90, "Name": "Ofis Malzemeleri"}		2024-01-19 00:00:00+00	172.16.0.12	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20240119000000-5915
131	9	Admin	Update	Product	1	{"SalePrice": 62622}	{"SalePrice": 64999}	SalePrice	2024-02-23 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20240223000000-2200
132	1	Admin	Delete	StockMovement	339	{"Id": 339, "ProductId": 5, "TransactionType": "OUT", "Quantity": 9}	{}		2024-04-01 00:00:00+00	10.0.0.5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20240401000000-5002
133	9	Admin	Delete	Product	8	{"Id": 8, "ProductName": "Samsung Galaxy Tab S9 128GB Wi-Fi"}	{}		2024-05-03 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20240503000000-9666
134	9	Admin	Update	Product	3	{"SalePrice": 78416}	{"SalePrice": 79999}	SalePrice	2024-05-24 00:00:00+00	192.168.1.10	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20240524000000-3546
135	9	Admin	Create	Category	95	{}	{"Id": 95, "Name": "Ofis Malzemeleri"}		2024-06-22 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20240622000000-9280
136	9	Admin	Create	Product	246	{}	{"Id": 246, "ProductName": "Apple iPhone 15 128 GB", "SalePrice": 53999, "StockQuantity": 127}		2024-07-28 00:00:00+00	172.16.0.12	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20240728000000-1722
137	9	Admin	Delete	Product	5	{"Id": 5, "ProductName": "Apple AirPods Pro 2 USB-C"}	{}		2024-08-18 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20240818000000-8007
138	1	Admin	Update	Product	2	{"SalePrice": 52889}	{"SalePrice": 53999}	SalePrice	2024-09-25 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20240925000000-7049
139	1	Admin	Update	Supplier	2	{"IsActive": false}	{"IsActive": true}	IsActive	2024-11-03 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20241103000000-6974
140	1	Admin	Create	Supplier	130	{}	{"Id": 130, "CompanyName": "Apple Teknoloji ve Satis Limited Sirketi", "IsActive": true}		2024-12-22 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20241222000000-6794
141	9	Admin	Delete	Product	4	{"Id": 4, "ProductName": "Apple iPad Air 64GB Wi-Fi"}	{}		2025-02-05 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20250205000000-7755
142	1	Admin	Create	Supplier	132	{}	{"Id": 132, "CompanyName": "Marmara Ofis ve Kirtasiye A.S.", "IsActive": true}		2025-02-26 00:00:00+00	192.168.1.24	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20250226000000-3608
143	1	Admin	Update	Supplier	1	{"IsActive": false}	{"IsActive": true}	IsActive	2025-04-13 00:00:00+00	172.16.0.12	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20250413000000-4269
144	9	Admin	Create	Supplier	134	{}	{"Id": 134, "CompanyName": "Karadeniz Gida Dagitim A.S.", "IsActive": true}		2025-05-30 00:00:00+00	192.168.1.24	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20250530000000-1387
145	1	Admin	Update	Supplier	3	{"IsActive": false}	{"IsActive": true}	IsActive	2025-07-11 00:00:00+00	10.0.0.5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20250711000000-5573
146	9	Admin	Delete	StockMovement	353	{"Id": 353, "ProductId": 6, "TransactionType": "OUT", "Quantity": 2}	{}		2025-08-12 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20250812000000-3925
147	9	Admin	Create	Product	257	{}	{"Id": 257, "ProductName": "Apple iPhone 15 128 GB", "SalePrice": 53999, "StockQuantity": 127}		2025-09-20 00:00:00+00	88.234.12.7	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20250920000000-6663
148	9	Admin	Update	Supplier	5	{"IsActive": false}	{"IsActive": true}	IsActive	2025-11-03 00:00:00+00	88.234.12.7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20251103000000-7311
149	1	Admin	Update	Category	1	{"Name": "Elektronik"}	{"Name": "Elektronik (Guncel)"}	Name	2025-12-22 00:00:00+00	172.16.0.12	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/118.0.0.0 Safari/537.36	req-20251222000000-9518
150	1	Admin	Create	Supplier	140	{}	{"Id": 140, "CompanyName": "Marmara Ofis ve Kirtasiye A.S.", "IsActive": true}		2026-02-06 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20260206000000-6143
151	1	Admin	Update	Category	5	{"Name": "Giyim"}	{"Name": "Giyim (Guncel)"}	Name	2026-03-20 00:00:00+00	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20260320000000-6344
152	9	Admin	Delete	StockMovement	359	{"Id": 359, "ProductId": 3, "TransactionType": "OUT", "Quantity": 13}	{}		2026-04-22 00:00:00+00	172.16.0.12	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20260422000000-3851
153	9	Admin	Update	Supplier	5	{"IsActive": false}	{"IsActive": true}	IsActive	2026-06-01 00:00:00+00	192.168.1.10	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20260601000000-5700
154	9	Admin	Create	Supplier	144	{}	{"Id": 144, "CompanyName": "Marmara Ofis ve Kirtasiye A.S.", "IsActive": true}		2026-06-28 00:00:00+00	172.16.0.12	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15	req-20260628000000-4501
155	9	Admin	Create	Category	26		{"Id":26,"Name":"GeneralizeCheck"}		2026-08-06 06:29:54.031954+00	192.168.65.1	curl/8.7.1	0HNNJGGG2MQ27:00000001
156	9	Admin	Delete	Category	26	{"Id":26,"Name":"GeneralizeCheck"}			2026-08-06 06:29:55.254044+00	192.168.65.1	curl/8.7.1	0HNNJGGG2MQ28:00000001
157	9	Admin	Create	WarehouseLocation	81		{"Id":81,"Corridor":"Z","Section":"9","Shelf":"9"}		2026-08-06 10:17:24.794421+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKRJ:00000001
158	9	Admin	Update	WarehouseLocation	81	{"Corridor":"Z"}	{"Corridor":"YENI"}	Corridor	2026-08-06 10:17:39.489948+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKRM:00000001
159	9	Admin	Delete	WarehouseLocation	81	{"Id":81,"Corridor":"YENI","Section":"9","Shelf":"9"}			2026-08-06 10:17:39.561302+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKRO:00000001
160	9	Admin	Create	Category	27		{"Id":27,"Name":"CacheTestKat"}		2026-08-06 10:17:55.982302+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKRS:00000001
161	9	Admin	Update	Category	27	{"Name":"CacheTestKat"}	{"Name":"CacheTestKatGuncel"}	Name	2026-08-06 10:17:56.066877+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKRU:00000001
162	9	Admin	Delete	Category	27	{"Id":27,"Name":"CacheTestKatGuncel"}			2026-08-06 10:17:56.117834+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKS0:00000001
163	9	Admin	Create	Model	326		{"Id":326,"BrandId":1,"Name":"CacheTestModel"}		2026-08-06 10:18:11.374105+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKS4:00000001
164	9	Admin	Delete	Model	326	{"Id":326,"BrandId":1,"Name":"CacheTestModel"}			2026-08-06 10:18:11.462295+00	192.168.65.1	curl/8.7.1	0HNNJKFKASKS6:00000001
165	9	Admin	Update	Product	1	{"StockQuantity":62}	{"StockQuantity":65}	StockQuantity	2026-08-06 11:22:24.408337+00	192.168.65.1	curl/8.7.1	0HNNJLJUDTR3T:00000001
166	9	Admin	Create	StockMovement	795		{"Id":795,"CreatedAt":"2026-08-06T11:22:24.4367783Z","CreatedByUserId":9,"Description":"try/catch fix testi","ProductId":1,"Quantity":3,"TransactionAmounth":50,"TransactionType":"IN"}		2026-08-06 11:22:24.448057+00	192.168.65.1	curl/8.7.1	0HNNJLJUDTR3T:00000001
167	9	Admin	Update	Product	1	{"StockQuantity":65}	{"StockQuantity":62}	StockQuantity	2026-08-06 11:22:24.550929+00	192.168.65.1	curl/8.7.1	0HNNJLJUDTR3U:00000001
168	9	Admin	Delete	StockMovement	795	{"Id":795,"CreatedAt":"2026-08-06T11:22:24.436778Z","CreatedByUserId":9,"Description":"try/catch fix testi","ProductId":1,"Quantity":3,"TransactionAmounth":50,"TransactionType":"IN"}			2026-08-06 11:22:24.562022+00	192.168.65.1	curl/8.7.1	0HNNJLJUDTR3U:00000001
169	9	Admin	Update	Product	12	{"LocationId":10}	{"LocationId":null}	LocationId	2026-08-06 12:13:02.564152+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNJLJUDTRG3:0000001D
170	9	Admin	Delete	Product	2	{"Id":2,"Barcode":"8690000010028","BrandId":1,"CategoryId":1,"IsActive":true,"LocationId":9,"ModelId":2,"ProductName":"Apple iPhone 15 128 GB","PurchasePrice":51200,"SalePrice":53999,"SkuCode":"SKU-ELE-0002","StockQuantity":127,"SupplierId":2,"xmin":1099}			2026-08-06 12:13:07.925812+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNJLJUDTRG3:00000021
171	9	Admin	Create	Equipment	11		{"Id":11,"EquipmentId":999,"EquipmentName":"Test Cihaz","TakenTime":"2026-08-07T00:00:00Z","UserName":"test.user"}		2026-08-07 07:50:19.673805+00	192.168.65.1	curl/8.7.1	0HNNKB1LL66IE:00000001
172	9	Admin	Delete	Equipment	6	{"Id":6,"EquipmentId":101,"EquipmentName":"Laptop - Dell Latitude 5540","TakenTime":"2026-08-07T07:48:43.199164Z","UserName":"ahmet.yilmaz"}			2026-08-07 07:50:19.774876+00	192.168.65.1	curl/8.7.1	0HNNKB1LL66IG:00000001
173	9	Admin	Create	Equipment	12		{"Id":12,"EquipmentId":1,"EquipmentName":"Laptop - Dell XPS 15","TakenTime":"2026-08-07T07:55:56.9115473Z","UserName":"ahmet.yilmaz"}		2026-08-07 07:55:56.918754+00	192.168.65.1	curl/8.7.1	0HNNKB57VFKB1:00000001
174	9	Admin	Update	Equipment	2	{"EquipmentName":"Monitor - LG 27inch","TakenTime":"2026-08-03T13:41:57.949773Z"}	{"EquipmentName":"Monitor - Guncellendi","TakenTime":"2026-08-07T00:00:00Z"}	EquipmentName,TakenTime	2026-08-07 08:11:29.044468+00	192.168.65.1	curl/8.7.1	0HNNKBDTOB24A:00000001
175	9	Admin	Update	Equipment	1	{"EquipmentId":1,"EquipmentName":"Laptop - Dell XPS 15","TakenTime":"2026-08-01T13:41:57.949773Z","UserName":"ahmet.yilmaz"}	{"EquipmentId":100,"EquipmentName":"Bilgisayar","TakenTime":"2026-08-07T08:13:39.324Z","UserName":"Adnan Emir"}	EquipmentId,EquipmentName,TakenTime,UserName	2026-08-07 08:13:56.167685+00	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNKBDTOB24D:00000005
176	9	Admin	Create	Equipment	13		{"Id":13,"EquipmentId":150,"EquipmentName":"R-Telefon","TakenTime":"2026-08-07T08:14:07.43Z","UserName":"Elif"}		2026-08-07 08:14:34.624292+00	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNKBDTOB24D:00000007
177	9	Admin	Delete	Equipment	13	{"Id":13,"EquipmentId":150,"EquipmentName":"R-Telefon","TakenTime":"2026-08-07T08:14:07.43Z","UserName":"Elif"}			2026-08-07 08:14:59.337361+00	77.92.118.122	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNKBDTOB24D:00000009
178	9	Admin	Update	Supplier	1	{"Phone":"0212 555 12 34"}	{"Phone":"0212 555 12 35"}	Phone	2026-08-07 12:35:37.846561+00	77.92.118.122	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	0HNNKC3JH5S3V:0000000B
\.


--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Categories" ("Id", "Name") FROM stdin;
1	Elektronik
2	Gıda ve İçecek
3	Ofis Malzemeleri
4	Temizlik Ürünleri
5	Giyim
6	Mobilya
7	Kozmetik ve Kişisel Bakım
8	Ayakkabı
9	Çanta ve Aksesuar
10	Spor ve Outdoor
11	Bahçe ve Yapı Market
12	Oyuncak ve Hobi
13	Kitap ve Kırtasiye
14	Bebek Ürünleri
15	Elektrikli Ev Aletleri
16	Mutfak Gereçleri
17	Otomotiv Aksesuarları
18	Pet Shop Ürünleri
19	Bilgisayar ve Donanım
20	Telefon ve Aksesuar
21	Nevresim ve Ev Tekstili
22	Aydınlatma
\.


--
-- Data for Name: Brands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Brands" ("Id", "Name", "CategoryId") FROM stdin;
1	Apple	1
2	Samsung	1
3	Xiaomi	1
4	Logitech	1
5	Sony	1
6	Asus	1
7	Ülker	2
8	Eti	2
9	Coca-Cola	2
10	Nestlé	2
11	Pınar	2
12	Faber-Castell	3
13	Pilot	3
14	HP	3
15	Canon	3
16	Bic	3
17	Fairy	4
18	Domestos	4
19	Cif	4
20	Bingo	4
21	Ariel	4
22	LC Waikiki	5
23	Koton	5
24	Mavi	5
25	Defacto	5
26	Kiğılı	5
27	IKEA	6
28	Bellona	6
29	İstikbal	6
30	Doğtaş	6
31	L'Oréal	7
32	Nivea	7
33	Dove	7
34	Colgate	7
35	Gillette	7
36	Nike	8
37	Adidas	8
38	Puma	8
39	Skechers	8
40	New Balance	8
41	Kipling	9
42	American Tourister	9
43	Guess	9
44	Beymen	9
45	Samsonite	9
46	Decathlon	10
47	The North Face	10
48	Columbia	10
49	Salomon	10
50	Under Armour	10
51	Bosch	11
52	Makita	11
53	Karcher	11
54	Hilti	11
55	DeWalt	11
56	Lego	12
57	Hasbro	12
58	Mattel	12
59	Playmobil	12
60	Fisher-Price	12
61	Pelikan	13
62	Staedtler	13
63	Parker	13
64	Scribo	13
65	Morfoz	13
66	Pampers	14
67	Huggies	14
68	Prima	14
69	Chicco	14
70	Mamas & Papas	14
71	Arçelik	15
72	Vestel	15
73	Bosch	15
74	Philips	15
75	Fakir	15
76	Tefal	16
77	Karaca	16
78	Emsan	16
79	Bialetti	16
80	WMF	16
81	Bosch	17
82	Michelin	17
83	Castrol	17
84	Mobil	17
85	Total	17
86	Pedigree	18
87	Whiskas	18
88	Royal Canin	18
89	Purina	18
90	Felix	18
91	Intel	19
92	AMD	19
93	Nvidia	19
94	Corsair	19
95	MSI	19
96	Anker	20
97	Baseus	20
98	Spigen	20
99	Belkin	20
100	JBL	20
101	Yataş	21
102	Taç	21
103	Marie Claire	21
104	Zeugma	21
105	English Home	21
106	Philips	22
107	Osram	22
108	NVC Lighting	22
109	Ledvance	22
110	Faro	22
\.


--
-- Data for Name: Equipments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Equipments" ("Id", "EquipmentName", "Status", "CurrentHolderName", "EquipmentCode") FROM stdin;
3	Keyboard - Logitech MX	mehmet.kaya	\N	LEGACY-3
4	Mouse - Razer	elif.sahin	\N	LEGACY-4
5	Tablet - iPad Pro	can.ozturk	\N	LEGACY-5
7	Monitor - LG 27UL500	ayse.kaya	\N	LEGACY-7
8	Klavye - Logitech MX Keys	mehmet.demir	\N	LEGACY-8
9	Mouse - Logitech MX Master 3	fatma.sahin	\N	LEGACY-9
10	Kulaklik - Jabra Evolve2 65	emre.celik	\N	LEGACY-10
11	Test Cihaz	test.user	\N	LEGACY-11
12	Laptop - Dell XPS 15	ahmet.yilmaz	\N	LEGACY-12
2	Monitor - Guncellendi	ayse.demir	\N	LEGACY-2
1	Bilgisayar	Adnan Emir	\N	LEGACY-1
1001	Dell Latitude 5440 Dizüstü Bilgisayar	InUse	Ahmet Yılmaz	EQP-001
1002	Logitech MX Master 3 Kablosuz Mouse	InUse	Ayşe Demir	EQP-002
1003	iPhone 14 Pro (Şirket Telefonu)	Available	\N	EQP-003
1004	HP LaserJet Pro MFP Yazıcı	UnderMaintenance	\N	EQP-004
1005	Dell UltraSharp 27 Monitör	Retired	\N	EQP-005
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" ("UserId", "Name", "Email", "PasswordHash", "Role") FROM stdin;
1	Admin	emirkirim5101@gmail.com	$2a$11$d/kzZHXZhXvt3kFegWKgvu/axr8UuKwKif2HjJwHwviRFhVl6MlVy	Admin
9	Admin	admin@admin.com	$2a$11$smZ35uxD7Sv3Zi3c1wa/auEVAGJ/fmNQlXSQ9nCeJDbpWPoaqF5uG	Admin
\.


--
-- Data for Name: EquipmentTransactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EquipmentTransactions" ("Id", "EquipmentId", "EmployeeName", "Type", "Condition", "Date", "Notes", "CreatedByUserId") FROM stdin;
1001	1001	Ahmet Yılmaz	CheckOut	Working	2026-01-05 09:30:00+00	Yeni işe başlayan personel için teslim edildi.	\N
1002	1002	Ayşe Demir	CheckOut	Working	2026-02-10 14:00:00+00	\N	\N
1003	1003	Mehmet Kaya	CheckOut	Working	2026-01-15 10:00:00+00	Saha ziyaretleri için teslim edildi.	\N
1004	1003	Mehmet Kaya	CheckIn	Working	2026-03-01 11:15:00+00	Proje tamamlandı, cihaz iade edildi.	\N
1005	1004	Zeynep Şahin	CheckOut	Working	2026-01-20 09:00:00+00	Muhasebe departmanına kuruldu.	\N
1006	1004	Zeynep Şahin	CheckIn	NeedsRepair	2026-04-12 16:45:00+00	Kağıt sıkışması arızası var, teknik servise gönderildi.	\N
1007	1005	Emir Kırım	CheckOut	Working	2025-11-01 09:00:00+00	\N	\N
1008	1005	Emir Kırım	CheckIn	Damaged	2026-02-20 13:30:00+00	Ekranda çatlak oluştu, kullanılamaz durumda.	\N
\.


--
-- Data for Name: Models; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Models" ("Id", "Name", "BrandId") FROM stdin;
1	iPhone 16	1
2	iPhone 15	1
3	MacBook Air M3	1
4	iPad Air	1
5	AirPods Pro 2	1
6	Galaxy S24	2
7	Galaxy A55	2
8	Galaxy Tab S9	2
9	Galaxy Buds3	2
10	Redmi Note 13	3
11	Xiaomi 14	3
12	Redmi Pad SE	3
13	Mi Band 8	3
14	MX Master 3S	4
15	G Pro X Superlight	4
16	MX Keys	4
17	C920 HD Pro Webcam	4
18	WH-1000XM5	5
19	PlayStation 5	5
20	Bravia 55" 4K TV	5
21	Alpha a6400	5
22	ROG Strix G16	6
23	ZenBook 14	6
24	TUF Gaming Monitor 27"	6
25	RT-AX55 Router	6
26	Çikolatalı Gofret	7
27	Halley	7
28	Metro	7
29	Rondo	7
30	Browni	8
31	Cin Cin	8
32	Petit Beurre	8
33	Wanted	8
34	Coca-Cola Kutu 330ml	9
35	Fanta Şişe 1L	9
36	Sprite Kutu 330ml	9
37	Nescafe Classic	10
38	KitKat	10
39	Nesquik	10
40	Süt 1L	11
41	Ayran 300ml	11
42	Yoğurt 1kg	11
43	Kuru Boya 24'lü	12
44	Mekanik Kurşun Kalem	12
45	Keçeli Kalem Seti	12
46	V5 Roller Kalem	13
47	FriXion Silinebilir Kalem	13
48	G2 Tükenmez Kalem	13
49	LaserJet Pro M15w	14
50	DeskJet 2320	14
51	Toner 85A	14
52	PIXMA G3420	15
53	EOS 2000D	15
54	Toner 725	15
55	Cristal Tükenmez Kalem	16
56	Atlantis Tükenmez Kalem	16
57	Bulaşık Deterjanı 650ml	17
58	Bulaşık Makinesi Tableti	17
59	Çamaşır Suyu 750ml	18
60	WC Jel	18
61	Krem Temizleyici 750ml	19
62	Cam Temizleyici	19
63	Çamaşır Deterjanı Toz 6kg	20
64	Yumuşatıcı 1440ml	20
65	Sıvı Çamaşır Deterjanı 2.5L	21
66	Kapsül Deterjan	21
67	Erkek Slim Fit Kot Pantolon	22
68	Kadın Basic Tişört	22
69	Çocuk Sweatshirt	22
70	Kadın Blazer Ceket	23
71	Erkek Gömlek	23
72	Kadın Elbise	23
73	Erkek Jean Ceket	24
74	Kadın Skinny Jean	24
75	Erkek Tişört	24
76	Kadın Triko Kazak	25
77	Erkek Şort	25
78	Çocuk Mont	25
79	Erkek Takım Elbise	26
80	Erkek Kravat	26
81	Erkek Palto	26
82	MALM Yatak	27
83	BILLY Kitaplık	27
84	POÄNG Koltuk	27
85	Yemek Masası Takımı	28
86	Yatak Odası Takımı	28
87	Köşe Koltuk	29
88	Baza Yatak Seti	29
89	TV Ünitesi	30
90	Gardırop	30
91	Elseve Şampuan 400ml	31
92	Revitalift Krem	31
93	Nemlendirici Vücut Losyonu	32
94	Erkek Tıraş Köpüğü	32
95	Nemlendirici Sabun	33
96	Şampuan 400ml	33
97	Total Diş Macunu	34
98	Diş Fırçası	34
99	Fusion5 Tıraş Bıçağı	35
100	Mach3 Tıraş Makinesi	35
101	Air Max 90	36
102	Air Force 1	36
103	Revolution 6	36
104	Ultraboost 22	37
105	Stan Smith	37
106	Superstar	37
107	Suede Classic	38
108	RS-X	38
109	Cali	38
110	Go Walk 6	39
111	D'Lites	39
112	Max Cushioning	39
113	574	40
114	990v6	40
115	530	40
116	City Pack Mini	41
117	Seoul	41
118	Art Backpack	41
119	Bon Air	42
120	Summer Session	42
121	Instagon	42
122	Vikky Tote	43
123	Katey Crossbody	43
124	Naya	43
125	Deri Sırt Çantası	44
126	Klasik El Çantası	44
127	Business Evrak Çantası	44
128	B-Lite	45
129	Cosmolite	45
130	Spinner 55	45
131	Quechua MH100	46
132	Kalenji Run Support	46
133	Domyos Fit+	46
134	Borealis Backpack	47
135	Nuptse Jacket	47
136	Venture Jacket	47
137	Bugaboo Jacket	48
138	Newton Ridge Boot	48
139	PFG Shirt	48
140	Speedcross 5	49
141	XA Pro 3D	49
142	X Ultra 4	49
143	HOVR Phantom	50
144	Charged Assert	50
145	Tech Hoodie	50
146	GSB 13 RE Darbeli Matkap	51
147	PSR 1800 Şarjlı Matkap	51
148	GWS 750 Taşlama	51
149	HP1630 Matkap	52
150	DTD152 Darbeli Vidalama	52
151	DHS680 Daire Testere	52
152	K5 Basınçlı Yıkama	53
153	WV5 Cam Silme Robotu	53
154	K2 Compact	53
155	TE 6-A36 Kırıcı Delici	54
156	SF 6H Vidalama	54
157	PM 2-L Lazer	54
158	DCD776 Matkap	55
159	DCS391 Daire Testere	55
160	DW088 Lazer	55
161	City Police Station	56
162	Technic Bugatti	56
163	Star Wars Millennium Falcon	56
164	Monopoly Klasik	57
165	Play-Doh Set	57
166	Nerf Elite	57
167	Barbie Dreamhouse	58
168	Hot Wheels Track Set	58
169	UNO Kart Oyunu	58
170	City Life Hastane	59
171	Knights Kalesi	59
172	Family Fun Tatil Evi	59
173	Rock-a-Stack	60
174	Laugh & Learn	60
175	Little People Farm	60
176	Griffix Dolma Kalem	61
177	M200 Dolma Kalem	61
178	Twist Kurşun Kalem	61
179	Noris Kurşun Kalem	62
180	Triplus Fineliner	62
181	Mars Plastic Silgi	62
182	Jotter Tükenmez Kalem	63
183	IM Dolma Kalem	63
184	Vector Roller Kalem	63
185	Trend Tükenmez Kalem	64
186	Vintage Dolma Kalem	64
187	Fantasia Boya Kalem Seti	64
188	Spiralli Defter	65
189	A4 Kareli Defter	65
190	Sunum Dosyası	65
191	Premium Care Bebek Bezi	66
192	Baby-Dry Bebek Bezi	66
193	Islak Havlu	66
194	Ultra Comfort Bebek Bezi	67
195	Elite Soft Bebek Bezi	67
196	Islak Mendil	67
197	Aktif Bebek Bezi	68
198	Pants Külot Bez	68
199	Yenidoğan Bezi	68
200	Next2Me Beşik	69
201	KeyFit Oto Koltuğu	69
202	Biberon Seti	69
203	Flip XT2 Bebek Arabası	70
204	Airo Puset	70
205	Snug Ana Kucağı	70
206	9312 EI Çamaşır Makinesi	71
207	No-Frost Buzdolabı	71
208	Robofresh Süpürge	71
209	Vestel Buzdolabı NF520	72
210	Vestel Fırın 8607	72
211	Vestel Çamaşır Makinesi 9146	72
212	Serie 6 Bulaşık Makinesi	73
213	Serie 4 Çamaşır Makinesi	73
214	KGN Buzdolabı	73
215	Airfryer XXL	74
216	Senseo Kahve Makinesi	74
217	PowerLife Süpürge	74
218	Veyron Süpürge	75
219	Robofix Mutfak Robotu	75
220	Toz Torbasız Süpürge	75
221	Ingenio Tava Seti	76
222	Cook4Me Düdüklü	76
223	Easy Fry Airfryer	76
224	Chef Tencere Seti	77
225	Nero Kahve Makinesi	77
226	Kevo Blender	77
227	Trend Tencere Seti	78
228	Granit Tava	78
229	Çelik Sürahi	78
230	Moka Express	79
231	Espresso Makinesi	79
232	Çelik Süzgeç Seti	79
233	Profi Plus Tencere	80
234	Bistro Bıçak Seti	80
235	Kult Tost Makinesi	80
236	S4 Akü	81
237	Aerotwin Silecek	81
238	Oto Yağ Filtresi	81
239	Pilot Sport 4 Lastik	82
240	Primacy 4 Lastik	82
241	CrossClimate 2 Lastik	82
242	GTX 5W-30 Motor Yağı	83
243	Edge 5W-40 Motor Yağı	83
244	Magnatec 10W-40	83
245	Mobil 1 5W-30	84
246	Mobil Super 3000	84
247	Mobil Delvac Truck	84
248	Quartz 9000 Motor Yağı	85
249	Rubia Diesel Yağı	85
250	Total Antifriz	85
251	Vital Protection Mama	86
252	Dentastix	86
253	Puppy Yavru Maması	86
254	Junior Kedi Maması	87
255	Adult 1+ Mama	87
256	Temptations Ödül Maması	87
257	Maxi Adult Köpek Maması	88
258	Indoor Kedi Maması	88
259	Veteriner Diyet Maması	88
260	Pro Plan Köpek Maması	89
261	One Kedi Maması	89
262	Friskies Mama	89
263	As Good As It Looks	90
264	Party Mix Ödül	90
265	Sensations Mama	90
266	Core i7-14700K	91
267	Core i5-13600K	91
268	Core i9-14900K	91
269	Ryzen 7 7800X3D	92
270	Ryzen 5 7600X	92
271	Ryzen 9 7950X	92
272	RTX 4070 Ti	93
273	RTX 4060	93
274	RTX 4090	93
275	Vengeance RGB RAM	94
276	K70 Klavye	94
277	HX1000 Güç Kaynağı	94
278	MAG B650 Anakart	95
279	Optix Monitör	95
280	Katana Laptop	95
281	PowerCore 20000	96
282	Soundcore Q30	96
283	PowerLine Kablo	96
284	65W Şarj Cihazı	97
285	Manyetik Araç Tutucu	97
286	USB-C Kablo	97
287	Tough Armor Kılıf	98
288	Glas.tR Ekran Koruyucu	98
289	Rugged Armor Kılıf	98
290	BoostCharge Şarj Cihazı	99
291	Kablosuz Şarj Standı	99
292	USB-C Hub	99
293	Flip 6 Bluetooth Hoparlör	100
294	Tune 510BT Kulaklık	100
295	Charge 5	100
296	Bedding Yatak	101
297	Fillmatik Yastık	101
298	Yorgan Seti	101
299	Saten Nevresim Takımı	102
300	Pike Yatak Örtüsü	102
301	Alez	102
302	Jakarlı Nevresim	103
303	Şönil Battaniye	103
304	Havlu Seti	103
305	Baskılı Nevresim Takımı	104
306	Çift Kişilik Yatak Örtüsü	104
307	Yastık Kılıfı	104
308	Pamuklu Nevresim Takımı	105
309	Örtü Seti	105
310	Havlu Takımı	105
311	Hue Akıllı Ampul	106
312	LED Panel Aydınlatma	106
313	Ecohome Ampul	106
314	LED Value Ampul	107
315	Parathom LED	107
316	Night Breaker Oto Ampul	107
317	LED Spot Aydınlatma	108
318	Sıva Altı Panel	108
319	Sokak Aydınlatma	108
320	LED Şerit Aydınlatma	109
321	Smart+ Akıllı Ampul	109
322	Downlight	109
323	Sarkıt Avize	110
324	Duvar Apliği	110
325	Masa Lambası	110
\.


--
-- Data for Name: Suppliers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Suppliers" ("Id", "CompanyName", "ContactPerson", "Phone", "Email", "Address", "IsActive", "TaxNumber", "TaxOffice") FROM stdin;
2	Apple Teknoloji ve Satış Limited Şirketi	Ahmet Yılmaz	+90 212 317 21 00	tr_distribution@apple.com	Büyükdere Cad. Levent 199, Kat: 22-23, 34394 Şişli/İstanbul	t	0700272097	Büyük Mükellefler
3	Karadeniz Gıda Dağıtım A.Ş.	Mehmet Kaya	0 462 321 78 90	satis@karadenizgida.com.tr	Sahil Yolu No:12 Trabzon	t	23456789012	Trabzon V.D.
4	Marmara Ofis ve Kırtasiye A.Ş.	Emre Demir	0216 333 90 00	destek@marmaraofis.com	İkitelli OSB Mah. No:8 İstanbul	t	5647382910	Ümraniye V.D.
5	Akdeniz Temizlik Ürünleri San.	Fatma Demir	0 242 556 90 11	iletisim@akdeniztemizlik.com.tr	Organize San. Böl. No:8 Antalya	t	34567890123	Antalya V.D.
6	Ege Tekstil ve Konfeksiyon Ltd.	Ayşe Yılmaz	0 232 445 12 34	info@egetekstil.com.tr	Kemalpaşa Cad. No:45 Bornova/İzmir	t	12345678901	Bornova V.D.
7	Anadolu Mobilya ve Dekorasyon A.Ş.	Hakan Öztürk	0 312 456 78 90	satis@anadolumobilya.com.tr	İvedik OSB No:22 Yenimahalle/Ankara	t	45678901234	Yenimahalle V.D.
8	Nil Kozmetik Dağıtım Ltd. Şti.	Zeynep Arslan	0 216 789 01 23	info@nilkozmetik.com.tr	Kozyatağı Mah. No:5 Kadıköy/İstanbul	t	56789012345	Kadıköy V.D.
9	Bursa Tekstil ve Hazır Giyim San.	Serkan Aydın	0 224 234 56 78	iletisim@bursatekstil.com.tr	Nilüfer OSB No:31 Bursa	t	67890123456	Nilüfer V.D.
10	Marmara Elektronik Toptan Satış	Burak Şahin	0212 444 55 66	toptan@marmaraelektronik.com.tr	Halkalı Cad. No:100 Küçükçekmece/İstanbul	f	78901234567	Küçükçekmece V.D.
11	İstanbul Tekstil Dış Ticaret A.Ş.	Ahmet Yıldız	02123456701	info@istanbultekstil.com.tr	Merter Mah. Tekstil Cad. No:12 Güngören/İstanbul	t	1111111111	Güngören V.D.
12	Bursa Ayakkabıcılık San. Tic. Ltd. Şti.	Mehmet Kaya	02243456702	satis@bursaayakkabi.com.tr	Organize Sanayi Bölgesi 5. Cad. No:8 Bursa	t	1111111112	Osmangazi V.D.
13	Ege Çanta ve Aksesuar Ltd. Şti.	Ayşe Demir	02323456703	iletisim@egecanta.com.tr	Bornova Sanayi Sitesi B Blok İzmir	t	1111111113	Bornova V.D.
14	Anadolu Spor Malzemeleri A.Ş.	Fatih Şahin	03123456704	info@anadoluspor.com.tr	İvedik OSB 3. Cad. No:22 Ankara	t	1111111114	Yenimahalle V.D.
15	Karadeniz Yapı Market Dağıtım A.Ş.	Hüseyin Aydın	04623456705	satis@karadenizyapi.com.tr	Değirmendere Sanayi Sitesi Trabzon	t	1111111115	Ortahisar V.D.
16	Trend Oyuncak İthalat A.Ş.	Zeynep Arslan	02123456706	info@trendoyuncak.com.tr	İkitelli OSB 4. Ada No:15 İstanbul	t	1111111116	İkitelli V.D.
17	Kırtasiye Dünyası Ltd. Şti.	Emre Çelik	03123456707	satis@kirtasiyedunyasi.com.tr	Siteler Mah. Kağıtçılar Sok. No:9 Ankara	t	1111111117	Altındağ V.D.
18	Bebek Center Dağıtım A.Ş.	Elif Koç	02163456708	info@bebekcenter.com.tr	Ümraniye Sanayi Sitesi No:34 İstanbul	t	1111111118	Ümraniye V.D.
19	Beyaz Eşya Toptan Dağıtım A.Ş.	Murat Öztürk	02123456709	satis@beyazesyatoptan.com.tr	Hadımköy Sanayi Bölgesi İstanbul	t	1111111119	Arnavutköy V.D.
20	Mutfak Gereçleri San. Tic. Ltd. Şti.	Selin Yalçın	02323456710	info@mutfakgerecleri.com.tr	Kemalpaşa OSB İzmir	t	1111111120	Kemalpaşa V.D.
21	Otomotiv Yedek Parça Dağıtım A.Ş.	Burak Kurt	02243456711	satis@otoyedekparca.com.tr	Demirtaş OSB Bursa	t	1111111121	Yıldırım V.D.
22	Pet Center Toptan Satış Ltd. Şti.	Gizem Aksoy	02123456712	info@petcentertoptan.com.tr	Esenyurt Sanayi Sitesi İstanbul	t	1111111122	Esenyurt V.D.
23	Teknoloji Dağıtım Merkezi A.Ş.	Onur Polat	02123456713	satis@teknolojidagitim.com.tr	Maslak Teknoloji Vadisi İstanbul	t	1111111123	Sarıyer V.D.
24	Cep Telefonu Aksesuar A.Ş.	Deniz Er	02163456714	info@ceptelefonuaksesuar.com.tr	Kadıköy Teknoloji Pasajı İstanbul	t	1111111124	Kadıköy V.D.
25	Ev Tekstili Toptan A.Ş.	Sema Güneş	03423456715	satis@evtekstilitoptan.com.tr	Denizli Tekstil OSB Denizli	t	1111111125	Merkezefendi V.D.
26	Aydınlatma Sistemleri Ltd. Şti.	Kerem Yıldırım	02123456716	info@aydinlatmasistemleri.com.tr	Topkapı Sanayi Sitesi İstanbul	t	1111111126	Zeytinburnu V.D.
27	Doğu Anadolu Gıda Dağıtım A.Ş.	Serkan Bulut	04423456717	satis@doguanadolugida.com.tr	Organize Sanayi Bölgesi Erzurum	t	1111111127	Yakutiye V.D.
28	Güney Tekstil ve Konfeksiyon A.Ş.	Pınar Doğan	03223456718	info@guneytekstil.com.tr	Sanayi Mah. Gaziantep	t	1111111128	Şehitkamil V.D.
29	Akdeniz Kozmetik Dağıtım Ltd. Şti.	Cem Aslan	02423456719	satis@akdenizkozmetik.com.tr	Antalya OSB Antalya	t	1111111129	Kepez V.D.
30	İç Anadolu Ofis Malzemeleri A.Ş.	Nurcan Şen	03123456720	info@icanadoluofis.com.tr	Ostim OSB Ankara	t	1111111130	Yenimahalle V.D.
31	Marmara Elektronik Toptan A.Ş.	Yusuf Kaplan	02123456721	satis@marmaraelektronik.com.tr	Beylikdüzü Sanayi Sitesi İstanbul	t	1111111131	Beylikdüzü V.D.
32	Batı Anadolu Temizlik Ürünleri Ltd. Şti.	Aylin Korkmaz	02223456722	info@batianadolutemizlik.com.tr	Balıkesir OSB Balıkesir	t	1111111132	Karesi V.D.
33	Trakya Mobilya Dağıtım A.Ş.	Tolga Erdem	02823456723	satis@trakyamobilya.com.tr	Çorlu Sanayi Sitesi Tekirdağ	t	1111111133	Çorlu V.D.
34	Sakarya Bilgisayar Donanım Ltd. Şti.	İrem Yaman	02643456724	info@sakaryabilgisayar.com.tr	Serdivan Sanayi Sitesi Sakarya	t	1111111134	Serdivan V.D.
35	Konya Un ve Gıda San. A.Ş.	Hakan Çınar	03323456725	satis@konyaungida.com.tr	Konya OSB Konya	t	1111111135	Selçuklu V.D.
36	Adana Tarım Ürünleri A.Ş.	Merve Tunç	03223456726	info@adanatarim.com.tr	Adana OSB Adana	t	1111111136	Seyhan V.D.
37	Samsun Deniz Ürünleri Ltd. Şti.	Barış Uzun	03623456727	satis@samsundeniz.com.tr	Tekkeköy Sanayi Sitesi Samsun	t	1111111137	Tekkeköy V.D.
38	Eskişehir Plastik Ürünler A.Ş.	Ceren Kaya	02223456728	info@eskisehirplastik.com.tr	Eskişehir OSB Eskişehir	t	1111111138	Odunpazarı V.D.
39	Kayseri Mobilya İmalat A.Ş.	Volkan Şahin	03523456729	satis@kayserimobilya.com.tr	Kayseri OSB Kayseri	t	1111111139	Melikgazi V.D.
40	Antalya Turizm Ürünleri Ltd. Şti.	Buse Aydemir	02423456730	info@antalyaturizm.com.tr	Antalya Sanayi Sitesi Antalya	t	1111111140	Muratpaşa V.D.
41	Mersin Kimya San. A.Ş.	Oğuzhan Bilgin	03243456731	satis@mersinkimya.com.tr	Mersin OSB Mersin	t	1111111141	Yenişehir V.D.
42	Van Gıda Toptan Dağıtım A.Ş.	Sibel Aktaş	04323456732	info@vangida.com.tr	Van Sanayi Sitesi Van	t	1111111142	İpekyolu V.D.
43	Diyarbakır Tekstil San. Ltd. Şti.	Ercan Yılmaz	04123456733	satis@diyarbakirtekstil.com.tr	Diyarbakır OSB Diyarbakır	t	1111111143	Yenişehir V.D.
44	Malatya Kayısı ve Gıda A.Ş.	Derya Öz	04223456734	info@malatyakayisi.com.tr	Malatya OSB Malatya	t	1111111144	Battalgazi V.D.
45	Şanlıurfa Tarım Ürünleri Ltd. Şti.	Fatma Ekinci	04143456735	satis@sanliurfatarim.com.tr	Şanlıurfa OSB Şanlıurfa	t	1111111145	Haliliye V.D.
46	Trabzon Fındık ve Gıda A.Ş.	Alper Kutlu	04623456736	info@trabzonfindik.com.tr	Trabzon OSB Trabzon	t	1111111146	Yomra V.D.
47	Muğla Yapı Malzemeleri Ltd. Şti.	Gül Aydın	02523456737	satis@muglayapi.com.tr	Muğla Sanayi Sitesi Muğla	t	1111111147	Menteşe V.D.
48	Zonguldak Maden Ürünleri A.Ş.	Kaan Öztürk	03723456738	info@zonguldakmaden.com.tr	Zonguldak OSB Zonguldak	t	1111111148	Merkez V.D.
49	Sivas Demir Çelik Ürünleri A.Ş.	Ebru Gündüz	03463456739	satis@sivasdemir.com.tr	Sivas OSB Sivas	t	1111111149	Merkez V.D.
50	Elazığ Elektronik Toptan Ltd. Şti.	Taner Coşkun	04243456740	info@elazigelektronik.com.tr	Elazığ OSB Elazığ	t	1111111150	Merkez V.D.
51	Manisa Elektrikli Ev Aletleri A.Ş.	Songül Kara	02363456741	satis@manisaelektrikli.com.tr	Manisa OSB Manisa	t	1111111151	Yunusemre V.D.
52	Kocaeli Otomotiv Yan Sanayi A.Ş.	Erhan Vural	02623456742	info@kocaeliotomotiv.com.tr	Gebze OSB Kocaeli	t	1111111152	Gebze V.D.
53	Tekirdağ Un Sanayi ve Ticaret A.Ş.	Nazlı Sezer	02823456743	satis@tekirdagun.com.tr	Çerkezköy OSB Tekirdağ	t	1111111153	Çerkezköy V.D.
54	Isparta Gül Ürünleri Ltd. Şti.	Aslı Karaca	02463456744	info@ispartagul.com.tr	Isparta Sanayi Sitesi Isparta	t	1111111154	Merkez V.D.
55	Aydın İncir ve Gıda A.Ş.	Ozan Türkmen	02563456745	satis@aydinincir.com.tr	Aydın OSB Aydın	t	1111111155	Efeler V.D.
1	Anadolu Elektronik San. Tic. A.Ş.	Mehmet Yılmaz	0212 555 12 35	info@anadoluelektronik.com.tr	Barbaros Mah. Sanayi Cad. No:14 Kadıköy/İstanbul	t	1234567890	Kadıköy V.D.
\.


--
-- Data for Name: WarehouseLocations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."WarehouseLocations" ("Id", "Corridor", "Shelf", "Section") FROM stdin;
1	A	1	3
2	A	2	1
3	A	3	1
4	B	1	3
5	B	2	2
6	B	3	1
7	C	1	1
8	C	2	1
9	C	3	3
10	D	1	1
11	D	2	3
12	D	3	3
13	E	1	3
14	E	2	1
15	E	3	3
16	F	1	2
17	F	2	1
18	F	3	1
19	A	1	1
20	A	1	2
21	A	2	2
22	A	2	3
23	A	3	2
24	A	3	3
25	A	4	1
26	A	4	2
27	A	4	3
28	A	5	1
29	A	5	2
30	A	5	3
31	B	1	1
32	B	1	2
33	B	2	1
34	B	2	3
35	B	3	2
36	B	3	3
37	B	4	1
38	B	4	2
39	B	4	3
40	B	5	1
41	B	5	2
42	B	5	3
43	C	1	2
44	C	1	3
45	C	2	2
46	C	2	3
47	C	3	1
48	C	3	2
49	C	4	1
50	C	4	2
51	C	4	3
52	C	5	1
53	C	5	2
54	C	5	3
55	D	1	2
56	D	1	3
57	D	2	1
58	D	2	2
59	D	3	1
60	D	3	2
61	D	4	1
62	D	4	2
63	D	4	3
64	D	5	1
65	D	5	2
66	D	5	3
67	E	1	1
68	E	1	2
69	E	2	2
70	E	2	3
71	E	3	1
72	E	3	2
73	E	4	1
74	E	4	2
75	E	4	3
76	E	5	1
77	E	5	2
78	E	5	3
79	F	1	1
80	F	1	3
\.


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Products" ("Id", "ProductName", "PurchasePrice", "SalePrice", "Barcode", "StockQuantity", "CategoryId", "IsActive", "SupplierId", "LocationId", "BrandId", "ModelId", "SkuCode") FROM stdin;
3	Apple MacBook Air M3 13" 256GB	74999	79999	8690000010035	150	1	t	1	15	1	3	SKU-ELE-0003
4	Apple iPad Air 64GB Wi-Fi	32999	35999	8690000010042	134	1	t	1	13	1	4	SKU-ELE-0004
5	Apple AirPods Pro 2 USB-C	9999	11499	8690000010059	51	1	t	10	6	1	5	SKU-ELE-0005
6	Samsung Galaxy S24 256 GB	48999	52999	8690000010066	43	1	t	1	2	2	6	SKU-ELE-0006
7	Samsung Galaxy A55 128 GB	21999	24499	8690000010073	123	1	t	10	16	2	7	SKU-ELE-0007
8	Samsung Galaxy Tab S9 128GB Wi-Fi	27999	30999	8690000010080	290	1	t	2	14	2	8	SKU-ELE-0008
9	Samsung Galaxy Buds3 Beyaz	6499	7499	8690000010097	71	1	t	1	6	2	9	SKU-ELE-0009
10	Xiaomi Redmi Note 13 128 GB	9999	11999	8690000010103	285	1	t	2	18	3	10	SKU-ELE-0010
13	Xiaomi Mi Band 8 Siyah	1299	1599	8690000010134	287	1	t	1	5	3	13	SKU-ELE-0013
14	Logitech MX Master 3S Grafit	2799	3299	8690000010141	206	1	t	2	17	4	14	SKU-ELE-0014
15	Logitech G Pro X Superlight Beyaz	3999	4599	8690000010158	127	1	t	1	3	4	15	SKU-ELE-0015
16	Logitech MX Keys Türkçe Q	2999	3499	8690000010165	157	1	t	10	16	4	16	SKU-ELE-0016
17	Logitech C920 HD Pro Webcam 1080p	2299	2699	8690000010172	65	1	t	1	13	4	17	SKU-ELE-0017
18	Sony WH-1000XM5 Siyah	12999	14499	8690000010189	108	1	t	2	15	5	18	SKU-ELE-0018
19	Sony PlayStation 5 Slim 1TB	26999	29999	8690000010196	261	1	t	1	13	5	19	SKU-ELE-0019
20	Sony Bravia 55" 4K TV Google TV	32999	36999	8690000010202	247	1	t	2	14	5	20	SKU-ELE-0020
21	Sony Alpha a6400 18-135mm Kit	44999	48999	8690000010219	259	1	t	10	17	5	21	SKU-ELE-0021
22	Asus ROG Strix G16 RTX 4060	54999	59999	8690000010226	221	1	t	1	8	6	22	SKU-ELE-0022
23	Asus ZenBook 14 i7/16GB/512GB	38999	42999	8690000010233	176	1	t	2	7	6	23	SKU-ELE-0023
24	Asus TUF Gaming Monitor 27" 180Hz	8999	9999	8690000010240	19	1	t	2	4	6	24	SKU-ELE-0024
25	Asus RT-AX55 Router Wi-Fi 6	2499	2899	8690000010257	285	1	t	1	18	6	25	SKU-ELE-0025
26	Ülker Çikolatalı Gofret 36'lı Kutu	145	179	8690000010264	298	2	t	3	9	7	26	SKU-GID-0026
27	Ülker Halley 24'lü Kutu	165	199	8690000010271	265	2	t	3	2	7	27	SKU-GID-0027
28	Ülker Metro 24'lü Kutu	155	189	8690000010288	149	2	t	3	15	7	28	SKU-GID-0028
29	Ülker Rondo Karton 12'li	95	119	8690000010295	91	2	t	3	12	7	29	SKU-GID-0029
30	Eti Browni 24'lü Kutu	175	209	8690000010301	198	2	t	3	8	8	30	SKU-GID-0030
31	Eti Cin Cin 1kg Paket	210	249	8690000010318	106	2	t	3	14	8	31	SKU-GID-0031
32	Eti Petit Beurre 12'li Paket	85	105	8690000010325	194	2	t	3	8	8	32	SKU-GID-0032
34	Coca-Cola Coca-Cola Kutu 330ml 24'lü Koli	285	349	8690000010349	145	2	f	3	14	9	34	SKU-GID-0034
35	Coca-Cola Fanta Şişe 1L 6'lı Koli	195	239	8690000010356	168	2	t	3	14	9	35	SKU-GID-0035
36	Coca-Cola Sprite Kutu 330ml 24'lü Koli	280	339	8690000010363	161	2	t	3	14	9	36	SKU-GID-0036
37	Nestlé Nescafe Classic 200gr Kavanoz	245	289	8690000010370	101	2	t	3	10	10	37	SKU-GID-0037
38	Nestlé KitKat 24'lü Kutu	190	229	8690000010387	140	2	t	3	3	10	38	SKU-GID-0038
39	Nestlé Nesquik 400gr Kutu	175	209	8690000010394	90	2	t	3	4	10	39	SKU-GID-0039
40	Pınar Süt 1L 12'li Koli	240	279	8690000010400	177	2	t	3	17	11	40	SKU-GID-0040
41	Pınar Ayran 300ml 24'lü Koli	190	229	8690000010417	156	2	t	3	8	11	41	SKU-GID-0041
42	Pınar Yoğurt 1kg 6'lı Koli	210	249	8690000010424	56	2	t	3	5	11	42	SKU-GID-0042
43	Faber-Castell Kuru Boya 24'lü Karton Kutu	95	129	8690000010431	25	3	f	4	16	12	43	SKU-OFI-0043
44	Faber-Castell Mekanik Kurşun Kalem 0.5mm	45	69	8690000010448	127	3	t	4	14	12	44	SKU-OFI-0044
45	Faber-Castell Keçeli Kalem Seti 20 Renk	110	149	8690000010455	234	3	t	4	15	12	45	SKU-OFI-0045
46	Pilot V5 Roller Kalem Siyah	35	49	8690000010462	255	3	t	4	18	13	46	SKU-OFI-0046
47	Pilot FriXion Silinebilir Kalem Mavi	55	79	8690000010479	126	3	t	4	9	13	47	SKU-OFI-0047
48	Pilot G2 Tükenmez Kalem 12'li Kutu	165	199	8690000010486	218	3	t	4	3	13	48	SKU-OFI-0048
49	HP LaserJet Pro M15w Wi-Fi Lazer Yazıcı	4499	4999	8690000010493	76	3	t	4	12	14	49	SKU-OFI-0049
50	HP DeskJet 2320 Renkli Mürekkep Yazıcı	2199	2499	8690000010509	265	3	t	4	14	14	50	SKU-OFI-0050
51	HP Toner 85A Siyah	899	1099	8690000010516	152	3	t	4	8	14	51	SKU-OFI-0051
52	Canon PIXMA G3420 Tanklı Yazıcı	5499	5999	8690000010523	108	3	t	4	7	15	52	SKU-OFI-0052
53	Canon EOS 2000D 18-55mm Kit	15999	17999	8690000010530	265	3	t	4	16	15	53	SKU-OFI-0053
54	Canon Toner 725 Siyah	799	949	8690000010547	171	3	t	4	16	15	54	SKU-OFI-0054
55	Bic Cristal Tükenmez Kalem 50'li Kutu	145	179	8690000010554	109	3	t	4	7	16	55	SKU-OFI-0055
56	Bic Atlantis Tükenmez Kalem 12'li Kutu	89	109	8690000010561	42	3	t	4	5	16	56	SKU-OFI-0056
111	Samsung Galaxy S24	242.00	302.50	8690000020006	42	1	t	6	6	2	6	SKU-NEW-0006
112	Samsung Galaxy A55 - Standart	279.00	362.70	8690000020007	49	1	t	7	7	2	7	SKU-NEW-0007
33	Eti Wanted 24'lü Kutu	160	195	8690000010332	290	2	t	3	1	8	33	SKU-GID-0033
12	Xiaomi Redmi Pad SE 128GB	8999	10499	8690000010127	72	1	t	2	\N	3	12	SKU-ELE-0012
57	Fairy Bulaşık Deterjanı 650ml Limon	89	109	8690000010578	189	4	t	5	2	17	57	SKU-TEM-0057
58	Fairy Bulaşık Makinesi Tableti 60'lı	249	289	8690000010585	92	4	t	5	10	17	58	SKU-TEM-0058
59	Domestos Çamaşır Suyu 750ml Orijinal	65	79	8690000010592	234	4	t	5	2	18	59	SKU-TEM-0059
60	Domestos WC Jel 750ml	79	95	8690000010608	95	4	t	5	6	18	60	SKU-TEM-0060
61	Cif Krem Temizleyici 750ml Beyaz	69	85	8690000010615	247	4	t	5	8	19	61	SKU-TEM-0061
62	Cif Cam Temizleyici 750ml	59	75	8690000010622	172	4	t	5	15	19	62	SKU-TEM-0062
63	Bingo Çamaşır Deterjanı Toz 6kg Dağ Esintisi	349	399	8690000010639	61	4	t	5	1	20	63	SKU-TEM-0063
64	Bingo Yumuşatıcı 1440ml Lavanta	145	175	8690000010646	255	4	t	5	14	20	64	SKU-TEM-0064
65	Ariel Sıvı Çamaşır Deterjanı 2.5L Alp Ferahlığı	385	439	8690000010653	220	4	t	5	15	21	65	SKU-TEM-0065
66	Ariel Kapsül Deterjan 38'li	299	349	8690000010660	292	4	t	5	14	21	66	SKU-TEM-0066
67	LC Waikiki Erkek Slim Fit Kot Pantolon Lacivert	349	449	8690000010677	77	5	t	6	8	22	67	SKU-GIY-0067
68	LC Waikiki Kadın Basic Tişört Beyaz	99	149	8690000010684	251	5	t	6	5	22	68	SKU-GIY-0068
69	LC Waikiki Çocuk Sweatshirt Gri	199	269	8690000010691	84	5	t	6	9	22	69	SKU-GIY-0069
70	Koton Kadın Blazer Ceket Siyah	599	799	8690000010707	185	5	t	9	15	23	70	SKU-GIY-0070
71	Koton Erkek Gömlek Mavi Çizgili	449	599	8690000010714	268	5	t	6	5	23	71	SKU-GIY-0071
72	Koton Kadın Elbise Kırmızı	549	729	8690000010721	22	5	t	6	14	23	72	SKU-GIY-0072
73	Mavi Erkek Jean Ceket Açık Mavi	699	899	8690000010738	288	5	t	9	11	24	73	SKU-GIY-0073
74	Mavi Kadın Skinny Jean Koyu Lacivert	549	699	8690000010745	131	5	t	6	14	24	74	SKU-GIY-0074
75	Mavi Erkek Tişört Beyaz	249	329	8690000010752	235	5	t	6	8	24	75	SKU-GIY-0075
76	Defacto Kadın Triko Kazak Bej	299	399	8690000010769	138	5	t	9	5	25	76	SKU-GIY-0076
77	Defacto Erkek Şort Haki	199	259	8690000010776	241	5	t	9	10	25	77	SKU-GIY-0077
78	Defacto Çocuk Mont Siyah	449	599	8690000010783	198	5	f	9	10	25	78	SKU-GIY-0078
79	Kiğılı Erkek Takım Elbise Antrasit	2999	3699	8690000010790	269	5	t	9	8	26	79	SKU-GIY-0079
80	Kiğılı Erkek Kravat Bordo Desenli	249	329	8690000010806	201	5	t	6	3	26	80	SKU-GIY-0080
81	IKEA MALM Yatak 160x200	4999	5999	8690000010813	286	6	t	7	6	27	82	SKU-MOB-0081
82	IKEA BILLY Kitaplık Beyaz	1899	2399	8690000010820	202	6	f	7	13	27	83	SKU-MOB-0082
83	IKEA POÄNG Koltuk Kahverengi	2499	2999	8690000010837	70	6	f	7	16	27	84	SKU-MOB-0083
84	Bellona Yemek Masası Takımı 6 Kişilik	12999	15999	8690000010844	267	6	t	7	4	28	85	SKU-MOB-0084
85	Bellona Yatak Odası Takımı 180x200	24999	29999	8690000010851	227	6	t	7	16	28	86	SKU-MOB-0085
86	İstikbal Köşe Koltuk Gri Kumaş	18999	22999	8690000010868	156	6	t	7	4	29	87	SKU-MOB-0086
87	İstikbal Baza Yatak Seti 160x200	8999	10999	8690000010875	121	6	t	7	8	29	88	SKU-MOB-0087
88	Doğtaş TV Ünitesi 180cm	5999	7499	8690000010882	143	6	t	7	4	30	89	SKU-MOB-0088
89	Doğtaş Gardırop 3 Kapılı	9999	11999	8690000010899	104	6	t	7	2	30	90	SKU-MOB-0089
90	L'Oréal Elseve Şampuan 400ml Onarıcı Bakım	145	179	8690000010905	277	7	t	8	15	31	91	SKU-KOZ-0090
91	L'Oréal Revitalift Krem 50ml	349	429	8690000010912	266	7	t	8	3	31	92	SKU-KOZ-0091
92	Nivea Nemlendirici Vücut Losyonu 400ml	129	159	8690000010929	295	7	t	8	13	32	93	SKU-KOZ-0092
93	Nivea Erkek Tıraş Köpüğü 200ml	89	109	8690000010936	297	7	t	8	14	32	94	SKU-KOZ-0093
94	Dove Nemlendirici Sabun 4'lü Paket	99	129	8690000010943	206	7	t	8	16	33	95	SKU-KOZ-0094
95	Dove Şampuan 400ml Onarıcı Bakım	135	165	8690000010950	183	7	t	8	14	33	96	SKU-KOZ-0095
96	Colgate Total Diş Macunu 100ml	65	85	8690000010967	194	7	t	8	4	34	97	SKU-KOZ-0096
97	Colgate Diş Fırçası Orta Sert	45	65	8690000010974	151	7	t	8	6	34	98	SKU-KOZ-0097
98	Gillette Fusion5 Tıraş Bıçağı 4'lü Yedek	289	349	8690000010981	61	7	t	8	13	35	99	SKU-KOZ-0098
99	Gillette Mach3 Tıraş Makinesi Başlangıç Seti	199	249	8690000010998	95	7	t	8	3	35	100	SKU-KOZ-0099
1	Apple iPhone 16 128 GB	62450	64999	8690000010011	62	1	t	1	8	1	1	SKU-ELE-0001
100	Apple iPhone 16 - Siyah	2122.00	2652.50	8690000020326	282	1	t	51	6	1	1	SKU-NEW-0326
101	Apple iPhone 16 - Standart	57.00	71.25	8690000020001	7	1	t	1	1	1	1	SKU-NEW-0001
102	Apple iPhone 15 - Beyaz	2159.00	2806.70	8690000020327	289	1	t	52	7	1	2	SKU-NEW-0327
103	Apple iPhone 15 - Siyah	94.00	122.20	8690000020002	14	1	t	2	2	1	2	SKU-NEW-0002
104	Apple MacBook Air M3 - Pro	2196.00	2964.60	8690000020328	296	1	t	53	8	1	3	SKU-NEW-0328
105	Apple MacBook Air M3 - Beyaz	131.00	176.85	8690000020003	21	1	t	3	3	1	3	SKU-NEW-0003
106	Apple iPad Air - XL	2233.00	3126.20	8690000020329	303	1	t	54	9	1	4	SKU-NEW-0329
107	Apple iPad Air - Pro	168.00	235.20	8690000020004	28	1	t	4	4	1	4	SKU-NEW-0004
108	Apple AirPods Pro 2 - XL	205.00	246.00	8690000020005	35	1	t	5	5	1	5	SKU-NEW-0005
109	Apple AirPods Pro 2	2270.00	2724.00	8690000020330	310	1	t	55	10	1	5	SKU-NEW-0330
110	Samsung Galaxy S24 - Standart	2307.00	2883.75	8690000020331	317	1	t	1	11	2	6	SKU-NEW-0331
113	Samsung Galaxy A55 - Siyah	2344.00	3047.20	8690000020332	324	1	t	2	12	2	7	SKU-NEW-0332
114	Samsung Galaxy Tab S9 - Beyaz	2381.00	3214.35	8690000020333	331	1	t	3	13	2	8	SKU-NEW-0333
115	Samsung Galaxy Tab S9 - Siyah	316.00	426.60	8690000020008	56	1	t	8	8	2	8	SKU-NEW-0008
116	Samsung Galaxy Buds3 - Pro	2418.00	3385.20	8690000020334	338	1	t	4	14	2	9	SKU-NEW-0334
117	Samsung Galaxy Buds3 - Beyaz	353.00	494.20	8690000020009	63	1	t	9	9	2	9	SKU-NEW-0009
118	Xiaomi Redmi Note 13 - XL	2455.00	2946.00	8690000020335	345	1	t	5	15	3	10	SKU-NEW-0335
119	Xiaomi Redmi Note 13 - Pro	390.00	468.00	8690000020010	70	1	t	10	10	3	10	SKU-NEW-0010
120	Xiaomi Xiaomi 14 - XL	427.00	533.75	8690000020011	77	1	t	11	11	3	11	SKU-NEW-0011
121	Xiaomi Xiaomi 14	2492.00	3115.00	8690000020336	352	1	t	6	16	3	11	SKU-NEW-0336
122	Xiaomi Redmi Pad SE - Standart	2529.00	3287.70	8690000020337	359	1	t	7	17	3	12	SKU-NEW-0337
123	Xiaomi Redmi Pad SE	464.00	603.20	8690000020012	84	1	t	12	12	3	12	SKU-NEW-0012
124	Xiaomi Mi Band 8 - Siyah	2566.00	3464.10	8690000020338	366	1	t	8	18	3	13	SKU-NEW-0338
125	Xiaomi Mi Band 8 - Standart	501.00	676.35	8690000020013	91	1	t	13	13	3	13	SKU-NEW-0013
126	Logitech MX Master 3S - Beyaz	2603.00	3644.20	8690000020339	373	1	t	9	19	4	14	SKU-NEW-0339
127	Logitech MX Master 3S - Siyah	538.00	753.20	8690000020014	98	1	t	14	14	4	14	SKU-NEW-0014
128	Logitech G Pro X Superlight - Beyaz	575.00	690.00	8690000020015	105	1	t	15	15	4	15	SKU-NEW-0015
129	Logitech G Pro X Superlight - Pro	2640.00	3168.00	8690000020340	380	1	t	10	\N	4	15	SKU-NEW-0340
130	Logitech MX Keys - Pro	612.00	765.00	8690000020016	112	1	t	16	16	4	16	SKU-NEW-0016
131	Logitech MX Keys - XL	2677.00	3346.25	8690000020341	387	1	t	11	21	4	16	SKU-NEW-0341
132	Logitech C920 HD Pro Webcam	2714.00	3528.20	8690000020342	394	1	t	12	22	4	17	SKU-NEW-0342
133	Logitech C920 HD Pro Webcam - XL	649.00	843.70	8690000020017	119	1	t	17	17	4	17	SKU-NEW-0017
134	Sony WH-1000XM5	686.00	926.10	8690000020018	126	1	t	18	18	5	18	SKU-NEW-0018
135	Sony WH-1000XM5 - Standart	2751.00	3713.85	8690000020343	401	1	t	13	23	5	18	SKU-NEW-0343
136	Sony PlayStation 5 - Siyah	2788.00	3903.20	8690000020344	408	1	t	14	24	5	19	SKU-NEW-0344
137	Sony PlayStation 5 - Standart	723.00	1012.20	8690000020019	133	1	t	19	19	5	19	SKU-NEW-0019
138	Sony Bravia 55" 4K TV - Siyah	760.00	912.00	8690000020020	140	1	t	20	\N	5	20	SKU-NEW-0020
139	Sony Bravia 55" 4K TV - Beyaz	2825.00	3390.00	8690000020345	415	1	t	15	25	5	20	SKU-NEW-0345
140	Sony Alpha a6400 - Pro	2862.00	3577.50	8690000020346	422	1	t	16	26	5	21	SKU-NEW-0346
141	Sony Alpha a6400 - Beyaz	797.00	996.25	8690000020021	147	1	t	21	21	5	21	SKU-NEW-0021
142	Asus ROG Strix G16 - XL	2899.00	3768.70	8690000020347	429	1	t	17	27	6	22	SKU-NEW-0347
143	Asus ROG Strix G16 - Pro	834.00	1084.20	8690000020022	154	1	t	22	22	6	22	SKU-NEW-0022
144	Asus ZenBook 14	2936.00	3963.60	8690000020348	436	1	t	18	28	6	23	SKU-NEW-0348
145	Asus ZenBook 14 - XL	871.00	1175.85	8690000020023	161	1	t	23	23	6	23	SKU-NEW-0023
146	Asus TUF Gaming Monitor 27" - Standart	2973.00	4162.20	8690000020349	443	1	t	19	29	6	24	SKU-NEW-0349
147	Asus TUF Gaming Monitor 27"	908.00	1271.20	8690000020024	168	1	t	24	24	6	24	SKU-NEW-0024
148	Asus RT-AX55 Router - Standart	945.00	1134.00	8690000020025	175	1	t	25	25	6	25	SKU-NEW-0025
149	Asus RT-AX55 Router - Siyah	3010.00	3612.00	8690000020350	450	1	t	20	30	6	25	SKU-NEW-0350
150	Ülker Çikolatalı Gofret - Siyah	982.00	1227.50	8690000020026	182	2	t	26	26	7	26	SKU-NEW-0026
151	Ülker Çikolatalı Gofret - Beyaz	3047.00	3808.75	8690000020351	457	2	t	21	31	7	26	SKU-NEW-0351
152	Ülker Halley - Beyaz	1019.00	1324.70	8690000020027	189	2	t	27	27	7	27	SKU-NEW-0027
153	Ülker Halley - Pro	3084.00	4009.20	8690000020352	464	2	t	22	32	7	27	SKU-NEW-0352
154	Ülker Metro - Pro	1056.00	1425.60	8690000020028	196	2	t	28	28	7	28	SKU-NEW-0028
155	Ülker Metro - XL	3121.00	4213.35	8690000020353	471	2	t	23	33	7	28	SKU-NEW-0353
156	Ülker Rondo	3158.00	4421.20	8690000020354	478	2	t	24	34	7	29	SKU-NEW-0354
157	Ülker Rondo - XL	1093.00	1530.20	8690000020029	203	2	t	29	29	7	29	SKU-NEW-0029
158	Eti Browni	1130.00	1356.00	8690000020030	210	2	t	30	30	8	30	SKU-NEW-0030
159	Eti Browni - Standart	3195.00	3834.00	8690000020355	485	2	t	25	35	8	30	SKU-NEW-0355
160	Eti Cin Cin - Siyah	3232.00	4040.00	8690000020356	492	2	t	26	36	8	31	SKU-NEW-0356
161	Eti Cin Cin - Standart	1167.00	1458.75	8690000020031	217	2	t	31	31	8	31	SKU-NEW-0031
162	Eti Petit Beurre - Beyaz	3269.00	4249.70	8690000020357	499	2	t	27	37	8	32	SKU-NEW-0357
163	Eti Petit Beurre - Siyah	1204.00	1565.20	8690000020032	224	2	t	32	32	8	32	SKU-NEW-0032
164	Eti Wanted - Beyaz	1241.00	1675.35	8690000020033	231	2	t	33	33	8	33	SKU-NEW-0033
165	Eti Wanted - Pro	3306.00	4463.10	8690000020358	6	2	t	28	38	8	33	SKU-NEW-0358
166	Coca-Cola Coca-Cola Kutu 330ml - Pro	1278.00	1789.20	8690000020034	238	2	t	34	34	9	34	SKU-NEW-0034
167	Coca-Cola Coca-Cola Kutu 330ml - XL	3343.00	4680.20	8690000020359	13	2	t	29	39	9	34	SKU-NEW-0359
168	Coca-Cola Fanta Şişe 1L - XL	1315.00	1578.00	8690000020035	245	2	t	35	35	9	35	SKU-NEW-0035
169	Coca-Cola Fanta Şişe 1L	3380.00	4056.00	8690000020360	20	2	t	30	\N	9	35	SKU-NEW-0360
170	Coca-Cola Sprite Kutu 330ml	1352.00	1690.00	8690000020036	252	2	t	36	36	9	36	SKU-NEW-0036
171	Coca-Cola Sprite Kutu 330ml - Standart	3417.00	4271.25	8690000020361	27	2	t	31	41	9	36	SKU-NEW-0361
172	Nestlé Nescafe Classic - Siyah	3454.00	4490.20	8690000020362	34	2	t	32	42	10	37	SKU-NEW-0362
173	Nestlé Nescafe Classic - Standart	1389.00	1805.70	8690000020037	259	2	t	37	37	10	37	SKU-NEW-0037
174	Nestlé KitKat - Beyaz	3491.00	4712.85	8690000020363	41	2	t	33	43	10	38	SKU-NEW-0363
175	Nestlé KitKat - Siyah	1426.00	1925.10	8690000020038	266	2	t	38	38	10	38	SKU-NEW-0038
176	Nestlé Nesquik - Beyaz	1463.00	2048.20	8690000020039	273	2	t	39	39	10	39	SKU-NEW-0039
177	Nestlé Nesquik - Pro	3528.00	4939.20	8690000020364	48	2	t	34	44	10	39	SKU-NEW-0364
178	Pınar Süt 1L - Pro	1500.00	1800.00	8690000020040	280	2	t	40	\N	11	40	SKU-NEW-0040
179	Pınar Süt 1L - XL	3565.00	4278.00	8690000020365	55	2	t	35	45	11	40	SKU-NEW-0365
180	Pınar Ayran 300ml - XL	1537.00	1921.25	8690000020041	287	2	t	41	41	11	41	SKU-NEW-0041
181	Pınar Ayran 300ml	3602.00	4502.50	8690000020366	62	2	t	36	46	11	41	SKU-NEW-0366
182	Pınar Yoğurt 1kg - Standart	3639.00	4730.70	8690000020367	69	2	t	37	47	11	42	SKU-NEW-0367
183	Pınar Yoğurt 1kg	1574.00	2046.20	8690000020042	294	2	t	42	42	11	42	SKU-NEW-0042
184	Faber-Castell Kuru Boya 24'lü - Standart	1611.00	2174.85	8690000020043	301	3	t	43	43	12	43	SKU-NEW-0043
185	Faber-Castell Kuru Boya 24'lü - Siyah	3676.00	4962.60	8690000020368	76	3	t	38	48	12	43	SKU-NEW-0368
186	Faber-Castell Mekanik Kurşun Kalem - Siyah	1648.00	2307.20	8690000020044	308	3	t	44	44	12	44	SKU-NEW-0044
187	Faber-Castell Mekanik Kurşun Kalem - Beyaz	3713.00	5198.20	8690000020369	83	3	t	39	49	12	44	SKU-NEW-0369
188	Faber-Castell Keçeli Kalem Seti - Pro	3750.00	4500.00	8690000020370	90	3	t	40	50	12	45	SKU-NEW-0370
189	Faber-Castell Keçeli Kalem Seti - Beyaz	1685.00	2022.00	8690000020045	315	3	t	45	45	12	45	SKU-NEW-0045
190	Pilot V5 Roller Kalem - XL	3787.00	4733.75	8690000020371	97	3	t	41	51	13	46	SKU-NEW-0371
191	Pilot V5 Roller Kalem - Pro	1722.00	2152.50	8690000020046	322	3	t	46	46	13	46	SKU-NEW-0046
192	Pilot FriXion Silinebilir Kalem - XL	1759.00	2286.70	8690000020047	329	3	t	47	47	13	47	SKU-NEW-0047
193	Pilot FriXion Silinebilir Kalem	3824.00	4971.20	8690000020372	104	3	t	42	52	13	47	SKU-NEW-0372
194	Pilot G2 Tükenmez Kalem	1796.00	2424.60	8690000020048	336	3	t	48	48	13	48	SKU-NEW-0048
195	Pilot G2 Tükenmez Kalem - Standart	3861.00	5212.35	8690000020373	111	3	t	43	53	13	48	SKU-NEW-0373
196	HP LaserJet Pro M15w - Siyah	3898.00	5457.20	8690000020374	118	3	t	44	54	14	49	SKU-NEW-0374
197	HP LaserJet Pro M15w - Standart	1833.00	2566.20	8690000020049	343	3	t	49	49	14	49	SKU-NEW-0049
198	HP DeskJet 2320 - Beyaz	3935.00	4722.00	8690000020375	125	3	t	45	55	14	50	SKU-NEW-0375
199	HP DeskJet 2320 - Siyah	1870.00	2244.00	8690000020050	350	3	t	50	50	14	50	SKU-NEW-0050
200	HP Toner 85A - Beyaz	1907.00	2383.75	8690000020051	357	3	t	51	51	14	51	SKU-NEW-0051
201	HP Toner 85A - Pro	3972.00	4965.00	8690000020376	132	3	t	46	56	14	51	SKU-NEW-0376
202	Canon PIXMA G3420 - XL	4009.00	5211.70	8690000020377	139	3	t	47	57	15	52	SKU-NEW-0377
203	Canon PIXMA G3420 - Pro	1944.00	2527.20	8690000020052	364	3	t	52	52	15	52	SKU-NEW-0052
204	Canon EOS 2000D - XL	1981.00	2674.35	8690000020053	371	3	t	53	53	15	53	SKU-NEW-0053
205	Canon EOS 2000D	4046.00	5462.10	8690000020378	146	3	t	48	58	15	53	SKU-NEW-0378
206	Canon Toner 725 - Standart	4083.00	5716.20	8690000020379	153	3	t	49	59	15	54	SKU-NEW-0379
207	Canon Toner 725	2018.00	2825.20	8690000020054	378	3	t	54	54	15	54	SKU-NEW-0054
208	Bic Cristal Tükenmez Kalem - Standart	2055.00	2466.00	8690000020055	385	3	t	55	55	16	55	SKU-NEW-0055
209	Bic Cristal Tükenmez Kalem - Siyah	4120.00	4944.00	8690000020380	160	3	t	50	\N	16	55	SKU-NEW-0380
210	Bic Atlantis Tükenmez Kalem - Siyah	2092.00	2615.00	8690000020056	392	3	t	1	56	16	56	SKU-NEW-0056
211	Bic Atlantis Tükenmez Kalem - Beyaz	4157.00	5196.25	8690000020381	167	3	t	51	61	16	56	SKU-NEW-0381
212	Fairy Bulaşık Deterjanı 650ml - Pro	4194.00	5452.20	8690000020382	174	4	t	52	62	17	57	SKU-NEW-0382
213	Fairy Bulaşık Deterjanı 650ml - Beyaz	2129.00	2767.70	8690000020057	399	4	t	2	57	17	57	SKU-NEW-0057
214	Fairy Bulaşık Makinesi Tableti - Pro	2166.00	2924.10	8690000020058	406	4	t	3	58	17	58	SKU-NEW-0058
215	Fairy Bulaşık Makinesi Tableti - XL	4231.00	5711.85	8690000020383	181	4	t	53	63	17	58	SKU-NEW-0383
216	Domestos Çamaşır Suyu 750ml	4268.00	5975.20	8690000020384	188	4	t	54	64	18	59	SKU-NEW-0384
217	Domestos Çamaşır Suyu 750ml - XL	2203.00	3084.20	8690000020059	413	4	t	4	59	18	59	SKU-NEW-0059
218	Domestos WC Jel - Standart	4305.00	5166.00	8690000020385	195	4	t	55	65	18	60	SKU-NEW-0385
219	Domestos WC Jel	2240.00	2688.00	8690000020060	420	4	t	5	\N	18	60	SKU-NEW-0060
220	Cif Krem Temizleyici 750ml - Standart	2277.00	2846.25	8690000020061	427	4	t	6	61	19	61	SKU-NEW-0061
221	Cif Krem Temizleyici 750ml - Siyah	4342.00	5427.50	8690000020386	202	4	t	1	66	19	61	SKU-NEW-0386
222	Cif Cam Temizleyici - Beyaz	4379.00	5692.70	8690000020387	209	4	t	2	67	19	62	SKU-NEW-0387
223	Cif Cam Temizleyici - Siyah	2314.00	3008.20	8690000020062	434	4	t	7	62	19	62	SKU-NEW-0062
224	Bingo Çamaşır Deterjanı Toz 6kg - Beyaz	2351.00	3173.85	8690000020063	441	4	t	8	63	20	63	SKU-NEW-0063
225	Bingo Çamaşır Deterjanı Toz 6kg - Pro	4416.00	5961.60	8690000020388	216	4	t	3	68	20	63	SKU-NEW-0388
226	Bingo Yumuşatıcı 1440ml - Pro	2388.00	3343.20	8690000020064	448	4	t	9	64	20	64	SKU-NEW-0064
227	Bingo Yumuşatıcı 1440ml - XL	4453.00	6234.20	8690000020389	223	4	t	4	69	20	64	SKU-NEW-0389
228	Ariel Sıvı Çamaşır Deterjanı 2.5L	4490.00	5388.00	8690000020390	230	4	t	5	70	21	65	SKU-NEW-0390
229	Ariel Sıvı Çamaşır Deterjanı 2.5L - XL	2425.00	2910.00	8690000020065	455	4	t	10	65	21	65	SKU-NEW-0065
230	Ariel Kapsül Deterjan	2462.00	3077.50	8690000020066	462	4	t	11	66	21	66	SKU-NEW-0066
231	Ariel Kapsül Deterjan - Standart	4527.00	5658.75	8690000020391	237	4	t	6	71	21	66	SKU-NEW-0391
232	LC Waikiki Erkek Slim Fit Kot Pantolon - Standart	2499.00	3248.70	8690000020067	469	5	t	12	67	22	67	SKU-NEW-0067
233	LC Waikiki Erkek Slim Fit Kot Pantolon - Siyah	4564.00	5933.20	8690000020392	244	5	t	7	72	22	67	SKU-NEW-0392
234	LC Waikiki Kadın Basic Tişört - Beyaz	4601.00	6211.35	8690000020393	251	5	t	8	73	22	68	SKU-NEW-0393
235	LC Waikiki Kadın Basic Tişört - Siyah	2536.00	3423.60	8690000020068	476	5	t	13	68	22	68	SKU-NEW-0068
236	LC Waikiki Çocuk Sweatshirt - Pro	4638.00	6493.20	8690000020394	258	5	t	9	74	22	69	SKU-NEW-0394
237	LC Waikiki Çocuk Sweatshirt - Beyaz	2573.00	3602.20	8690000020069	483	5	t	14	69	22	69	SKU-NEW-0069
238	Koton Kadın Blazer Ceket - XL	4675.00	5610.00	8690000020395	265	5	t	10	75	23	70	SKU-NEW-0395
239	Koton Kadın Blazer Ceket - Pro	2610.00	3132.00	8690000020070	490	5	t	15	70	23	70	SKU-NEW-0070
240	Koton Erkek Gömlek	4712.00	5890.00	8690000020396	272	5	t	11	76	23	71	SKU-NEW-0396
241	Koton Erkek Gömlek - XL	2647.00	3308.75	8690000020071	497	5	t	16	71	23	71	SKU-NEW-0071
242	Koton Kadın Elbise	2684.00	3489.20	8690000020072	4	5	t	17	72	23	72	SKU-NEW-0072
243	Koton Kadın Elbise - Standart	4749.00	6173.70	8690000020397	279	5	t	12	77	23	72	SKU-NEW-0397
244	Mavi Erkek Jean Ceket - Standart	2721.00	3673.35	8690000020073	11	5	t	18	73	24	73	SKU-NEW-0073
245	Mavi Erkek Jean Ceket - Siyah	4786.00	6461.10	8690000020398	286	5	t	13	78	24	73	SKU-NEW-0398
246	Mavi Kadın Skinny Jean - Siyah	2758.00	3861.20	8690000020074	18	5	t	19	74	24	74	SKU-NEW-0074
247	Mavi Kadın Skinny Jean - Beyaz	4823.00	6752.20	8690000020399	293	5	t	14	79	24	74	SKU-NEW-0399
248	Mavi Erkek Tişört - Pro	4860.00	5832.00	8690000020400	300	5	t	15	\N	24	75	SKU-NEW-0400
249	Mavi Erkek Tişört - Beyaz	2795.00	3354.00	8690000020075	25	5	t	20	75	24	75	SKU-NEW-0075
250	Defacto Kadın Triko Kazak - XL	4897.00	6121.25	8690000020401	307	5	t	16	1	25	76	SKU-NEW-0401
251	Defacto Kadın Triko Kazak - Pro	2832.00	3540.00	8690000020076	32	5	t	21	76	25	76	SKU-NEW-0076
252	Defacto Erkek Şort - XL	2869.00	3729.70	8690000020077	39	5	t	22	77	25	77	SKU-NEW-0077
253	Defacto Erkek Şort	4934.00	6414.20	8690000020402	314	5	t	17	2	25	77	SKU-NEW-0402
254	Defacto Çocuk Mont - Standart	4971.00	6710.85	8690000020403	321	5	t	18	3	25	78	SKU-NEW-0403
255	Defacto Çocuk Mont	2906.00	3923.10	8690000020078	46	5	t	23	78	25	78	SKU-NEW-0078
256	Kiğılı Erkek Takım Elbise - Siyah	28.00	39.20	8690000020404	328	5	t	19	4	26	79	SKU-NEW-0404
257	Kiğılı Erkek Takım Elbise - Standart	2943.00	4120.20	8690000020079	53	5	t	24	79	26	79	SKU-NEW-0079
258	Kiğılı Erkek Kravat - Siyah	2980.00	3576.00	8690000020080	60	5	t	25	\N	26	80	SKU-NEW-0080
259	Kiğılı Erkek Kravat - Beyaz	65.00	78.00	8690000020405	335	5	t	20	5	26	80	SKU-NEW-0405
260	Kiğılı Erkek Palto - Pro	102.00	127.50	8690000020406	342	5	t	21	6	26	81	SKU-NEW-0406
261	Kiğılı Erkek Palto - Beyaz	3017.00	3771.25	8690000020081	67	5	t	26	1	26	81	SKU-NEW-0081
262	IKEA MALM Yatak - XL	139.00	180.70	8690000020407	349	6	t	22	7	27	82	SKU-NEW-0407
263	IKEA MALM Yatak - Pro	3054.00	3970.20	8690000020082	74	6	t	27	2	27	82	SKU-NEW-0082
264	IKEA BILLY Kitaplık	176.00	237.60	8690000020408	356	6	t	23	8	27	83	SKU-NEW-0408
265	IKEA BILLY Kitaplık - XL	3091.00	4172.85	8690000020083	81	6	t	28	3	27	83	SKU-NEW-0083
266	IKEA POÄNG Koltuk - Standart	213.00	298.20	8690000020409	363	6	t	24	9	27	84	SKU-NEW-0409
267	IKEA POÄNG Koltuk	3128.00	4379.20	8690000020084	88	6	t	29	4	27	84	SKU-NEW-0084
268	Bellona Yemek Masası Takımı - Standart	3165.00	3798.00	8690000020085	95	6	t	30	5	28	85	SKU-NEW-0085
269	Bellona Yemek Masası Takımı - Siyah	250.00	300.00	8690000020410	370	6	t	25	10	28	85	SKU-NEW-0410
270	Bellona Yatak Odası Takımı - Siyah	3202.00	4002.50	8690000020086	102	6	t	31	6	28	86	SKU-NEW-0086
271	Bellona Yatak Odası Takımı - Beyaz	287.00	358.75	8690000020411	377	6	t	26	11	28	86	SKU-NEW-0411
272	İstikbal Köşe Koltuk - Beyaz	3239.00	4210.70	8690000020087	109	6	t	32	7	29	87	SKU-NEW-0087
273	İstikbal Köşe Koltuk - Pro	324.00	421.20	8690000020412	384	6	t	27	12	29	87	SKU-NEW-0412
274	İstikbal Baza Yatak Seti - XL	361.00	487.35	8690000020413	391	6	t	28	13	29	88	SKU-NEW-0413
275	İstikbal Baza Yatak Seti - Pro	3276.00	4422.60	8690000020088	116	6	t	33	8	29	88	SKU-NEW-0088
276	Doğtaş TV Ünitesi - XL	3313.00	4638.20	8690000020089	123	6	t	34	9	30	89	SKU-NEW-0089
277	Doğtaş TV Ünitesi	398.00	557.20	8690000020414	398	6	t	29	14	30	89	SKU-NEW-0414
278	Doğtaş Gardırop - Standart	435.00	522.00	8690000020415	405	6	t	30	15	30	90	SKU-NEW-0415
279	Doğtaş Gardırop	3350.00	4020.00	8690000020090	130	6	t	35	10	30	90	SKU-NEW-0090
280	L'Oréal Elseve Şampuan 400ml - Siyah	472.00	590.00	8690000020416	412	7	t	31	16	31	91	SKU-NEW-0416
281	L'Oréal Elseve Şampuan 400ml - Standart	3387.00	4233.75	8690000020091	137	7	t	36	11	31	91	SKU-NEW-0091
282	L'Oréal Revitalift Krem - Siyah	3424.00	4451.20	8690000020092	144	7	t	37	12	31	92	SKU-NEW-0092
283	L'Oréal Revitalift Krem - Beyaz	509.00	661.70	8690000020417	419	7	t	32	17	31	92	SKU-NEW-0417
284	Nivea Nemlendirici Vücut Losyonu - Pro	546.00	737.10	8690000020418	426	7	t	33	18	32	93	SKU-NEW-0418
285	Nivea Nemlendirici Vücut Losyonu - Beyaz	3461.00	4672.35	8690000020093	151	7	t	38	13	32	93	SKU-NEW-0093
286	Nivea Erkek Tıraş Köpüğü - XL	583.00	816.20	8690000020419	433	7	t	34	19	32	94	SKU-NEW-0419
287	Nivea Erkek Tıraş Köpüğü - Pro	3498.00	4897.20	8690000020094	158	7	t	39	14	32	94	SKU-NEW-0094
288	Dove Nemlendirici Sabun - XL	3535.00	4242.00	8690000020095	165	7	t	40	15	33	95	SKU-NEW-0095
289	Dove Nemlendirici Sabun	620.00	744.00	8690000020420	440	7	t	35	\N	33	95	SKU-NEW-0420
290	Dove Şampuan 400ml	3572.00	4465.00	8690000020096	172	7	t	41	16	33	96	SKU-NEW-0096
291	Dove Şampuan 400ml - Standart	657.00	821.25	8690000020421	447	7	t	36	21	33	96	SKU-NEW-0421
292	Colgate Total Diş Macunu - Siyah	694.00	902.20	8690000020422	454	7	t	37	22	34	97	SKU-NEW-0422
293	Colgate Total Diş Macunu - Standart	3609.00	4691.70	8690000020097	179	7	t	42	17	34	97	SKU-NEW-0097
294	Colgate Diş Fırçası - Siyah	3646.00	4922.10	8690000020098	186	7	t	43	18	34	98	SKU-NEW-0098
295	Colgate Diş Fırçası - Beyaz	731.00	986.85	8690000020423	461	7	t	38	23	34	98	SKU-NEW-0423
296	Gillette Fusion5 Tıraş Bıçağı - Pro	768.00	1075.20	8690000020424	468	7	t	39	24	35	99	SKU-NEW-0424
297	Gillette Fusion5 Tıraş Bıçağı - Beyaz	3683.00	5156.20	8690000020099	193	7	t	44	19	35	99	SKU-NEW-0099
298	Gillette Mach3 Tıraş Makinesi - Pro	3720.00	4464.00	8690000020100	200	7	t	45	\N	35	100	SKU-NEW-0100
299	Gillette Mach3 Tıraş Makinesi - XL	805.00	966.00	8690000020425	475	7	t	40	25	35	100	SKU-NEW-0425
300	Nike Air Max 90 - XL	3757.00	4696.25	8690000020101	207	8	t	46	21	36	101	SKU-NEW-0101
301	Nike Air Max 90	842.00	1052.50	8690000020426	482	8	t	41	26	36	101	SKU-NEW-0426
302	Nike Air Force 1 - Standart	879.00	1142.70	8690000020427	489	8	t	42	27	36	102	SKU-NEW-0427
303	Nike Air Force 1	3794.00	4932.20	8690000020102	214	8	t	47	22	36	102	SKU-NEW-0102
304	Nike Revolution 6 - Siyah	916.00	1236.60	8690000020428	496	8	t	43	28	36	103	SKU-NEW-0428
305	Nike Revolution 6 - Standart	3831.00	5171.85	8690000020103	221	8	t	48	23	36	103	SKU-NEW-0103
306	Adidas Ultraboost 22 - Siyah	3868.00	5415.20	8690000020104	228	8	t	49	24	37	104	SKU-NEW-0104
307	Adidas Ultraboost 22 - Beyaz	953.00	1334.20	8690000020429	3	8	t	44	29	37	104	SKU-NEW-0429
308	Adidas Stan Smith - Beyaz	3905.00	4686.00	8690000020105	235	8	t	50	25	37	105	SKU-NEW-0105
309	Adidas Stan Smith - Pro	990.00	1188.00	8690000020430	10	8	t	45	30	37	105	SKU-NEW-0430
310	Adidas Superstar - XL	1027.00	1283.75	8690000020431	17	8	t	46	31	37	106	SKU-NEW-0431
311	Adidas Superstar - Pro	3942.00	4927.50	8690000020106	242	8	t	51	26	37	106	SKU-NEW-0106
312	Puma Suede Classic - XL	3979.00	5172.70	8690000020107	249	8	t	52	27	38	107	SKU-NEW-0107
313	Puma Suede Classic	1064.00	1383.20	8690000020432	24	8	t	47	32	38	107	SKU-NEW-0432
314	Puma RS-X	4016.00	5421.60	8690000020108	256	8	t	53	28	38	108	SKU-NEW-0108
315	Puma RS-X - Standart	1101.00	1486.35	8690000020433	31	8	t	48	33	38	108	SKU-NEW-0433
316	Puma Cali - Standart	4053.00	5674.20	8690000020109	263	8	t	54	29	38	109	SKU-NEW-0109
317	Puma Cali - Siyah	1138.00	1593.20	8690000020434	38	8	t	49	34	38	109	SKU-NEW-0434
318	Skechers Go Walk 6 - Siyah	4090.00	4908.00	8690000020110	270	8	t	55	30	39	110	SKU-NEW-0110
319	Skechers Go Walk 6 - Beyaz	1175.00	1410.00	8690000020435	45	8	t	50	35	39	110	SKU-NEW-0435
320	Skechers D'Lites - Pro	1212.00	1515.00	8690000020436	52	8	t	51	36	39	111	SKU-NEW-0436
321	Skechers D'Lites - Beyaz	4127.00	5158.75	8690000020111	277	8	t	1	31	39	111	SKU-NEW-0111
322	Skechers Max Cushioning - XL	1249.00	1623.70	8690000020437	59	8	t	52	37	39	112	SKU-NEW-0437
323	Skechers Max Cushioning - Pro	4164.00	5413.20	8690000020112	284	8	t	2	32	39	112	SKU-NEW-0112
324	New Balance 574	1286.00	1736.10	8690000020438	66	8	t	53	38	40	113	SKU-NEW-0438
325	New Balance 574 - XL	4201.00	5671.35	8690000020113	291	8	t	3	33	40	113	SKU-NEW-0113
326	New Balance 990v6 - Standart	1323.00	1852.20	8690000020439	73	8	t	54	39	40	114	SKU-NEW-0439
327	New Balance 990v6	4238.00	5933.20	8690000020114	298	8	t	4	34	40	114	SKU-NEW-0114
328	New Balance 530 - Standart	4275.00	5130.00	8690000020115	305	8	t	5	35	40	115	SKU-NEW-0115
329	New Balance 530 - Siyah	1360.00	1632.00	8690000020440	80	8	t	55	\N	40	115	SKU-NEW-0440
330	Kipling City Pack Mini - Siyah	4312.00	5390.00	8690000020116	312	9	t	6	36	41	116	SKU-NEW-0116
331	Kipling City Pack Mini - Beyaz	1397.00	1746.25	8690000020441	87	9	t	1	41	41	116	SKU-NEW-0441
332	Kipling Seoul - Pro	1434.00	1864.20	8690000020442	94	9	t	2	42	41	117	SKU-NEW-0442
333	Kipling Seoul - Beyaz	4349.00	5653.70	8690000020117	319	9	t	7	37	41	117	SKU-NEW-0117
334	Kipling Art Backpack - XL	1471.00	1985.85	8690000020443	101	9	t	3	43	41	118	SKU-NEW-0443
335	Kipling Art Backpack - Pro	4386.00	5921.10	8690000020118	326	9	t	8	38	41	118	SKU-NEW-0118
336	American Tourister Bon Air - XL	4423.00	6192.20	8690000020119	333	9	t	9	39	42	119	SKU-NEW-0119
337	American Tourister Bon Air	1508.00	2111.20	8690000020444	108	9	t	4	44	42	119	SKU-NEW-0444
338	American Tourister Summer Session - Standart	1545.00	1854.00	8690000020445	115	9	t	5	45	42	120	SKU-NEW-0445
339	American Tourister Summer Session	4460.00	5352.00	8690000020120	340	9	t	10	\N	42	120	SKU-NEW-0120
340	American Tourister Instagon - Standart	4497.00	5621.25	8690000020121	347	9	t	11	41	42	121	SKU-NEW-0121
341	American Tourister Instagon - Siyah	1582.00	1977.50	8690000020446	122	9	t	6	46	42	121	SKU-NEW-0446
342	Guess Vikky Tote - Siyah	4534.00	5894.20	8690000020122	354	9	t	12	42	43	122	SKU-NEW-0122
343	Guess Vikky Tote - Beyaz	1619.00	2104.70	8690000020447	129	9	t	7	47	43	122	SKU-NEW-0447
344	Guess Katey Crossbody - Beyaz	4571.00	6170.85	8690000020123	361	9	t	13	43	43	123	SKU-NEW-0123
345	Guess Katey Crossbody - Pro	1656.00	2235.60	8690000020448	136	9	t	8	48	43	123	SKU-NEW-0448
346	Guess Naya - Pro	4608.00	6451.20	8690000020124	368	9	t	14	44	43	124	SKU-NEW-0124
347	Guess Naya - XL	1693.00	2370.20	8690000020449	143	9	t	9	49	43	124	SKU-NEW-0449
348	Beymen Deri Sırt Çantası	1730.00	2076.00	8690000020450	150	9	t	10	50	44	125	SKU-NEW-0450
349	Beymen Deri Sırt Çantası - XL	4645.00	5574.00	8690000020125	375	9	t	15	45	44	125	SKU-NEW-0125
350	Beymen Klasik El Çantası	4682.00	5852.50	8690000020126	382	9	t	16	46	44	126	SKU-NEW-0126
351	Beymen Klasik El Çantası - Standart	1767.00	2208.75	8690000020451	157	9	t	11	51	44	126	SKU-NEW-0451
352	Beymen Business Evrak Çantası - Standart	4719.00	6134.70	8690000020127	389	9	t	17	47	44	127	SKU-NEW-0127
353	Beymen Business Evrak Çantası - Siyah	1804.00	2345.20	8690000020452	164	9	t	12	52	44	127	SKU-NEW-0452
354	Samsonite B-Lite - Siyah	4756.00	6420.60	8690000020128	396	9	t	18	48	45	128	SKU-NEW-0128
355	Samsonite B-Lite - Beyaz	1841.00	2485.35	8690000020453	171	9	t	13	53	45	128	SKU-NEW-0453
356	Samsonite Cosmolite - Pro	1878.00	2629.20	8690000020454	178	9	t	14	54	45	129	SKU-NEW-0454
357	Samsonite Cosmolite - Beyaz	4793.00	6710.20	8690000020129	403	9	t	19	49	45	129	SKU-NEW-0129
358	Samsonite Spinner 55 - Pro	4830.00	5796.00	8690000020130	410	9	t	20	50	45	130	SKU-NEW-0130
359	Samsonite Spinner 55 - XL	1915.00	2298.00	8690000020455	185	9	t	15	55	45	130	SKU-NEW-0455
360	Decathlon Quechua MH100	1952.00	2440.00	8690000020456	192	10	t	16	56	46	131	SKU-NEW-0456
361	Decathlon Quechua MH100 - XL	4867.00	6083.75	8690000020131	417	10	t	21	51	46	131	SKU-NEW-0131
362	Decathlon Kalenji Run Support - Standart	1989.00	2585.70	8690000020457	199	10	t	17	57	46	132	SKU-NEW-0457
363	Decathlon Kalenji Run Support	4904.00	6375.20	8690000020132	424	10	t	22	52	46	132	SKU-NEW-0132
364	Decathlon Domyos Fit+ - Standart	4941.00	6670.35	8690000020133	431	10	t	23	53	46	133	SKU-NEW-0133
365	Decathlon Domyos Fit+ - Siyah	2026.00	2735.10	8690000020458	206	10	t	18	58	46	133	SKU-NEW-0458
366	The North Face Borealis Backpack - Beyaz	2063.00	2888.20	8690000020459	213	10	t	19	59	47	134	SKU-NEW-0459
367	The North Face Borealis Backpack - Siyah	4978.00	6969.20	8690000020134	438	10	t	24	54	47	134	SKU-NEW-0134
368	The North Face Nuptse Jacket - Pro	2100.00	2520.00	8690000020460	220	10	t	20	\N	47	135	SKU-NEW-0460
369	The North Face Nuptse Jacket - Beyaz	35.00	42.00	8690000020135	445	10	t	25	55	47	135	SKU-NEW-0135
370	The North Face Venture Jacket - Pro	72.00	90.00	8690000020136	452	10	t	26	56	47	136	SKU-NEW-0136
371	The North Face Venture Jacket - XL	2137.00	2671.25	8690000020461	227	10	t	21	61	47	136	SKU-NEW-0461
372	Columbia Bugaboo Jacket	2174.00	2826.20	8690000020462	234	10	t	22	62	48	137	SKU-NEW-0462
373	Columbia Bugaboo Jacket - XL	109.00	141.70	8690000020137	459	10	t	27	57	48	137	SKU-NEW-0137
374	Columbia Newton Ridge Boot	146.00	197.10	8690000020138	466	10	t	28	58	48	138	SKU-NEW-0138
375	Columbia Newton Ridge Boot - Standart	2211.00	2984.85	8690000020463	241	10	t	23	63	48	138	SKU-NEW-0463
376	Columbia PFG Shirt - Siyah	2248.00	3147.20	8690000020464	248	10	t	24	64	48	139	SKU-NEW-0464
377	Columbia PFG Shirt - Standart	183.00	256.20	8690000020139	473	10	t	29	59	48	139	SKU-NEW-0139
378	Salomon Speedcross 5 - Siyah	220.00	264.00	8690000020140	480	10	t	30	\N	49	140	SKU-NEW-0140
379	Salomon Speedcross 5 - Beyaz	2285.00	2742.00	8690000020465	255	10	t	25	65	49	140	SKU-NEW-0465
380	Salomon XA Pro 3D - Pro	2322.00	2902.50	8690000020466	262	10	t	26	66	49	141	SKU-NEW-0466
381	Salomon XA Pro 3D - Beyaz	257.00	321.25	8690000020141	487	10	t	31	61	49	141	SKU-NEW-0141
382	Salomon X Ultra 4 - XL	2359.00	3066.70	8690000020467	269	10	t	27	67	49	142	SKU-NEW-0467
383	Salomon X Ultra 4 - Pro	294.00	382.20	8690000020142	494	10	t	32	62	49	142	SKU-NEW-0142
384	Under Armour HOVR Phantom	2396.00	3234.60	8690000020468	276	10	t	28	68	50	143	SKU-NEW-0468
385	Under Armour HOVR Phantom - XL	331.00	446.85	8690000020143	1	10	t	33	63	50	143	SKU-NEW-0143
386	Under Armour Charged Assert - Standart	2433.00	3406.20	8690000020469	283	10	t	29	69	50	144	SKU-NEW-0469
387	Under Armour Charged Assert	368.00	515.20	8690000020144	8	10	t	34	64	50	144	SKU-NEW-0144
388	Under Armour Tech Hoodie - Standart	405.00	486.00	8690000020145	15	10	t	35	65	50	145	SKU-NEW-0145
389	Under Armour Tech Hoodie - Siyah	2470.00	2964.00	8690000020470	290	10	t	30	70	50	145	SKU-NEW-0470
390	Bosch GSB 13 RE Darbeli Matkap - Beyaz	2507.00	3133.75	8690000020471	297	11	t	31	71	51	146	SKU-NEW-0471
391	Bosch GSB 13 RE Darbeli Matkap - Siyah	442.00	552.50	8690000020146	22	11	t	36	66	51	146	SKU-NEW-0146
392	Bosch PSR 1800 Şarjlı Matkap - Pro	2544.00	3307.20	8690000020472	304	11	t	32	72	51	147	SKU-NEW-0472
393	Bosch PSR 1800 Şarjlı Matkap - Beyaz	479.00	622.70	8690000020147	29	11	t	37	67	51	147	SKU-NEW-0147
394	Bosch GWS 750 Taşlama - Pro	516.00	696.60	8690000020148	36	11	t	38	68	51	148	SKU-NEW-0148
395	Bosch GWS 750 Taşlama - XL	2581.00	3484.35	8690000020473	311	11	t	33	73	51	148	SKU-NEW-0473
396	Makita HP1630 Matkap	2618.00	3665.20	8690000020474	318	11	t	34	74	52	149	SKU-NEW-0474
397	Makita HP1630 Matkap - XL	553.00	774.20	8690000020149	43	11	t	39	69	52	149	SKU-NEW-0149
398	Makita DTD152 Darbeli Vidalama	590.00	708.00	8690000020150	50	11	t	40	70	52	150	SKU-NEW-0150
399	Makita DTD152 Darbeli Vidalama - Standart	2655.00	3186.00	8690000020475	325	11	t	35	75	52	150	SKU-NEW-0475
400	Makita DHS680 Daire Testere - Standart	627.00	783.75	8690000020151	57	11	t	41	71	52	151	SKU-NEW-0151
401	Makita DHS680 Daire Testere - Siyah	2692.00	3365.00	8690000020476	332	11	t	36	76	52	151	SKU-NEW-0476
402	Karcher K5 Basınçlı Yıkama - Siyah	664.00	863.20	8690000020152	64	11	t	42	72	53	152	SKU-NEW-0152
403	Karcher K5 Basınçlı Yıkama - Beyaz	2729.00	3547.70	8690000020477	339	11	t	37	77	53	152	SKU-NEW-0477
404	Karcher WV5 Cam Silme Robotu - Beyaz	701.00	946.35	8690000020153	71	11	t	43	73	53	153	SKU-NEW-0153
405	Karcher WV5 Cam Silme Robotu - Pro	2766.00	3734.10	8690000020478	346	11	t	38	78	53	153	SKU-NEW-0478
406	Karcher K2 Compact - Pro	738.00	1033.20	8690000020154	78	11	t	44	74	53	154	SKU-NEW-0154
407	Karcher K2 Compact - XL	2803.00	3924.20	8690000020479	353	11	t	39	79	53	154	SKU-NEW-0479
408	Hilti TE 6-A36 Kırıcı Delici	2840.00	3408.00	8690000020480	360	11	t	40	\N	54	155	SKU-NEW-0480
409	Hilti TE 6-A36 Kırıcı Delici - XL	775.00	930.00	8690000020155	85	11	t	45	75	54	155	SKU-NEW-0155
410	Hilti SF 6H Vidalama - Standart	2877.00	3596.25	8690000020481	367	11	t	41	1	54	156	SKU-NEW-0481
411	Hilti SF 6H Vidalama	812.00	1015.00	8690000020156	92	11	t	46	76	54	156	SKU-NEW-0156
412	Hilti PM 2-L Lazer - Standart	849.00	1103.70	8690000020157	99	11	t	47	77	54	157	SKU-NEW-0157
413	Hilti PM 2-L Lazer - Siyah	2914.00	3788.20	8690000020482	374	11	t	42	2	54	157	SKU-NEW-0482
414	DeWalt DCD776 Matkap - Beyaz	2951.00	3983.85	8690000020483	381	11	t	43	3	55	158	SKU-NEW-0483
415	DeWalt DCD776 Matkap - Siyah	886.00	1196.10	8690000020158	106	11	t	48	78	55	158	SKU-NEW-0158
416	DeWalt DCS391 Daire Testere - Pro	2988.00	4183.20	8690000020484	388	11	t	44	4	55	159	SKU-NEW-0484
417	DeWalt DCS391 Daire Testere - Beyaz	923.00	1292.20	8690000020159	113	11	t	49	79	55	159	SKU-NEW-0159
418	DeWalt DW088 Lazer - Pro	960.00	1152.00	8690000020160	120	11	t	50	\N	55	160	SKU-NEW-0160
419	DeWalt DW088 Lazer - XL	3025.00	3630.00	8690000020485	395	11	t	45	5	55	160	SKU-NEW-0485
420	Lego City Police Station - XL	997.00	1246.25	8690000020161	127	12	t	51	1	56	161	SKU-NEW-0161
421	Lego City Police Station	3062.00	3827.50	8690000020486	402	12	t	46	6	56	161	SKU-NEW-0486
422	Lego Technic Bugatti - Standart	3099.00	4028.70	8690000020487	409	12	t	47	7	56	162	SKU-NEW-0487
423	Lego Technic Bugatti	1034.00	1344.20	8690000020162	134	12	t	52	2	56	162	SKU-NEW-0162
424	Lego Star Wars Millennium Falcon - Standart	1071.00	1445.85	8690000020163	141	12	t	53	3	56	163	SKU-NEW-0163
425	Lego Star Wars Millennium Falcon - Siyah	3136.00	4233.60	8690000020488	416	12	t	48	8	56	163	SKU-NEW-0488
426	Hasbro Monopoly Klasik - Siyah	1108.00	1551.20	8690000020164	148	12	t	54	4	57	164	SKU-NEW-0164
427	Hasbro Monopoly Klasik - Beyaz	3173.00	4442.20	8690000020489	423	12	t	49	9	57	164	SKU-NEW-0489
428	Hasbro Play-Doh Set - Pro	3210.00	3852.00	8690000020490	430	12	t	50	10	57	165	SKU-NEW-0490
429	Hasbro Play-Doh Set - Beyaz	1145.00	1374.00	8690000020165	155	12	t	55	5	57	165	SKU-NEW-0165
430	Hasbro Nerf Elite - Pro	1182.00	1477.50	8690000020166	162	12	t	1	6	57	166	SKU-NEW-0166
431	Hasbro Nerf Elite - XL	3247.00	4058.75	8690000020491	437	12	t	51	11	57	166	SKU-NEW-0491
432	Mattel Barbie Dreamhouse - XL	1219.00	1584.70	8690000020167	169	12	t	2	7	58	167	SKU-NEW-0167
433	Mattel Barbie Dreamhouse	3284.00	4269.20	8690000020492	444	12	t	52	12	58	167	SKU-NEW-0492
434	Mattel Hot Wheels Track Set	1256.00	1695.60	8690000020168	176	12	t	3	8	58	168	SKU-NEW-0168
435	Mattel Hot Wheels Track Set - Standart	3321.00	4483.35	8690000020493	451	12	t	53	13	58	168	SKU-NEW-0493
436	Mattel UNO Kart Oyunu - Standart	1293.00	1810.20	8690000020169	183	12	t	4	9	58	169	SKU-NEW-0169
437	Mattel UNO Kart Oyunu - Siyah	3358.00	4701.20	8690000020494	458	12	t	54	14	58	169	SKU-NEW-0494
438	Playmobil City Life Hastane - Beyaz	3395.00	4074.00	8690000020495	465	12	t	55	15	59	170	SKU-NEW-0495
439	Playmobil City Life Hastane - Siyah	1330.00	1596.00	8690000020170	190	12	t	5	10	59	170	SKU-NEW-0170
440	Playmobil Knights Kalesi - Pro	3432.00	4290.00	8690000020496	472	12	t	1	16	59	171	SKU-NEW-0496
441	Playmobil Knights Kalesi - Beyaz	1367.00	1708.75	8690000020171	197	12	t	6	11	59	171	SKU-NEW-0171
442	Playmobil Family Fun Tatil Evi - XL	3469.00	4509.70	8690000020497	479	12	t	2	17	59	172	SKU-NEW-0497
443	Playmobil Family Fun Tatil Evi - Pro	1404.00	1825.20	8690000020172	204	12	t	7	12	59	172	SKU-NEW-0172
444	Fisher-Price Rock-a-Stack - XL	1441.00	1945.35	8690000020173	211	12	t	8	13	60	173	SKU-NEW-0173
445	Fisher-Price Rock-a-Stack	3506.00	4733.10	8690000020498	486	12	t	3	18	60	173	SKU-NEW-0498
446	Fisher-Price Laugh & Learn	1478.00	2069.20	8690000020174	218	12	t	9	14	60	174	SKU-NEW-0174
447	Fisher-Price Laugh & Learn - Standart	3543.00	4960.20	8690000020499	493	12	t	4	19	60	174	SKU-NEW-0499
448	Fisher-Price Little People Farm - Siyah	3580.00	4296.00	8690000020500	0	12	f	5	\N	60	175	SKU-NEW-0500
449	Fisher-Price Little People Farm - Standart	1515.00	1818.00	8690000020175	225	12	t	10	15	60	175	SKU-NEW-0175
450	Pelikan Griffix Dolma Kalem - Siyah	1552.00	1940.00	8690000020176	232	13	t	11	16	61	176	SKU-NEW-0176
451	Pelikan M200 Dolma Kalem - Beyaz	1589.00	2065.70	8690000020177	239	13	t	12	17	61	177	SKU-NEW-0177
452	Pelikan Twist Kurşun Kalem - Pro	1626.00	2195.10	8690000020178	246	13	t	13	18	61	178	SKU-NEW-0178
453	Staedtler Noris Kurşun Kalem - XL	1663.00	2328.20	8690000020179	253	13	t	14	19	62	179	SKU-NEW-0179
454	Staedtler Triplus Fineliner	1700.00	2040.00	8690000020180	260	13	t	15	\N	62	180	SKU-NEW-0180
455	Staedtler Mars Plastic Silgi - Standart	1737.00	2171.25	8690000020181	267	13	t	16	21	62	181	SKU-NEW-0181
456	Parker Jotter Tükenmez Kalem - Siyah	1774.00	2306.20	8690000020182	274	13	t	17	22	63	182	SKU-NEW-0182
457	Parker IM Dolma Kalem - Beyaz	1811.00	2444.85	8690000020183	281	13	t	18	23	63	183	SKU-NEW-0183
458	Parker Vector Roller Kalem - Pro	1848.00	2587.20	8690000020184	288	13	t	19	24	63	184	SKU-NEW-0184
459	Scribo Trend Tükenmez Kalem - XL	1885.00	2262.00	8690000020185	295	13	t	20	25	64	185	SKU-NEW-0185
460	Scribo Vintage Dolma Kalem	1922.00	2402.50	8690000020186	302	13	t	21	26	64	186	SKU-NEW-0186
461	Scribo Fantasia Boya Kalem Seti - Standart	1959.00	2546.70	8690000020187	309	13	t	22	27	64	187	SKU-NEW-0187
462	Morfoz Spiralli Defter - Siyah	1996.00	2694.60	8690000020188	316	13	t	23	28	65	188	SKU-NEW-0188
463	Morfoz A4 Kareli Defter - Beyaz	2033.00	2846.20	8690000020189	323	13	t	24	29	65	189	SKU-NEW-0189
464	Morfoz Sunum Dosyası - Pro	2070.00	2484.00	8690000020190	330	13	t	25	30	65	190	SKU-NEW-0190
465	Pampers Premium Care Bebek Bezi - XL	2107.00	2633.75	8690000020191	337	14	t	26	31	66	191	SKU-NEW-0191
466	Pampers Baby-Dry Bebek Bezi	2144.00	2787.20	8690000020192	344	14	t	27	32	66	192	SKU-NEW-0192
467	Pampers Islak Havlu - Standart	2181.00	2944.35	8690000020193	351	14	t	28	33	66	193	SKU-NEW-0193
468	Huggies Ultra Comfort Bebek Bezi - Siyah	2218.00	3105.20	8690000020194	358	14	t	29	34	67	194	SKU-NEW-0194
469	Huggies Elite Soft Bebek Bezi - Beyaz	2255.00	2706.00	8690000020195	365	14	t	30	35	67	195	SKU-NEW-0195
470	Huggies Islak Mendil - Pro	2292.00	2865.00	8690000020196	372	14	t	31	36	67	196	SKU-NEW-0196
471	Prima Aktif Bebek Bezi - XL	2329.00	3027.70	8690000020197	379	14	t	32	37	68	197	SKU-NEW-0197
472	Prima Pants Külot Bez	2366.00	3194.10	8690000020198	386	14	t	33	38	68	198	SKU-NEW-0198
473	Prima Yenidoğan Bezi - Standart	2403.00	3364.20	8690000020199	393	14	t	34	39	68	199	SKU-NEW-0199
474	Chicco Next2Me Beşik - Siyah	2440.00	2928.00	8690000020200	400	14	t	35	\N	69	200	SKU-NEW-0200
475	Chicco KeyFit Oto Koltuğu - Beyaz	2477.00	3096.25	8690000020201	407	14	t	36	41	69	201	SKU-NEW-0201
476	Chicco Biberon Seti - Pro	2514.00	3268.20	8690000020202	414	14	t	37	42	69	202	SKU-NEW-0202
477	Mamas & Papas Flip XT2 Bebek Arabası - XL	2551.00	3443.85	8690000020203	421	14	t	38	43	70	203	SKU-NEW-0203
478	Mamas & Papas Airo Puset	2588.00	3623.20	8690000020204	428	14	t	39	44	70	204	SKU-NEW-0204
479	Mamas & Papas Snug Ana Kucağı - Standart	2625.00	3150.00	8690000020205	435	14	t	40	45	70	205	SKU-NEW-0205
480	Arçelik 9312 EI Çamaşır Makinesi - Siyah	2662.00	3327.50	8690000020206	442	15	t	41	46	71	206	SKU-NEW-0206
481	Arçelik No-Frost Buzdolabı - Beyaz	2699.00	3508.70	8690000020207	449	15	t	42	47	71	207	SKU-NEW-0207
482	Arçelik Robofresh Süpürge - Pro	2736.00	3693.60	8690000020208	456	15	t	43	48	71	208	SKU-NEW-0208
483	Vestel Vestel Buzdolabı NF520 - XL	2773.00	3882.20	8690000020209	463	15	t	44	49	72	209	SKU-NEW-0209
484	Vestel Vestel Fırın 8607	2810.00	3372.00	8690000020210	470	15	t	45	50	72	210	SKU-NEW-0210
485	Vestel Vestel Çamaşır Makinesi 9146 - Standart	2847.00	3558.75	8690000020211	477	15	t	46	51	72	211	SKU-NEW-0211
486	Bosch Serie 6 Bulaşık Makinesi - Siyah	2884.00	3749.20	8690000020212	484	15	t	47	52	73	212	SKU-NEW-0212
487	Bosch Serie 4 Çamaşır Makinesi - Beyaz	2921.00	3943.35	8690000020213	491	15	t	48	53	73	213	SKU-NEW-0213
488	Bosch KGN Buzdolabı - Pro	2958.00	4141.20	8690000020214	498	15	t	49	54	73	214	SKU-NEW-0214
489	Philips Airfryer XXL - XL	2995.00	3594.00	8690000020215	5	15	t	50	55	74	215	SKU-NEW-0215
490	Philips Senseo Kahve Makinesi	3032.00	3790.00	8690000020216	12	15	t	51	56	74	216	SKU-NEW-0216
491	Philips PowerLife Süpürge - Standart	3069.00	3989.70	8690000020217	19	15	t	52	57	74	217	SKU-NEW-0217
492	Fakir Veyron Süpürge - Siyah	3106.00	4193.10	8690000020218	26	15	t	53	58	75	218	SKU-NEW-0218
493	Fakir Robofix Mutfak Robotu - Beyaz	3143.00	4400.20	8690000020219	33	15	t	54	59	75	219	SKU-NEW-0219
494	Fakir Toz Torbasız Süpürge - Pro	3180.00	3816.00	8690000020220	40	15	t	55	\N	75	220	SKU-NEW-0220
495	Tefal Ingenio Tava Seti - XL	3217.00	4021.25	8690000020221	47	16	t	1	61	76	221	SKU-NEW-0221
496	Tefal Cook4Me Düdüklü	3254.00	4230.20	8690000020222	54	16	t	2	62	76	222	SKU-NEW-0222
497	Tefal Easy Fry Airfryer - Standart	3291.00	4442.85	8690000020223	61	16	t	3	63	76	223	SKU-NEW-0223
498	Karaca Chef Tencere Seti - Siyah	3328.00	4659.20	8690000020224	68	16	t	4	64	77	224	SKU-NEW-0224
499	Karaca Nero Kahve Makinesi - Beyaz	3365.00	4038.00	8690000020225	75	16	t	5	65	77	225	SKU-NEW-0225
500	Karaca Kevo Blender - Pro	3402.00	4252.50	8690000020226	82	16	t	6	66	77	226	SKU-NEW-0226
501	Emsan Trend Tencere Seti - XL	3439.00	4470.70	8690000020227	89	16	t	7	67	78	227	SKU-NEW-0227
502	Emsan Granit Tava	3476.00	4692.60	8690000020228	96	16	t	8	68	78	228	SKU-NEW-0228
503	Emsan Çelik Sürahi - Standart	3513.00	4918.20	8690000020229	103	16	t	9	69	78	229	SKU-NEW-0229
504	Bialetti Moka Express - Siyah	3550.00	4260.00	8690000020230	110	16	t	10	70	79	230	SKU-NEW-0230
505	Bialetti Espresso Makinesi - Beyaz	3587.00	4483.75	8690000020231	117	16	t	11	71	79	231	SKU-NEW-0231
506	Bialetti Çelik Süzgeç Seti - Pro	3624.00	4711.20	8690000020232	124	16	t	12	72	79	232	SKU-NEW-0232
507	WMF Profi Plus Tencere - XL	3661.00	4942.35	8690000020233	131	16	t	13	73	80	233	SKU-NEW-0233
508	WMF Bistro Bıçak Seti	3698.00	5177.20	8690000020234	138	16	t	14	74	80	234	SKU-NEW-0234
509	WMF Kult Tost Makinesi - Standart	3735.00	4482.00	8690000020235	145	16	t	15	75	80	235	SKU-NEW-0235
510	Bosch S4 Akü - Siyah	3772.00	4715.00	8690000020236	152	17	t	16	76	81	236	SKU-NEW-0236
511	Bosch Aerotwin Silecek - Beyaz	3809.00	4951.70	8690000020237	159	17	t	17	77	81	237	SKU-NEW-0237
512	Bosch Oto Yağ Filtresi - Pro	3846.00	5192.10	8690000020238	166	17	t	18	78	81	238	SKU-NEW-0238
513	Michelin Pilot Sport 4 Lastik - XL	3883.00	5436.20	8690000020239	173	17	t	19	79	82	239	SKU-NEW-0239
514	Michelin Primacy 4 Lastik	3920.00	4704.00	8690000020240	180	17	t	20	\N	82	240	SKU-NEW-0240
515	Michelin CrossClimate 2 Lastik - Standart	3957.00	4946.25	8690000020241	187	17	t	21	1	82	241	SKU-NEW-0241
516	Castrol GTX 5W-30 Motor Yağı - Siyah	3994.00	5192.20	8690000020242	194	17	t	22	2	83	242	SKU-NEW-0242
517	Castrol Edge 5W-40 Motor Yağı - Beyaz	4031.00	5441.85	8690000020243	201	17	t	23	3	83	243	SKU-NEW-0243
518	Castrol Magnatec 10W-40 - Pro	4068.00	5695.20	8690000020244	208	17	t	24	4	83	244	SKU-NEW-0244
519	Mobil Mobil 1 5W-30 - XL	4105.00	4926.00	8690000020245	215	17	t	25	5	84	245	SKU-NEW-0245
520	Mobil Mobil Super 3000	4142.00	5177.50	8690000020246	222	17	t	26	6	84	246	SKU-NEW-0246
521	Mobil Mobil Delvac Truck - Standart	4179.00	5432.70	8690000020247	229	17	t	27	7	84	247	SKU-NEW-0247
522	Total Quartz 9000 Motor Yağı - Siyah	4216.00	5691.60	8690000020248	236	17	t	28	8	85	248	SKU-NEW-0248
523	Total Rubia Diesel Yağı - Beyaz	4253.00	5954.20	8690000020249	243	17	t	29	9	85	249	SKU-NEW-0249
524	Total Total Antifriz - Pro	4290.00	5148.00	8690000020250	250	17	t	30	10	85	250	SKU-NEW-0250
525	Pedigree Vital Protection Mama - XL	4327.00	5408.75	8690000020251	257	18	t	31	11	86	251	SKU-NEW-0251
526	Pedigree Dentastix	4364.00	5673.20	8690000020252	264	18	t	32	12	86	252	SKU-NEW-0252
527	Pedigree Puppy Yavru Maması - Standart	4401.00	5941.35	8690000020253	271	18	t	33	13	86	253	SKU-NEW-0253
528	Whiskas Junior Kedi Maması - Siyah	4438.00	6213.20	8690000020254	278	18	t	34	14	87	254	SKU-NEW-0254
529	Whiskas Adult 1+ Mama - Beyaz	4475.00	5370.00	8690000020255	285	18	t	35	15	87	255	SKU-NEW-0255
530	Whiskas Temptations Ödül Maması - Pro	4512.00	5640.00	8690000020256	292	18	t	36	16	87	256	SKU-NEW-0256
531	Royal Canin Maxi Adult Köpek Maması - XL	4549.00	5913.70	8690000020257	299	18	t	37	17	88	257	SKU-NEW-0257
532	Royal Canin Indoor Kedi Maması	4586.00	6191.10	8690000020258	306	18	t	38	18	88	258	SKU-NEW-0258
533	Royal Canin Veteriner Diyet Maması - Standart	4623.00	6472.20	8690000020259	313	18	t	39	19	88	259	SKU-NEW-0259
534	Purina Pro Plan Köpek Maması - Siyah	4660.00	5592.00	8690000020260	320	18	t	40	\N	89	260	SKU-NEW-0260
535	Purina One Kedi Maması - Beyaz	4697.00	5871.25	8690000020261	327	18	t	41	21	89	261	SKU-NEW-0261
536	Purina Friskies Mama - Pro	4734.00	6154.20	8690000020262	334	18	t	42	22	89	262	SKU-NEW-0262
537	Felix As Good As It Looks - XL	4771.00	6440.85	8690000020263	341	18	t	43	23	90	263	SKU-NEW-0263
538	Felix Party Mix Ödül	4808.00	6731.20	8690000020264	348	18	t	44	24	90	264	SKU-NEW-0264
539	Felix Sensations Mama - Standart	4845.00	5814.00	8690000020265	355	18	t	45	25	90	265	SKU-NEW-0265
540	Intel Core i7-14700K - Siyah	4882.00	6102.50	8690000020266	362	19	t	46	26	91	266	SKU-NEW-0266
541	Intel Core i5-13600K - Beyaz	4919.00	6394.70	8690000020267	369	19	t	47	27	91	267	SKU-NEW-0267
542	Intel Core i9-14900K - Pro	4956.00	6690.60	8690000020268	376	19	t	48	28	91	268	SKU-NEW-0268
543	AMD Ryzen 7 7800X3D - XL	4993.00	6990.20	8690000020269	383	19	t	49	29	92	269	SKU-NEW-0269
544	AMD Ryzen 5 7600X	50.00	60.00	8690000020270	390	19	t	50	30	92	270	SKU-NEW-0270
545	AMD Ryzen 9 7950X - Standart	87.00	108.75	8690000020271	397	19	t	51	31	92	271	SKU-NEW-0271
546	Nvidia RTX 4070 Ti - Siyah	124.00	161.20	8690000020272	404	19	t	52	32	93	272	SKU-NEW-0272
547	Nvidia RTX 4060 - Beyaz	161.00	217.35	8690000020273	411	19	t	53	33	93	273	SKU-NEW-0273
548	Nvidia RTX 4090 - Pro	198.00	277.20	8690000020274	418	19	t	54	34	93	274	SKU-NEW-0274
549	Corsair Vengeance RGB RAM - XL	235.00	282.00	8690000020275	425	19	t	55	35	94	275	SKU-NEW-0275
550	Corsair K70 Klavye	272.00	340.00	8690000020276	432	19	t	1	36	94	276	SKU-NEW-0276
551	Corsair HX1000 Güç Kaynağı - Standart	309.00	401.70	8690000020277	439	19	t	2	37	94	277	SKU-NEW-0277
552	MSI MAG B650 Anakart - Siyah	346.00	467.10	8690000020278	446	19	t	3	38	95	278	SKU-NEW-0278
553	MSI Optix Monitör - Beyaz	383.00	536.20	8690000020279	453	19	t	4	39	95	279	SKU-NEW-0279
554	MSI Katana Laptop - Pro	420.00	504.00	8690000020280	460	19	t	5	\N	95	280	SKU-NEW-0280
555	Anker PowerCore 20000 - XL	457.00	571.25	8690000020281	467	20	t	6	41	96	281	SKU-NEW-0281
556	Anker Soundcore Q30	494.00	642.20	8690000020282	474	20	t	7	42	96	282	SKU-NEW-0282
557	Anker PowerLine Kablo - Standart	531.00	716.85	8690000020283	481	20	t	8	43	96	283	SKU-NEW-0283
558	Baseus 65W Şarj Cihazı - Siyah	568.00	795.20	8690000020284	488	20	t	9	44	97	284	SKU-NEW-0284
559	Baseus Manyetik Araç Tutucu - Beyaz	605.00	726.00	8690000020285	495	20	t	10	45	97	285	SKU-NEW-0285
560	Baseus USB-C Kablo - Pro	642.00	802.50	8690000020286	2	20	t	11	46	97	286	SKU-NEW-0286
561	Spigen Tough Armor Kılıf - XL	679.00	882.70	8690000020287	9	20	t	12	47	98	287	SKU-NEW-0287
562	Spigen Glas.tR Ekran Koruyucu	716.00	966.60	8690000020288	16	20	t	13	48	98	288	SKU-NEW-0288
563	Spigen Rugged Armor Kılıf - Standart	753.00	1054.20	8690000020289	23	20	t	14	49	98	289	SKU-NEW-0289
564	Belkin BoostCharge Şarj Cihazı - Siyah	790.00	948.00	8690000020290	30	20	t	15	50	99	290	SKU-NEW-0290
565	Belkin Kablosuz Şarj Standı - Beyaz	827.00	1033.75	8690000020291	37	20	t	16	51	99	291	SKU-NEW-0291
566	Belkin USB-C Hub - Pro	864.00	1123.20	8690000020292	44	20	t	17	52	99	292	SKU-NEW-0292
567	JBL Flip 6 Bluetooth Hoparlör - XL	901.00	1216.35	8690000020293	51	20	t	18	53	100	293	SKU-NEW-0293
568	JBL Tune 510BT Kulaklık	938.00	1313.20	8690000020294	58	20	t	19	54	100	294	SKU-NEW-0294
569	JBL Charge 5 - Standart	975.00	1170.00	8690000020295	65	20	t	20	55	100	295	SKU-NEW-0295
570	Yataş Bedding Yatak - Siyah	1012.00	1265.00	8690000020296	72	21	t	21	56	101	296	SKU-NEW-0296
571	Yataş Fillmatik Yastık - Beyaz	1049.00	1363.70	8690000020297	79	21	t	22	57	101	297	SKU-NEW-0297
572	Yataş Yorgan Seti - Pro	1086.00	1466.10	8690000020298	86	21	t	23	58	101	298	SKU-NEW-0298
573	Taç Saten Nevresim Takımı - XL	1123.00	1572.20	8690000020299	93	21	t	24	59	102	299	SKU-NEW-0299
574	Taç Pike Yatak Örtüsü	1160.00	1392.00	8690000020300	100	21	t	25	\N	102	300	SKU-NEW-0300
575	Taç Alez - Standart	1197.00	1496.25	8690000020301	107	21	t	26	61	102	301	SKU-NEW-0301
576	Marie Claire Jakarlı Nevresim - Siyah	1234.00	1604.20	8690000020302	114	21	t	27	62	103	302	SKU-NEW-0302
577	Marie Claire Şönil Battaniye - Beyaz	1271.00	1715.85	8690000020303	121	21	t	28	63	103	303	SKU-NEW-0303
578	Marie Claire Havlu Seti - Pro	1308.00	1831.20	8690000020304	128	21	t	29	64	103	304	SKU-NEW-0304
579	Zeugma Baskılı Nevresim Takımı - XL	1345.00	1614.00	8690000020305	135	21	t	30	65	104	305	SKU-NEW-0305
580	Zeugma Çift Kişilik Yatak Örtüsü	1382.00	1727.50	8690000020306	142	21	t	31	66	104	306	SKU-NEW-0306
581	Zeugma Yastık Kılıfı - Standart	1419.00	1844.70	8690000020307	149	21	t	32	67	104	307	SKU-NEW-0307
582	English Home Pamuklu Nevresim Takımı - Siyah	1456.00	1965.60	8690000020308	156	21	t	33	68	105	308	SKU-NEW-0308
583	English Home Örtü Seti - Beyaz	1493.00	2090.20	8690000020309	163	21	t	34	69	105	309	SKU-NEW-0309
584	English Home Havlu Takımı - Pro	1530.00	1836.00	8690000020310	170	21	t	35	70	105	310	SKU-NEW-0310
585	Philips Hue Akıllı Ampul - XL	1567.00	1958.75	8690000020311	177	22	t	36	71	106	311	SKU-NEW-0311
586	Philips LED Panel Aydınlatma	1604.00	2085.20	8690000020312	184	22	t	37	72	106	312	SKU-NEW-0312
587	Philips Ecohome Ampul - Standart	1641.00	2215.35	8690000020313	191	22	t	38	73	106	313	SKU-NEW-0313
588	Osram LED Value Ampul - Siyah	1678.00	2349.20	8690000020314	198	22	t	39	74	107	314	SKU-NEW-0314
589	Osram Parathom LED - Beyaz	1715.00	2058.00	8690000020315	205	22	t	40	75	107	315	SKU-NEW-0315
590	Osram Night Breaker Oto Ampul - Pro	1752.00	2190.00	8690000020316	212	22	t	41	76	107	316	SKU-NEW-0316
591	NVC Lighting LED Spot Aydınlatma - XL	1789.00	2325.70	8690000020317	219	22	t	42	77	108	317	SKU-NEW-0317
592	NVC Lighting Sıva Altı Panel	1826.00	2465.10	8690000020318	226	22	t	43	78	108	318	SKU-NEW-0318
593	NVC Lighting Sokak Aydınlatma - Standart	1863.00	2608.20	8690000020319	233	22	t	44	79	108	319	SKU-NEW-0319
594	Ledvance LED Şerit Aydınlatma - Siyah	1900.00	2280.00	8690000020320	240	22	t	45	\N	109	320	SKU-NEW-0320
595	Ledvance Smart+ Akıllı Ampul - Beyaz	1937.00	2421.25	8690000020321	247	22	t	46	1	109	321	SKU-NEW-0321
596	Ledvance Downlight - Pro	1974.00	2566.20	8690000020322	254	22	t	47	2	109	322	SKU-NEW-0322
597	Faro Sarkıt Avize - XL	2011.00	2714.85	8690000020323	261	22	t	48	3	110	323	SKU-NEW-0323
598	Faro Duvar Apliği	2048.00	2867.20	8690000020324	268	22	t	49	4	110	324	SKU-NEW-0324
599	Faro Masa Lambası - Standart	2085.00	2502.00	8690000020325	275	22	t	50	5	110	325	SKU-NEW-0325
\.


--
-- Data for Name: RefreshTokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."RefreshTokens" ("Id", "Token", "UserId", "ExpiresAt", "IsRevoked", "CreatedAt") FROM stdin;
1	KKJo/8iaSPx1tfhpW+bIvoLrxfJTC2EMGpTTXCbZkkc=	1	2026-07-28 08:17:35.725509+00	f	2026-07-21 08:17:35.725531+00
2	pw8X7kCiDoDLaCf9iJjq5/56jZlxBVU8r5wbJ+KPst0=	1	2026-07-28 08:22:07.630507+00	f	2026-07-21 08:22:07.630507+00
3	QZouKal5JrMxcrNiE9dHXJYR79bJgVO3YCwjbjQ7zQg=	1	2026-07-28 08:23:59.679116+00	f	2026-07-21 08:23:59.679117+00
43	ngxfmP4LWp2BGJKicL0uknCJIE4pHHmsrkoyXWI4++c=	1	2026-07-28 08:44:46.215686+00	f	2026-07-21 08:44:46.215687+00
44	kJS42epkcGtsKoMnBp0SRifJAgt5G6liciHH8qSwdwM=	1	2026-07-28 08:54:09.732106+00	f	2026-07-21 08:54:09.732106+00
45	/PSDEhEDgKMixgKUoVlOMpUK5knCCehxEocFKF5iFwI=	1	2026-07-28 09:01:35.098054+00	f	2026-07-21 09:01:35.098054+00
46	/dJEqu1u6VD9D1AdaN8eEy0A9ymfB+zvsUkgLmCAnCQ=	1	2026-07-28 10:28:11.133355+00	f	2026-07-21 10:28:11.133356+00
47	3CLIeVftB8o9Is60In67oYl2bIdoB4L8N5Z30ILfHx8=	1	2026-07-28 10:30:07.953069+00	f	2026-07-21 10:30:07.953069+00
91	jntxlGhLTqpRyyAF3z3AW4jn7RQI+AwFOppbraee/LI=	9	2026-07-30 06:29:25.961227+00	t	2026-07-23 06:29:25.961228+00
92	UlyrV7nD7z8+hg44CqiMIp6vjjkiV7mDMeDrBKmJO34=	9	2026-07-30 14:35:10.263282+00	t	2026-07-23 14:35:10.263306+00
95	zVyKJ/mprl70Flxc5p4RHSK1FroVa+7BK6pGv4v0N/M=	9	2026-08-03 06:21:47.903242+00	t	2026-07-27 06:21:47.903243+00
99	IZcsvvX+98lVyL6S+bkjrayjMeRazaJ9qIv1mY9zIiY=	9	2026-08-03 12:48:46.654428+00	t	2026-07-27 12:48:46.654429+00
102	4Q7o26q/j38+o/T48JoV8coE1sFclKKPPNAcgnKOYQs=	9	2026-08-04 07:02:38.66589+00	t	2026-07-28 07:02:38.66589+00
108	SBccur6kKNevVHxefVfXG+1ucxSWoJH8org37JGzmGI=	9	2026-08-04 13:47:04.74639+00	t	2026-07-28 13:47:04.74639+00
111	z/vaEXZ7vS1WO/ed4BeOoHDVmj4sUKGB86/XC8pdbrU=	9	2026-08-05 07:46:49.178197+00	t	2026-07-29 07:46:49.178197+00
49	ff7GLzrYM9T+BeCQu9corfRYlSXP0ONKoUs/QBuPc4k=	9	2026-07-28 10:59:06.719407+00	t	2026-07-21 10:59:06.719441+00
50	7CczILhchV08LFox14vmA3qehEkRXh2CVPNU8+qVv/g=	9	2026-07-28 11:00:11.405427+00	t	2026-07-21 11:00:11.405428+00
86	CfHyqeoUSNSVXbjwrSXAtezq0//JMAdooaWqVwyTsPQ=	9	2026-07-29 13:06:58.36426+00	t	2026-07-22 13:06:58.36426+00
115	jNuNPInSLMmAGEpEmt5JSEg4NUUI6WG1ZIFIJC+5pkM=	9	2026-08-05 10:01:59.562744+00	t	2026-07-29 10:01:59.562745+00
118	6ngmTjoTwfPsgWqv8N27/M1Ba5i2iP/2VIonDga9Anc=	9	2026-08-05 13:21:53.661971+00	t	2026-07-29 13:21:53.661975+00
122	5R+AquVG3nExSZaFJEM7M1H2nVWX+YqiW2TuoefR/zg=	9	2026-08-05 13:23:24.942079+00	t	2026-07-29 13:23:24.942079+00
123	b4BqQO/WGto9ykVmV9QieyG38Eh0WaJuFu2QngW/yrY=	9	2026-08-06 06:10:26.127174+00	t	2026-07-30 06:10:26.127174+00
126	fZ6ojd9iNqfZGy/MGNfRRVw1863RFd+HLEAaEfUsYh0=	9	2026-08-06 06:10:26.130846+00	t	2026-07-30 06:10:26.130847+00
233	/yGWPyhINXjCzm1RXoNCud3taRX2/KShBYIsMeenJP4=	9	2026-08-14 08:58:36.540111+00	f	2026-08-07 08:58:36.540113+00
129	8SwfhamkLBEYV97ESwUcyve05alKWLVMYk6RyhS461g=	9	2026-08-06 06:42:46.518989+00	t	2026-07-30 06:42:46.51899+00
132	9fQZqPLDOYyPmtqYpJub4LsUhuTJtuOXnphgsnxXI1w=	9	2026-08-06 07:21:24.302546+00	t	2026-07-30 07:21:24.302547+00
51	UwZQjS8sXwHcL7dQ5qF7ywJwXxBxIYV8oAmaI/8qvQo=	9	2026-07-28 11:10:46.453646+00	t	2026-07-21 11:10:46.453649+00
52	90hWPLXMI71KFqTp2poB08VfwZTpLCaAQMprzuRdEwE=	9	2026-07-28 11:13:06.345481+00	t	2026-07-21 11:13:06.345482+00
53	YcByzbv75/D/TVhAVCDRkHtJcdLJV1satsroaEh39p8=	9	2026-07-28 12:23:18.792499+00	t	2026-07-21 12:23:18.7925+00
54	gticpViv1wqEmWWPFY8+pFuhkR5Aq3a5qpFUGuGr8D4=	9	2026-07-28 12:23:33.325938+00	t	2026-07-21 12:23:33.325939+00
55	rj3MZxk1hgx+QULCq5L8K3drpK07yZwjRacTNzok2yA=	9	2026-07-28 12:35:44.138731+00	t	2026-07-21 12:35:44.138736+00
56	lPWNHLxfzxJlS1/QVO12hY+lwGCo+XIwVDQTX53u2gQ=	9	2026-07-28 13:09:37.048058+00	t	2026-07-21 13:09:37.048079+00
57	vr932WEe/v1dWs2TW3aozWudRBbajKHl1Q1acbj5plc=	9	2026-07-28 13:19:30.88211+00	t	2026-07-21 13:19:30.882111+00
58	mEAukm96uF28bjxT8IAoYO2TeUcNU0Uxz9YN75QVm0g=	9	2026-07-28 13:20:36.857295+00	t	2026-07-21 13:20:36.857295+00
59	VEK+bWUaGAWgROdeYKEKfH0T83osvfNOncKza4Gs0cc=	9	2026-07-28 13:52:58.325027+00	t	2026-07-21 13:52:58.325028+00
60	cXNqklOgEEuhn5ld3ySEwM3+GLcz2+zKoV8kQUnUJSA=	9	2026-07-29 06:38:56.978862+00	t	2026-07-22 06:38:56.978863+00
61	v3ByF2/lWKPB5B1niNdKfs6Qo6YMK6mZOF3z881b0JA=	9	2026-07-29 06:46:41.625319+00	t	2026-07-22 06:46:41.625344+00
62	URsoihKc3voaLnhDxNxzMrbPzRuWN8I8u+M2H75H3WM=	9	2026-07-29 06:46:59.689685+00	t	2026-07-22 06:46:59.689685+00
63	T2H6dQq9ppY9mKhVEXOyzPrFvpqQX69hlk5l40Q92hk=	9	2026-07-29 06:47:07.982014+00	t	2026-07-22 06:47:07.982014+00
64	SFVqb+fISsXDzqkpZ00G+aDe38J29MGF59XdNvhTvC0=	9	2026-07-29 06:47:52.631551+00	t	2026-07-22 06:47:52.631552+00
65	fXnN8qn2RJ3URuTrgbUV86+4Uyz9Gxx6IvC+yYD6S78=	9	2026-07-29 07:14:50.305467+00	t	2026-07-22 07:14:50.305467+00
66	c1pxIHHPGLmLGkbK9LB+NRGJet4y0OJzOoOGhOOua+c=	9	2026-07-29 07:26:42.221317+00	t	2026-07-22 07:26:42.221318+00
67	9uGrq0RZ8L1HOzObAM/mWi2luX8k+SfMDob+nwStxQQ=	9	2026-07-29 07:39:35.831566+00	t	2026-07-22 07:39:35.831567+00
68	RIophNxw6id5BaF3G4w4ANg8vHF5eyyA7AF+sujo57s=	9	2026-07-29 07:47:30.754023+00	t	2026-07-22 07:47:30.754027+00
135	8/ghUScHo6mqjDNoIRyilUncvQX6XDi9wuhpPkI7J40=	9	2026-08-06 08:15:48.518219+00	t	2026-07-30 08:15:48.518225+00
69	FyhaZtyk5T6RoGf3yMWtCwjhiaQeFVrOEPuTBL/uP0Q=	9	2026-07-29 08:01:25.970849+00	t	2026-07-22 08:01:25.97085+00
70	JfOm+2Or/Ew09e2CbSV+ktqgCNc5BQtf7dCF6eCpXJY=	9	2026-07-29 08:32:28.442125+00	t	2026-07-22 08:32:28.442125+00
71	P5Oj7qfU+nclxQtbmeqB2TWiZ7x/J1fwliGned446sg=	9	2026-07-29 10:13:51.581419+00	t	2026-07-22 10:13:51.581441+00
72	MwC0Qk5I16abA0NyvGG2bkB49olrHzN/E9AhriFcuOw=	9	2026-07-29 10:14:36.688702+00	t	2026-07-22 10:14:36.688703+00
73	Nk1kyizc+/PUTQsp68TB9JdWSg5qK9PvmijQZPtIBf8=	9	2026-07-29 10:15:07.037431+00	t	2026-07-22 10:15:07.037431+00
74	yJhuy5hqrXok0xDvpbP20LbDiLDAiNU2fSg2n6dPvN0=	9	2026-07-29 10:30:08.332248+00	t	2026-07-22 10:30:08.332249+00
75	f6bQ+iIQOOCUqHFOkmMMWWM5HyhQ2bYr+mPU1Z0PT/s=	9	2026-07-29 10:57:37.749195+00	t	2026-07-22 10:57:37.749215+00
76	Veh06qseMQ57m7EyZ93TBcCRtcoYOotbP3iD+94xsfo=	9	2026-07-29 10:58:31.993039+00	t	2026-07-22 10:58:31.993039+00
77	UicH+G4YAetQ00u4rNJNLsOceduusDK+qwAXva78OOY=	9	2026-07-29 10:59:13.926879+00	t	2026-07-22 10:59:13.926879+00
78	jsyVTQmDpYdnarPTMCs6F9C3UuC6s3aRRAiO+RaYWec=	9	2026-07-29 10:59:46.079698+00	t	2026-07-22 10:59:46.079698+00
79	0vTr4ZmbIrL1w6g2j0o0pl16lA8PpzZXXkzsnwHLIyc=	9	2026-07-29 11:36:32.104242+00	t	2026-07-22 11:36:32.104242+00
80	oZEkkxSldbCL4/y+JmZD7tTlWWASfKC+e6A7tP05LPw=	9	2026-07-29 12:23:56.295322+00	t	2026-07-22 12:23:56.295323+00
81	OkggKzMTxV78K5OpmGXlxRQaMpjgeNBAKjxH8ik4hdY=	9	2026-07-29 12:28:56.244834+00	t	2026-07-22 12:28:56.244834+00
82	QjEPUtmmYHlqetDnaK7OiquXCKfS4fdECo7aK45jRWU=	9	2026-07-29 12:35:26.944119+00	t	2026-07-22 12:35:26.944119+00
83	ovg4T8zNs9hYMhIoIjz7LSuI+sRCuT9OFBrKWOnG7bg=	9	2026-07-29 12:37:58.219066+00	t	2026-07-22 12:37:58.219067+00
84	ii/AMQU8b9S58WUUwkNJEZTndS1fzpmJeVzXeQ4AX0E=	9	2026-07-29 12:38:02.173369+00	t	2026-07-22 12:38:02.17337+00
85	8BUI1VDoSheanwAhu5zFyINuquxI2BM14XTjdbzVotE=	9	2026-07-29 12:50:13.021594+00	t	2026-07-22 12:50:13.021596+00
87	FolmWowRb+mF37fInDVR6cfpY7x9oD38TV/EDXcyIBE=	9	2026-07-29 14:07:03.353168+00	t	2026-07-22 14:07:03.353168+00
88	brcy9YteNqDHhTfcc97JugywCzAJEeHbAT/V0+H0t/4=	9	2026-07-30 06:21:35.954923+00	t	2026-07-23 06:21:35.954923+00
89	Qq06IoxVwAxCWZVtkQ6iuKTktQCXJizfAQKIlZmxi+Y=	9	2026-07-30 06:21:35.954898+00	t	2026-07-23 06:21:35.954898+00
90	l0d5pFU5DpYaRgNW1SI2BLL00AlV62OHYbYDogYQAzw=	9	2026-07-30 06:21:35.954924+00	t	2026-07-23 06:21:35.954924+00
130	saRk2EbnteF8iQEBUh6E4NZbrfiwnMfJO1DwptB1izQ=	9	2026-08-06 07:02:03.504506+00	t	2026-07-30 07:02:03.504507+00
133	ZrouHKzBOXxBI8KCL7mRPcs5y85Rg0wCshLYr6JmNdM=	9	2026-08-06 07:38:39.189437+00	t	2026-07-30 07:38:39.189438+00
109	xrXFsDgLEIl+kFOkhjWdzJrniHrAr3/jDFjRiOySow8=	9	2026-08-04 13:50:37.327105+00	t	2026-07-28 13:50:37.327105+00
116	ET4yU8Y86xHSqEtYDiIA35TH4UoXmGRup3Xk7puSdHg=	9	2026-08-05 12:31:22.204253+00	t	2026-07-29 12:31:22.204254+00
93	I+lNL+fdFbHKZNeVvAfK4VWIXPcDIj5F94dq63LcHhs=	9	2026-07-31 05:25:47.920655+00	t	2026-07-24 05:25:47.920655+00
96	17gmaqpzOx8XhiTAyDgjpS79+9UcBLtHEyXfTA7wiOw=	9	2026-08-03 06:32:42.321412+00	t	2026-07-27 06:32:42.321412+00
97	m/QHFmVUuHebAVNQ6K6cNwKL8U0kMmVn7mxGtK4FD4U=	9	2026-08-03 06:34:29.928716+00	t	2026-07-27 06:34:29.928716+00
100	f+rv6uz6qrkdTakQ1HMUuo38q8ppeqQWRwz4s1Bin54=	9	2026-08-03 13:06:16.555379+00	t	2026-07-27 13:06:16.555392+00
103	71eixGzE3ZjKqhm2H4Idx4DELycM1eymBbdPMWwvU7M=	9	2026-08-04 08:23:03.250788+00	t	2026-07-28 08:23:03.250789+00
104	KtWWglI632WOlqj6by7t78PwJaqk/u1uRsiGpeQvyDU=	9	2026-08-04 08:23:04.859345+00	t	2026-07-28 08:23:04.859345+00
105	HdSK9/O4hiubzNhjIDuNyS1yqgpn7aF/55tqh+KKxX4=	9	2026-08-04 08:23:05.86952+00	t	2026-07-28 08:23:05.86952+00
112	BWC8jNgKwbRMQXzRzcTi6GS4bUKyCz15/0u3tPlayUE=	9	2026-08-05 08:40:48.964406+00	t	2026-07-29 08:40:48.964432+00
119	SVtVM1+7x5EjJ7MQy/8bIiT01cpd0ipniVm9wIpR9tU=	9	2026-08-05 13:21:53.661894+00	t	2026-07-29 13:21:53.661895+00
124	LMO00uc5zwYGQ8A3MRKA8/wPlNaCDWf6oovyVL4wZ/Q=	9	2026-08-06 06:10:26.12935+00	t	2026-07-30 06:10:26.12935+00
127	eDYe2wyRWnULpYy52Jvpt9Xqd9H0v1pFeigY9a3SdFs=	9	2026-08-06 06:13:14.786917+00	t	2026-07-30 06:13:14.78694+00
182	+Gzx38PlH6VYZrFUDEoZ+Tehgl4bAS+TzXyHT4rBOvs=	9	2026-08-12 12:16:01.745325+00	t	2026-08-05 12:16:01.745326+00
136	lbYRMdEkcxuRnPS+IyuVY07xHynI10SFyrpCer33rQM=	9	2026-08-06 10:06:21.026818+00	t	2026-07-30 10:06:21.026829+00
139	A0nJKD61F2AB1EMwW203IYSvVV5Deya+Ic51T9/D3Is=	9	2026-08-06 13:22:32.226558+00	t	2026-07-30 13:22:32.226593+00
141	T9Zw6lbF1MDJxUZo6KPnrJ7j6TgFECB5WNq3Uml3nAA=	9	2026-08-10 07:04:37.581755+00	t	2026-08-03 07:04:37.581755+00
142	22scyGaiMeL4SoIndkbE5YLAe2l4sRtVfjwk0UUypvA=	9	2026-08-10 07:05:01.892063+00	t	2026-08-03 07:05:01.892064+00
151	luT5YwT/ACnU1ISaIbTyhYvox+pqog8CdXrcU0Fm5Gc=	9	2026-08-11 12:08:15.21628+00	t	2026-08-04 12:08:15.21628+00
154	s1zcYWGpB6rPc9C+f1xKwuSM/mLQhbD3RWmtsIGGdJ0=	9	2026-08-11 12:08:15.215876+00	t	2026-08-04 12:08:15.215877+00
157	qftzZ3CC42cd0QYWbH8FcgKGu5phFz6fnEThiXctveg=	9	2026-08-12 06:54:10.707837+00	t	2026-08-05 06:54:10.707838+00
158	Z5YSJ+zSKkJYAVNpqXODpl8HqsIH25JV6YpHKnSAN9c=	9	2026-08-12 06:54:10.708036+00	t	2026-08-05 06:54:10.708036+00
48	5vowFlsPoi2SbiAglbaLztfPOdh8FqPTv/PwW3/9gMY=	9	2026-07-28 10:50:20.776084+00	t	2026-07-21 10:50:20.776112+00
98	qIzqdEvXpSalpmchpEXaufplGLF9kYG3j/lYA6Ef9xA=	9	2026-08-03 06:37:56.272285+00	t	2026-07-27 06:37:56.272286+00
94	c6kDxuTE+ovo5ue8PyC76eN0AOxqWKcpZfPB9TxS+2U=	9	2026-08-03 05:08:33.045011+00	t	2026-07-27 05:08:33.045011+00
101	mEQDjJPyJJWzxz2BX59BcQXnN+TOZcN+O98ENNQqi30=	9	2026-08-04 06:24:03.1308+00	t	2026-07-28 06:24:03.130801+00
106	uQ2A5ew6gDdxwOkq6AnDLr8qPBOfurotZVbuSTTwuPA=	9	2026-08-04 13:19:55.993512+00	t	2026-07-28 13:19:55.993512+00
107	JpT5soAxkHKD5+p08b5z0GW2gsORop2haDCD0IlomHQ=	9	2026-08-04 13:24:38.247442+00	t	2026-07-28 13:24:38.247442+00
110	BoHft8cG6IGBmrqOzYZkIVUZiWVH2wKiQ3mS7u6WHEU=	9	2026-08-05 06:25:18.788966+00	t	2026-07-29 06:25:18.788966+00
113	E6yyuLAfYFDA9+quMhP1j760vwXLfhTbwW3cEaCv8Cg=	9	2026-08-05 08:41:14.69264+00	t	2026-07-29 08:41:14.69264+00
114	qXMuoVYdNoWY3FdqaXHG2KwuWEAEWDHxeNhVqeoOHMQ=	9	2026-08-05 08:43:11.323976+00	t	2026-07-29 08:43:11.323976+00
117	eRNNYaYbmDzkEnInd9S9ZgMkEF3jQaqLJU2rXKLqatw=	9	2026-08-05 13:21:53.662047+00	t	2026-07-29 13:21:53.662048+00
120	oLj2sKcPW2M3ZHfVRuajfJXVUpU84NwQdLK60oQPvnU=	9	2026-08-05 13:21:53.661997+00	t	2026-07-29 13:21:53.661998+00
121	F2VMnat9jVMiMY27FWu9D2f/Pis4E82dOGkIxO6tzS8=	9	2026-08-05 13:21:53.661894+00	t	2026-07-29 13:21:53.661895+00
125	GQlrR/zCV/8g1IYKhu3vDZ8DU+Lw8iS+V5OrrJbglIE=	9	2026-08-06 06:10:26.128504+00	t	2026-07-30 06:10:26.128504+00
165	g7/pVWCu1liqstapZp69FRMT0EEyX5Pt4R2oxpPzynk=	9	2026-08-12 07:01:05.898951+00	t	2026-08-05 07:01:05.898952+00
128	Orkrk7JkpJVJH0n45Ljgua0zouyoBqVaT2LfVEoNekw=	9	2026-08-06 06:31:11.489427+00	t	2026-07-30 06:31:11.489428+00
131	mIc9I1fKCw2qoC9wJ+rzJt/1qkzFO6S0hSVdJ4AsYbg=	9	2026-08-06 07:13:06.622912+00	t	2026-07-30 07:13:06.622913+00
134	X+00w7t1jLdNAnSFa/vCdzf8HWQNHocP1dyWBj4QqLk=	9	2026-08-06 08:09:23.631658+00	t	2026-07-30 08:09:23.631698+00
155	VwarSJ9JOda3F7ldXNQjAkwxugdKj//jLzp4vfcUUxQ=	9	2026-08-11 12:08:15.217002+00	t	2026-08-04 12:08:15.217002+00
137	5SZkDCYGrtM1UvwPLKodW8S4N4q/Ve1N/pPGX1zIsJ4=	9	2026-08-06 10:39:13.938746+00	t	2026-07-30 10:39:13.93876+00
143	SjyXOurIB7BXFyaMr66c4iaiTUDtaYOKal9QArCsBSc=	9	2026-08-10 10:18:15.688769+00	t	2026-08-03 10:18:15.688807+00
144	khcTGdncnYZ05PUk4Zhs0YYip4RfV6ohTv4YhYpYR2Q=	9	2026-08-10 10:18:21.57322+00	t	2026-08-03 10:18:21.57322+00
145	dt5m93/zhnldKOEfTXcCzJJmvCu/79U0TiyZue3NSO8=	9	2026-08-10 10:18:28.231414+00	t	2026-08-03 10:18:28.231414+00
146	2RonEUOw2GSWIBVVveo2Q91w4vJJHnQyfzxWmmNXISY=	9	2026-08-10 10:18:48.97137+00	t	2026-08-03 10:18:48.971371+00
147	c0A5282TtIbYqWHzF+PPVGSsJG2XZKi4ZOv0WCAe1UE=	9	2026-08-10 10:18:59.971478+00	t	2026-08-03 10:18:59.971479+00
148	99Xf5AHOMI1RorOzRt/G5Lbia+47w91H7ISwhjqhHVU=	9	2026-08-10 10:19:21.802753+00	t	2026-08-03 10:19:21.802753+00
152	aQB3KGlPhq9L57i1pBn4mhpDXLvEi6Zy9R2qZVLwk8M=	9	2026-08-11 12:08:15.215721+00	t	2026-08-04 12:08:15.215722+00
160	uMTUiNb9+x7zJ1BZrx05ezYf+MKz0lQ7itNz5rBo55g=	9	2026-08-12 06:54:10.707992+00	t	2026-08-05 06:54:10.707993+00
168	N56hbp1oPRujlDQXRCP93JWV0kW5QrCDpAzC9IYi88U=	9	2026-08-12 07:21:30.524035+00	t	2026-08-05 07:21:30.524036+00
171	C6Mtgc1PMkoBKd8WUVftOvnHuh0pI9nLnguMiaRahL8=	9	2026-08-12 10:09:43.963731+00	t	2026-08-05 10:09:43.963761+00
174	yFnSGs68ZONZU0iOdBKQiU+I69KEiAoydThfqIIdevA=	9	2026-08-12 10:56:24.166536+00	t	2026-08-05 10:56:24.166558+00
175	munsG2J5QAtFWaAiC6kIoyW1VGrIw7jbqLjxXbYJxrI=	9	2026-08-12 10:56:35.256845+00	t	2026-08-05 10:56:35.256846+00
179	YCGsOzd7EljSN0m8CZKpO+3fkNURLFh5IRCb9lzmFR8=	9	2026-08-12 11:19:23.941588+00	t	2026-08-05 11:19:23.941588+00
183	xkcn1jYlA+NRuXKe49NjBcdLGrVpVKaJg4m6gyMmKdg=	9	2026-08-12 12:18:35.660151+00	t	2026-08-05 12:18:35.660152+00
186	oDrQegtoo+KzzURXCryXAT8QoG1IB1mMyP93ZoDMSL8=	9	2026-08-12 13:19:46.720602+00	t	2026-08-05 13:19:46.720602+00
190	xo351FmsoCncBQrVgJZoMwy5rv1zs1LeXAoQeVlWs3M=	9	2026-08-13 05:45:58.713353+00	t	2026-08-06 05:45:58.713353+00
193	WGXsGGnlx2ueonjTHzbWpG8JIs+7hmMYh/cD3VaTYrE=	9	2026-08-13 05:45:58.713355+00	t	2026-08-06 05:45:58.713355+00
195	x1EoB7x7OIBLMg+r/91plDgx+rEAY0Tg5Q1zMO/lSjE=	9	2026-08-13 05:50:10.384224+00	t	2026-08-06 05:50:10.384224+00
198	Ih/Y6xOJUlUf7ziXkhajGcS0cvLrPoz5plG+p+NkEhk=	9	2026-08-13 06:10:32.444573+00	t	2026-08-06 06:10:32.444613+00
199	7ueJ8FQ+3kOqm9LMCCYZSSPNLWwZzvYWB6yrY2p4HaM=	9	2026-08-13 06:10:48.430372+00	t	2026-08-06 06:10:48.430372+00
200	mefxCAeY/g0QJqHoxpmwnwHRS3gGEyXQn30BPJ6mr7c=	9	2026-08-13 06:14:15.472927+00	t	2026-08-06 06:14:15.472927+00
201	1RPGMp93/4PDGA+UUQrQMM8lqMhD9xsSxJzt2D+lryM=	9	2026-08-13 06:14:23.743873+00	t	2026-08-06 06:14:23.743874+00
202	RDL+hxI5Mgm/vIy/4SPUz5oUolsS2PfTV6Zk9ykU8nA=	9	2026-08-13 06:14:53.330273+00	t	2026-08-06 06:14:53.330273+00
205	UqVXwvLBocSyoaTWnbxqjkIC1VmvGvHLPWNloMEGmtU=	9	2026-08-13 08:11:53.426974+00	t	2026-08-06 08:11:53.426975+00
214	LngreHkkm7ipzVn2hQbcxqgpHaqzi9mHdfD1k5DUqzs=	9	2026-08-13 12:15:55.184279+00	t	2026-08-06 12:15:55.18428+00
138	692kWyX0/sxI+FLLi6AeWkJEwDwbUw9sSpipXVaIFbw=	9	2026-08-06 12:31:50.38075+00	t	2026-07-30 12:31:50.380785+00
140	dgpCA9gNB9k7R3WpnRVe91PCu0QLDk5fmjj7+Efw5mo=	9	2026-08-07 06:32:28.314939+00	t	2026-07-31 06:32:28.314961+00
149	pwUuOwapemx0SjxicBb4PFYSMHYOwSXTg03z1ocqwCo=	9	2026-08-10 10:27:20.303177+00	t	2026-08-03 10:27:20.303198+00
150	w2SW9Ydl1lNfHYTZLvVaxH6x7pl4PXsGBrTrUZXZ4to=	9	2026-08-10 10:27:32.64366+00	t	2026-08-03 10:27:32.643661+00
153	1FJ6LlXX7XLzk6ryH34Ojy+HpXgH1lIeuZ0qmMkQN/c=	9	2026-08-11 12:08:15.215935+00	t	2026-08-04 12:08:15.215935+00
156	YBpzHbmJD2NyIMXTDF5jkEBPwbHcM/7KU9En2fiQaEk=	9	2026-08-11 12:51:04.171094+00	t	2026-08-04 12:51:04.171119+00
159	/G8EWSq1cpoq/kykIJxzdbgPZRCvmPuI23vqXblVQZM=	9	2026-08-12 06:54:10.707856+00	t	2026-08-05 06:54:10.707856+00
161	10vXjsgaLXcdoG/OGeU8Bu5Qcb2lB5BoxmvLldBkCo4=	9	2026-08-12 06:54:10.707887+00	t	2026-08-05 06:54:10.707888+00
162	tYVw1DmoeHZkvf2+7/W0rLJ4UkTJ4gfCFVMFAdfTHDA=	9	2026-08-12 06:55:32.571108+00	t	2026-08-05 06:55:32.571108+00
163	6P8aEaE7kge552Y9/0pBUS+QpOFu56fHoqpi7u4Lqfo=	9	2026-08-12 06:56:25.833087+00	t	2026-08-05 06:56:25.833087+00
164	ct+WQCqtG4gx23r0jjiLfpwoZhbijuCl4fHo2hUo8Fg=	9	2026-08-12 06:59:23.638905+00	t	2026-08-05 06:59:23.638912+00
166	0k5WhgJnhhFHEJhbfjPOtD/vFmKh0AiV91u86KFBsB0=	9	2026-08-12 07:01:16.495438+00	t	2026-08-05 07:01:16.495438+00
167	44p4Qbgdtgrq5eQnG0PNagsP+6NNi7tMsld5nHMFRiQ=	9	2026-08-12 07:09:39.128076+00	t	2026-08-05 07:09:39.128098+00
169	aZZGCuQDunqRLt6npahTwr4O3KOUHl7W3Cppm7vkric=	9	2026-08-12 08:09:40.70733+00	t	2026-08-05 08:09:40.707352+00
170	AtRTSJ0p17j3DuWRdFLIP7qg9xiLEaocMq8m3GicUrU=	9	2026-08-12 09:04:02.159392+00	t	2026-08-05 09:04:02.159414+00
172	Pb7LEwpYnECrmlUokW7TJr/1ykBpmLLscsFoqk9BDlE=	9	2026-08-12 10:16:50.4594+00	t	2026-08-05 10:16:50.459422+00
173	oybjj29GWehN1ey2RFoQsRdJc79YDfBRNFGWfsPpSTE=	9	2026-08-12 10:51:01.426736+00	t	2026-08-05 10:51:01.426758+00
176	2ux9+kjp02DnHYKq+8nWSON8nOIusNxqp0x+qZQnWA4=	9	2026-08-12 10:58:44.905011+00	t	2026-08-05 10:58:44.905033+00
177	f09W7CKNwSMfNMHL9craQssrnndDgYqU686f4Jv7aUY=	9	2026-08-12 10:59:18.751266+00	t	2026-08-05 10:59:18.751291+00
178	9LP6cEg2LLBtGENc8r4Pnu6cbqGM5VmFiIIJnr+8p00=	9	2026-08-12 10:59:45.820711+00	t	2026-08-05 10:59:45.820712+00
180	GPzrsPlIwJps3evpQpeHBV/TtKJvhrXDxHMCfCo5rfU=	9	2026-08-12 11:22:20.006891+00	t	2026-08-05 11:22:20.006914+00
181	5lORHLy0yfoOftLRsXl6uxl+rOFm2W07mmeIZE5bYV0=	9	2026-08-12 11:24:21.074374+00	t	2026-08-05 11:24:21.074374+00
184	Cnwj3KO4gRpNvd25OB0V9kG3cnpwj1IFCc5L2aOOUio=	9	2026-08-12 12:33:00.771784+00	t	2026-08-05 12:33:00.771806+00
185	krOgIbawgBzmWXDUzxpg7ii4j0o6Zd3Aiexkf484Yx0=	9	2026-08-12 12:58:03.932051+00	t	2026-08-05 12:58:03.932072+00
187	6hUoOQn9ZASZAwAQPUW6wWfADRNHfeBYy9hQtt5KhCo=	9	2026-08-12 13:35:36.689389+00	t	2026-08-05 13:35:36.689389+00
188	8D5+IMBXCT/Jyp1Czq54KOBpeLnw0wS2GHqApECpK9s=	9	2026-08-12 13:38:37.43782+00	t	2026-08-05 13:38:37.43782+00
189	gXtm1x63asGpaSOIJ4XD0lXvwINCmp6eKjtyznq9uMA=	9	2026-08-12 14:04:47.606249+00	t	2026-08-05 14:04:47.606271+00
191	pzUCmBkcV86kt1a6lbBQbXWYFN5+ACFYlVun3rXje7E=	9	2026-08-13 05:45:58.713361+00	t	2026-08-06 05:45:58.713361+00
192	2tGQfNeCBFKidsNPkiUWX/g3yhjD2koKvP+hM7qtZhQ=	9	2026-08-13 05:45:58.713515+00	t	2026-08-06 05:45:58.713515+00
194	o3nUbJrIUQlzWjo/TQcALvq3uQfALkK4aKfs2JU5aEs=	9	2026-08-13 05:45:58.713379+00	t	2026-08-06 05:45:58.713379+00
196	84y5NGKaHJoydzCJLyjxI+eZObwNak6POWp4pZbaUeY=	9	2026-08-13 06:02:22.101721+00	t	2026-08-06 06:02:22.101723+00
197	YSqD1wb37Ie26R6por4QvVNDcvwithrcoXO0ZCVlFyA=	9	2026-08-13 06:03:54.056966+00	t	2026-08-06 06:03:54.056966+00
203	DQUECyhVuCwUM1vLXY+WvD7x/Y2kjadaaXle32uRR2A=	9	2026-08-13 06:17:58.171185+00	t	2026-08-06 06:17:58.171211+00
204	dVnoPfBReM/ibk4O5Oiz63xKuZoue8J858E0T3jvekM=	9	2026-08-13 06:29:53.813765+00	t	2026-08-06 06:29:53.813789+00
206	oqqdKrA4k/6MKDjG1tBOIlQ7gXg30/tvDWJXnZwmb2o=	9	2026-08-13 08:32:39.423852+00	t	2026-08-06 08:32:39.423853+00
207	sDATGBe/qe5VrHBnw33xvtwET5rtuMAO9abJDjuUAMs=	9	2026-08-13 08:33:00.169917+00	t	2026-08-06 08:33:00.169917+00
208	MSisVG2QKiUANpvq55UQYcqv55vP4Fc7EMJwozQZL5c=	9	2026-08-13 10:17:24.596777+00	t	2026-08-06 10:17:24.596807+00
209	bj71c3ws92bgJriCDdy+iK/Ucejt4u1lHi718Wrg2sc=	9	2026-08-13 10:17:39.453453+00	t	2026-08-06 10:17:39.453454+00
210	LOHg0LrMgPRxvFxgoeHF8oWF3eVKrvHLSuX2iH6Gig8=	9	2026-08-13 10:17:55.926169+00	t	2026-08-06 10:17:55.926169+00
211	LZbjKl9j15W0OIH1wMNxu7gSQhsZP+BPylbqq+ZrB0c=	9	2026-08-13 10:18:11.269464+00	t	2026-08-06 10:18:11.269464+00
212	eXVw3A56a01P8Pb0vlBWSyIAqMn6lPGQoNWoYDqgBDA=	9	2026-08-13 11:22:24.132119+00	t	2026-08-06 11:22:24.132144+00
213	gWcLSA/PYZRO7uylg47ds4TuAllMiSe++AK3PT8hDL8=	9	2026-08-13 12:00:18.033434+00	t	2026-08-06 12:00:18.033435+00
215	5BqV89EB5ktPSSNJOTvkeG8b8vHvnvV8OSODDmY+Qwk=	9	2026-08-13 13:21:51.97159+00	t	2026-08-06 13:21:51.971612+00
216	obeqeoZUkvTR7/sp/SM/rRTfo2GaAkt1OegTlX1UpsE=	9	2026-08-13 13:21:53.779894+00	t	2026-08-06 13:21:53.779894+00
217	m3bZWx9LxV+1SmB/9eIyE+yXclO5wssrcjCW47K29L0=	9	2026-08-13 13:52:54.057307+00	t	2026-08-06 13:52:54.05733+00
218	F/wsMFZ1t9Mvn3cRrkOx//0LW/MbUjfQN7l1GOv8cDU=	9	2026-08-14 07:06:43.958769+00	t	2026-08-07 07:06:43.958769+00
219	wT8XdLPLb+y07PT+CTXQ4g9lpQoj2l4qA5ptB/iOp8k=	9	2026-08-14 07:36:26.103674+00	t	2026-08-07 07:36:26.103697+00
220	MsAwv1Ysd8xDM7NhrS2cNix5S+Td20QL9pQmuBhKfIc=	9	2026-08-14 07:36:28.179192+00	t	2026-08-07 07:36:28.179193+00
221	WlE6EmZsrvK9EkdESkUSqDoU5/y6bqUO/HX17/wd5+E=	9	2026-08-14 07:49:52.836476+00	t	2026-08-07 07:49:52.836498+00
222	Hz53PAvX87MtY3iMReVL69dkjWhqJk/yNWUPZiaVmA8=	9	2026-08-14 07:55:56.788462+00	t	2026-08-07 07:55:56.788484+00
223	bAy28vtgvlkdW0+tCoFAPImo8xa/iajNSookQ+qYygc=	9	2026-08-14 08:09:35.071789+00	t	2026-08-07 08:09:35.071811+00
224	W7QT/YGp7u3B83OXIc9Bml3iaymikyMs8lj/jbRioQU=	9	2026-08-14 08:11:28.869658+00	t	2026-08-07 08:11:28.86968+00
225	ND6KBOQ8tpmL64JOBiTMlYsjY0T0+NzbHWvIp09ZJYU=	9	2026-08-14 08:13:16.29354+00	t	2026-08-07 08:13:16.293541+00
226	Jx7ktFH8vqwkpALTwljWx0tLzqxYhQYTcrkE67GI8PQ=	9	2026-08-14 08:55:03.436748+00	t	2026-08-07 08:55:03.436795+00
227	DIWZCsb5otyWik0i0HtEIBR5OqXoXuFjpBp9cu+u7l0=	9	2026-08-14 08:55:03.436748+00	t	2026-08-07 08:55:03.436779+00
228	bavY9cx1T+daqxqVwPKnjmTcp5pVI6Rah13jZprjV0k=	9	2026-08-14 08:55:03.436746+00	t	2026-08-07 08:55:03.436767+00
229	tqb879S/ODdiNeuOMd1cOc2Wnyc3bohGczXOBvoHikA=	9	2026-08-14 08:55:03.436798+00	t	2026-08-07 08:55:03.436798+00
230	ehHbF9LmRt4iXeVDygbkNwVSUveeSCx44/slFv3YkT0=	9	2026-08-14 08:55:03.436778+00	t	2026-08-07 08:55:03.436778+00
231	cNe1ps0vaJZCreHYFdlZ280hRiy1k27OipTA0O4/px0=	9	2026-08-14 08:56:14.429023+00	t	2026-08-07 08:56:14.429024+00
232	O4ffiPSP5t0O36B/lzsjVB3xKhvvkDPakLQDXoKwjeM=	9	2026-08-14 08:56:48.521829+00	t	2026-08-07 08:56:48.52183+00
\.


--
-- Data for Name: StockMovements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StockMovements" ("Id", "ProductId", "TransactionType", "Quantity", "CreatedAt", "Description", "TransactionAmounth", "CreatedByUserId") FROM stdin;
1	1	IN	62	2026-06-01 16:00:00+00	İlk stok girişi	3871900	\N
2	1	IN	36	2026-07-22 18:00:00+00	Tedarikçiden ek stok girişi	2248200	\N
7	3	IN	150	2026-06-04 09:00:00+00	İlk stok girişi	11249850	\N
8	3	IN	33	2026-06-25 18:00:00+00	Tedarikçiden ek stok girişi	2474967	\N
9	3	IN	12	2026-07-13 11:00:00+00	Tedarikçiden ek stok girişi	899988	\N
10	3	IN	15	2026-07-19 11:00:00+00	Tedarikçiden ek stok girişi	1124985	\N
11	4	IN	134	2026-06-06 13:00:00+00	İlk stok girişi	4421866	\N
12	4	OUT	9	2026-06-30 13:00:00+00	Satış çıkışı	323991	\N
13	5	IN	51	2026-06-02 10:00:00+00	İlk stok girişi	509949	\N
14	5	IN	50	2026-07-01 12:00:00+00	Tedarikçiden ek stok girişi	499950	\N
15	5	OUT	6	2026-07-21 16:00:00+00	Satış çıkışı	68994	\N
16	6	IN	43	2026-06-04 12:00:00+00	İlk stok girişi	2106957	\N
17	6	IN	30	2026-06-20 17:00:00+00	Tedarikçiden ek stok girişi	1469970	\N
18	7	IN	123	2026-06-06 15:00:00+00	İlk stok girişi	2705877	\N
19	7	OUT	18	2026-06-23 10:00:00+00	Satış çıkışı	440982	\N
20	8	IN	290	2026-06-04 13:00:00+00	İlk stok girişi	8119710	\N
21	8	OUT	2	2026-06-15 16:00:00+00	Satış çıkışı	61998	\N
22	9	IN	71	2026-06-04 17:00:00+00	İlk stok girişi	461429	\N
23	9	OUT	15	2026-07-01 14:00:00+00	Satış çıkışı	112485	\N
24	10	IN	285	2026-06-01 18:00:00+00	İlk stok girişi	2849715	\N
25	10	IN	58	2026-06-14 18:00:00+00	Tedarikçiden ek stok girişi	579942	\N
26	10	OUT	10	2026-06-24 18:00:00+00	Satış çıkışı	119990	\N
27	10	OUT	9	2026-07-04 10:00:00+00	Satış çıkışı	107991	\N
32	12	IN	72	2026-06-02 17:00:00+00	İlk stok girişi	647928	\N
33	12	IN	58	2026-06-12 15:00:00+00	Tedarikçiden ek stok girişi	521942	\N
34	13	IN	287	2026-06-05 10:00:00+00	İlk stok girişi	372813	\N
35	13	OUT	7	2026-07-10 17:00:00+00	Satış çıkışı	11193	\N
36	13	IN	35	2026-07-11 11:00:00+00	Tedarikçiden ek stok girişi	45465	\N
37	14	IN	206	2026-06-02 11:00:00+00	İlk stok girişi	576594	\N
38	14	OUT	8	2026-06-28 08:00:00+00	Satış çıkışı	26392	\N
39	15	IN	127	2026-06-01 11:00:00+00	İlk stok girişi	507873	\N
40	15	OUT	8	2026-06-09 13:00:00+00	Satış çıkışı	36792	\N
41	16	IN	157	2026-06-02 17:00:00+00	İlk stok girişi	470843	\N
42	16	IN	36	2026-07-07 11:00:00+00	Tedarikçiden ek stok girişi	107964	\N
43	16	OUT	14	2026-06-19 09:00:00+00	Satış çıkışı	48986	\N
44	16	OUT	2	2026-06-29 14:00:00+00	Satış çıkışı	6998	\N
45	17	IN	65	2026-06-01 11:00:00+00	İlk stok girişi	149435	\N
46	17	OUT	14	2026-06-19 16:00:00+00	Satış çıkışı	37786	\N
47	18	IN	108	2026-06-01 15:00:00+00	İlk stok girişi	1403892	\N
48	18	IN	44	2026-06-13 08:00:00+00	Tedarikçiden ek stok girişi	571956	\N
49	18	IN	58	2026-07-30 08:00:00+00	Tedarikçiden ek stok girişi	753942	\N
50	18	OUT	16	2026-07-31 11:00:00+00	Satış çıkışı	231984	\N
51	19	IN	261	2026-06-02 14:00:00+00	İlk stok girişi	7046739	\N
52	19	IN	60	2026-07-01 12:00:00+00	Tedarikçiden ek stok girişi	1619940	\N
53	20	IN	247	2026-06-06 16:00:00+00	İlk stok girişi	8150753	\N
54	20	OUT	10	2026-07-22 15:00:00+00	Satış çıkışı	369990	\N
55	20	OUT	18	2026-06-20 08:00:00+00	Satış çıkışı	665982	\N
56	20	OUT	19	2026-06-10 13:00:00+00	Satış çıkışı	702981	\N
57	21	IN	259	2026-06-05 09:00:00+00	İlk stok girişi	11654741	\N
58	21	OUT	8	2026-06-11 17:00:00+00	Satış çıkışı	391992	\N
59	22	IN	221	2026-06-01 17:00:00+00	İlk stok girişi	12154779	\N
60	22	OUT	17	2026-07-03 18:00:00+00	Satış çıkışı	1019983	\N
61	23	IN	176	2026-06-03 11:00:00+00	İlk stok girişi	6863824	\N
62	23	IN	29	2026-07-02 10:00:00+00	Tedarikçiden ek stok girişi	1130971	\N
63	23	IN	14	2026-07-06 13:00:00+00	Tedarikçiden ek stok girişi	545986	\N
64	24	IN	19	2026-06-02 16:00:00+00	İlk stok girişi	170981	\N
65	24	IN	25	2026-06-15 13:00:00+00	Tedarikçiden ek stok girişi	224975	\N
66	24	OUT	3	2026-06-30 12:00:00+00	Satış çıkışı	29997	\N
67	25	IN	285	2026-06-06 09:00:00+00	İlk stok girişi	712215	\N
68	25	IN	57	2026-06-23 09:00:00+00	Tedarikçiden ek stok girişi	142443	\N
69	26	IN	298	2026-06-02 13:00:00+00	İlk stok girişi	43210	\N
70	26	IN	42	2026-07-20 18:00:00+00	Tedarikçiden ek stok girişi	6090	\N
71	27	IN	265	2026-06-04 12:00:00+00	İlk stok girişi	43725	\N
72	27	IN	50	2026-06-07 13:00:00+00	Tedarikçiden ek stok girişi	8250	\N
73	28	IN	149	2026-06-04 16:00:00+00	İlk stok girişi	23095	\N
74	28	IN	54	2026-06-14 09:00:00+00	Tedarikçiden ek stok girişi	8370	\N
75	29	IN	91	2026-06-02 14:00:00+00	İlk stok girişi	8645	\N
76	29	OUT	2	2026-06-09 12:00:00+00	Satış çıkışı	238	\N
77	30	IN	198	2026-06-03 16:00:00+00	İlk stok girişi	34650	\N
78	30	IN	25	2026-07-16 10:00:00+00	Tedarikçiden ek stok girişi	4375	\N
79	30	IN	11	2026-06-17 10:00:00+00	Tedarikçiden ek stok girişi	1925	\N
80	31	IN	106	2026-06-06 11:00:00+00	İlk stok girişi	22260	\N
81	31	OUT	2	2026-06-17 09:00:00+00	Satış çıkışı	498	\N
82	31	OUT	15	2026-07-31 15:00:00+00	Satış çıkışı	3735	\N
83	32	IN	194	2026-06-06 11:00:00+00	İlk stok girişi	16490	\N
84	32	IN	59	2026-06-28 12:00:00+00	Tedarikçiden ek stok girişi	5015	\N
85	32	IN	35	2026-06-24 13:00:00+00	Tedarikçiden ek stok girişi	2975	\N
86	33	IN	289	2026-06-03 10:00:00+00	İlk stok girişi	46240	\N
87	33	OUT	14	2026-06-23 08:00:00+00	Satış çıkışı	2730	\N
88	33	OUT	17	2026-06-29 13:00:00+00	Satış çıkışı	3315	\N
89	33	IN	22	2026-06-14 14:00:00+00	Tedarikçiden ek stok girişi	3520	\N
90	34	IN	145	2026-06-05 18:00:00+00	İlk stok girişi	41325	\N
91	34	OUT	14	2026-07-24 18:00:00+00	Satış çıkışı	4886	\N
92	34	IN	49	2026-06-11 18:00:00+00	Tedarikçiden ek stok girişi	13965	\N
93	34	IN	56	2026-06-27 18:00:00+00	Tedarikçiden ek stok girişi	15960	\N
94	35	IN	168	2026-06-06 12:00:00+00	İlk stok girişi	32760	\N
95	35	OUT	13	2026-06-15 11:00:00+00	Satış çıkışı	3107	\N
96	35	IN	29	2026-07-20 10:00:00+00	Tedarikçiden ek stok girişi	5655	\N
97	35	IN	29	2026-07-02 16:00:00+00	Tedarikçiden ek stok girişi	5655	\N
98	36	IN	161	2026-06-05 18:00:00+00	İlk stok girişi	45080	\N
99	36	OUT	7	2026-07-06 15:00:00+00	Satış çıkışı	2373	\N
100	36	IN	60	2026-07-09 15:00:00+00	Tedarikçiden ek stok girişi	16800	\N
101	37	IN	101	2026-06-06 17:00:00+00	İlk stok girişi	24745	\N
102	37	IN	24	2026-06-12 11:00:00+00	Tedarikçiden ek stok girişi	5880	\N
103	37	OUT	2	2026-07-28 11:00:00+00	Satış çıkışı	578	\N
104	38	IN	140	2026-06-06 17:00:00+00	İlk stok girişi	26600	\N
105	38	OUT	8	2026-07-22 14:00:00+00	Satış çıkışı	1832	\N
106	39	IN	90	2026-06-02 10:00:00+00	İlk stok girişi	15750	\N
107	39	OUT	8	2026-07-10 15:00:00+00	Satış çıkışı	1672	\N
108	39	OUT	15	2026-07-31 09:00:00+00	Satış çıkışı	3135	\N
109	39	IN	48	2026-07-19 16:00:00+00	Tedarikçiden ek stok girişi	8400	\N
110	40	IN	177	2026-06-05 15:00:00+00	İlk stok girişi	42480	\N
111	40	OUT	8	2026-07-24 15:00:00+00	Satış çıkışı	2232	\N
112	41	IN	156	2026-06-01 12:00:00+00	İlk stok girişi	29640	\N
113	41	OUT	18	2026-06-24 13:00:00+00	Satış çıkışı	4122	\N
114	42	IN	56	2026-06-06 10:00:00+00	İlk stok girişi	11760	\N
115	42	OUT	6	2026-06-20 09:00:00+00	Satış çıkışı	1494	\N
116	42	OUT	4	2026-07-11 15:00:00+00	Satış çıkışı	996	\N
117	42	OUT	13	2026-07-30 14:00:00+00	Satış çıkışı	3237	\N
118	43	IN	25	2026-06-03 12:00:00+00	İlk stok girişi	2375	\N
119	43	OUT	6	2026-07-31 14:00:00+00	Satış çıkışı	774	\N
120	43	IN	41	2026-07-11 17:00:00+00	Tedarikçiden ek stok girişi	3895	\N
121	44	IN	127	2026-06-04 13:00:00+00	İlk stok girişi	5715	\N
122	44	IN	39	2026-07-20 14:00:00+00	Tedarikçiden ek stok girişi	1755	\N
123	44	OUT	13	2026-06-15 17:00:00+00	Satış çıkışı	897	\N
124	44	IN	15	2026-07-14 17:00:00+00	Tedarikçiden ek stok girişi	675	\N
125	45	IN	234	2026-06-03 14:00:00+00	İlk stok girişi	25740	\N
126	45	OUT	13	2026-06-20 15:00:00+00	Satış çıkışı	1937	\N
127	45	OUT	3	2026-06-24 14:00:00+00	Satış çıkışı	447	\N
128	46	IN	255	2026-06-03 11:00:00+00	İlk stok girişi	8925	\N
129	46	OUT	1	2026-06-11 18:00:00+00	Satış çıkışı	49	\N
130	46	IN	49	2026-06-22 11:00:00+00	Tedarikçiden ek stok girişi	1715	\N
131	46	OUT	4	2026-06-16 11:00:00+00	Satış çıkışı	196	\N
132	47	IN	126	2026-06-02 17:00:00+00	İlk stok girişi	6930	\N
133	47	IN	20	2026-07-24 09:00:00+00	Tedarikçiden ek stok girişi	1100	\N
134	47	OUT	10	2026-06-26 09:00:00+00	Satış çıkışı	790	\N
135	47	IN	34	2026-07-13 18:00:00+00	Tedarikçiden ek stok girişi	1870	\N
136	48	IN	218	2026-06-06 11:00:00+00	İlk stok girişi	35970	\N
137	48	IN	48	2026-07-21 12:00:00+00	Tedarikçiden ek stok girişi	7920	\N
138	49	IN	76	2026-06-06 13:00:00+00	İlk stok girişi	341924	\N
139	49	OUT	14	2026-07-09 18:00:00+00	Satış çıkışı	69986	\N
140	50	IN	265	2026-06-06 15:00:00+00	İlk stok girişi	582735	\N
141	50	OUT	17	2026-06-16 14:00:00+00	Satış çıkışı	42483	\N
142	50	IN	44	2026-07-18 12:00:00+00	Tedarikçiden ek stok girişi	96756	\N
143	50	OUT	19	2026-07-26 15:00:00+00	Satış çıkışı	47481	\N
144	51	IN	152	2026-06-01 12:00:00+00	İlk stok girişi	136648	\N
145	51	OUT	13	2026-06-22 15:00:00+00	Satış çıkışı	14287	\N
146	51	OUT	11	2026-06-28 08:00:00+00	Satış çıkışı	12089	\N
147	52	IN	108	2026-06-03 13:00:00+00	İlk stok girişi	593892	\N
148	52	OUT	17	2026-07-15 12:00:00+00	Satış çıkışı	101983	\N
149	52	OUT	14	2026-06-19 09:00:00+00	Satış çıkışı	83986	\N
150	53	IN	265	2026-06-04 15:00:00+00	İlk stok girişi	4239735	\N
151	53	OUT	8	2026-06-12 12:00:00+00	Satış çıkışı	143992	\N
152	54	IN	171	2026-06-03 14:00:00+00	İlk stok girişi	136629	\N
153	54	OUT	15	2026-07-12 13:00:00+00	Satış çıkışı	14235	\N
154	54	OUT	4	2026-06-24 12:00:00+00	Satış çıkışı	3796	\N
155	54	OUT	18	2026-07-23 11:00:00+00	Satış çıkışı	17082	\N
156	55	IN	109	2026-06-03 17:00:00+00	İlk stok girişi	15805	\N
157	55	IN	22	2026-07-15 12:00:00+00	Tedarikçiden ek stok girişi	3190	\N
158	55	OUT	10	2026-06-25 11:00:00+00	Satış çıkışı	1790	\N
159	55	OUT	2	2026-06-07 16:00:00+00	Satış çıkışı	358	\N
160	56	IN	42	2026-06-04 09:00:00+00	İlk stok girişi	3738	\N
161	56	OUT	8	2026-07-13 12:00:00+00	Satış çıkışı	872	\N
162	57	IN	189	2026-06-04 09:00:00+00	İlk stok girişi	16821	\N
163	57	OUT	2	2026-07-02 15:00:00+00	Satış çıkışı	218	\N
164	58	IN	92	2026-06-02 09:00:00+00	İlk stok girişi	22908	\N
165	58	IN	60	2026-07-25 14:00:00+00	Tedarikçiden ek stok girişi	14940	\N
166	58	IN	34	2026-07-16 11:00:00+00	Tedarikçiden ek stok girişi	8466	\N
167	58	OUT	19	2026-07-05 15:00:00+00	Satış çıkışı	5491	\N
168	59	IN	234	2026-06-06 09:00:00+00	İlk stok girişi	15210	\N
169	59	OUT	3	2026-07-17 11:00:00+00	Satış çıkışı	237	\N
170	60	IN	95	2026-06-02 08:00:00+00	İlk stok girişi	7505	\N
171	60	OUT	2	2026-07-05 17:00:00+00	Satış çıkışı	190	\N
172	60	IN	54	2026-06-21 12:00:00+00	Tedarikçiden ek stok girişi	4266	\N
173	61	IN	247	2026-06-06 17:00:00+00	İlk stok girişi	17043	\N
174	61	OUT	18	2026-07-28 11:00:00+00	Satış çıkışı	1530	\N
175	61	OUT	9	2026-06-21 18:00:00+00	Satış çıkışı	765	\N
176	61	OUT	6	2026-07-29 10:00:00+00	Satış çıkışı	510	\N
177	62	IN	172	2026-06-06 12:00:00+00	İlk stok girişi	10148	\N
178	62	OUT	16	2026-07-02 12:00:00+00	Satış çıkışı	1200	\N
179	62	OUT	14	2026-07-05 09:00:00+00	Satış çıkışı	1050	\N
180	62	IN	11	2026-07-24 13:00:00+00	Tedarikçiden ek stok girişi	649	\N
181	63	IN	61	2026-06-06 12:00:00+00	İlk stok girişi	21289	\N
182	63	OUT	11	2026-06-09 10:00:00+00	Satış çıkışı	4389	\N
183	63	OUT	10	2026-07-05 12:00:00+00	Satış çıkışı	3990	\N
184	63	IN	15	2026-07-04 18:00:00+00	Tedarikçiden ek stok girişi	5235	\N
185	64	IN	255	2026-06-06 09:00:00+00	İlk stok girişi	36975	\N
186	64	IN	28	2026-06-28 14:00:00+00	Tedarikçiden ek stok girişi	4060	\N
187	65	IN	220	2026-06-03 13:00:00+00	İlk stok girişi	84700	\N
188	65	IN	10	2026-07-26 14:00:00+00	Tedarikçiden ek stok girişi	3850	\N
189	66	IN	292	2026-06-05 13:00:00+00	İlk stok girişi	87308	\N
190	66	IN	58	2026-07-25 15:00:00+00	Tedarikçiden ek stok girişi	17342	\N
191	66	OUT	5	2026-06-10 11:00:00+00	Satış çıkışı	1745	\N
192	66	IN	41	2026-06-25 15:00:00+00	Tedarikçiden ek stok girişi	12259	\N
193	67	IN	77	2026-06-03 16:00:00+00	İlk stok girişi	26873	\N
194	67	OUT	4	2026-07-12 14:00:00+00	Satış çıkışı	1796	\N
195	68	IN	251	2026-06-06 12:00:00+00	İlk stok girişi	24849	\N
196	68	OUT	16	2026-07-22 12:00:00+00	Satış çıkışı	2384	\N
197	68	OUT	5	2026-07-07 11:00:00+00	Satış çıkışı	745	\N
198	68	IN	42	2026-07-01 11:00:00+00	Tedarikçiden ek stok girişi	4158	\N
199	69	IN	84	2026-06-04 13:00:00+00	İlk stok girişi	16716	\N
200	69	OUT	10	2026-06-24 08:00:00+00	Satış çıkışı	2690	\N
201	69	OUT	16	2026-07-30 17:00:00+00	Satış çıkışı	4304	\N
202	69	OUT	12	2026-06-16 15:00:00+00	Satış çıkışı	3228	\N
203	70	IN	185	2026-06-02 11:00:00+00	İlk stok girişi	110815	\N
204	70	IN	36	2026-07-01 11:00:00+00	Tedarikçiden ek stok girişi	21564	\N
205	70	IN	55	2026-06-09 13:00:00+00	Tedarikçiden ek stok girişi	32945	\N
206	70	OUT	5	2026-07-28 14:00:00+00	Satış çıkışı	3995	\N
207	71	IN	268	2026-06-05 13:00:00+00	İlk stok girişi	120332	\N
208	71	OUT	15	2026-07-31 15:00:00+00	Satış çıkışı	8985	\N
209	72	IN	22	2026-06-02 09:00:00+00	İlk stok girişi	12078	\N
210	72	OUT	4	2026-07-27 12:00:00+00	Satış çıkışı	2916	\N
211	72	IN	53	2026-07-18 09:00:00+00	Tedarikçiden ek stok girişi	29097	\N
212	73	IN	288	2026-06-04 16:00:00+00	İlk stok girişi	201312	\N
213	73	OUT	10	2026-07-16 09:00:00+00	Satış çıkışı	8990	\N
214	74	IN	131	2026-06-06 09:00:00+00	İlk stok girişi	71919	\N
215	74	IN	12	2026-06-17 12:00:00+00	Tedarikçiden ek stok girişi	6588	\N
216	74	OUT	12	2026-06-27 08:00:00+00	Satış çıkışı	8388	\N
217	75	IN	235	2026-06-05 18:00:00+00	İlk stok girişi	58515	\N
218	75	OUT	13	2026-06-17 10:00:00+00	Satış çıkışı	4277	\N
219	76	IN	138	2026-06-06 12:00:00+00	İlk stok girişi	41262	\N
220	76	OUT	15	2026-06-23 18:00:00+00	Satış çıkışı	5985	\N
221	76	OUT	3	2026-06-25 18:00:00+00	Satış çıkışı	1197	\N
222	77	IN	241	2026-06-04 12:00:00+00	İlk stok girişi	47959	\N
223	77	OUT	13	2026-07-31 12:00:00+00	Satış çıkışı	3367	\N
224	77	OUT	13	2026-07-31 15:00:00+00	Satış çıkışı	3367	\N
225	78	IN	198	2026-06-06 14:00:00+00	İlk stok girişi	88902	\N
226	78	IN	59	2026-06-07 17:00:00+00	Tedarikçiden ek stok girişi	26491	\N
227	78	IN	57	2026-07-24 08:00:00+00	Tedarikçiden ek stok girişi	25593	\N
228	79	IN	269	2026-06-03 11:00:00+00	İlk stok girişi	806731	\N
229	79	OUT	5	2026-06-19 17:00:00+00	Satış çıkışı	18495	\N
230	79	IN	51	2026-07-17 09:00:00+00	Tedarikçiden ek stok girişi	152949	\N
231	79	IN	12	2026-06-09 12:00:00+00	Tedarikçiden ek stok girişi	35988	\N
232	80	IN	201	2026-06-03 14:00:00+00	İlk stok girişi	50049	\N
233	80	IN	33	2026-06-19 10:00:00+00	Tedarikçiden ek stok girişi	8217	\N
234	81	IN	286	2026-06-04 12:00:00+00	İlk stok girişi	1429714	\N
235	81	OUT	3	2026-06-28 09:00:00+00	Satış çıkışı	17997	\N
236	81	IN	56	2026-06-16 11:00:00+00	Tedarikçiden ek stok girişi	279944	\N
237	81	IN	45	2026-07-20 14:00:00+00	Tedarikçiden ek stok girişi	224955	\N
238	82	IN	202	2026-06-05 09:00:00+00	İlk stok girişi	383598	\N
239	82	IN	26	2026-06-30 18:00:00+00	Tedarikçiden ek stok girişi	49374	\N
240	82	IN	33	2026-07-14 14:00:00+00	Tedarikçiden ek stok girişi	62667	\N
241	83	IN	70	2026-06-05 13:00:00+00	İlk stok girişi	174930	\N
242	83	OUT	15	2026-06-21 18:00:00+00	Satış çıkışı	44985	\N
243	83	IN	17	2026-07-21 12:00:00+00	Tedarikçiden ek stok girişi	42483	\N
244	83	IN	29	2026-06-15 08:00:00+00	Tedarikçiden ek stok girişi	72471	\N
245	84	IN	267	2026-06-05 10:00:00+00	İlk stok girişi	3470733	\N
246	84	IN	57	2026-07-06 13:00:00+00	Tedarikçiden ek stok girişi	740943	\N
247	84	OUT	5	2026-07-21 16:00:00+00	Satış çıkışı	79995	\N
248	85	IN	227	2026-06-03 08:00:00+00	İlk stok girişi	5674773	\N
249	85	OUT	8	2026-06-30 11:00:00+00	Satış çıkışı	239992	\N
250	85	OUT	12	2026-07-31 13:00:00+00	Satış çıkışı	359988	\N
251	85	OUT	13	2026-07-11 18:00:00+00	Satış çıkışı	389987	\N
252	86	IN	156	2026-06-04 09:00:00+00	İlk stok girişi	2963844	\N
253	86	IN	11	2026-06-20 18:00:00+00	Tedarikçiden ek stok girişi	208989	\N
254	86	OUT	5	2026-06-10 13:00:00+00	Satış çıkışı	114995	\N
255	86	OUT	18	2026-07-27 17:00:00+00	Satış çıkışı	413982	\N
256	87	IN	121	2026-06-02 17:00:00+00	İlk stok girişi	1088879	\N
257	87	IN	44	2026-06-24 10:00:00+00	Tedarikçiden ek stok girişi	395956	\N
258	88	IN	143	2026-06-01 10:00:00+00	İlk stok girişi	857857	\N
259	88	OUT	1	2026-06-29 11:00:00+00	Satış çıkışı	7499	\N
260	89	IN	104	2026-06-04 16:00:00+00	İlk stok girişi	1039896	\N
261	89	OUT	12	2026-07-24 09:00:00+00	Satış çıkışı	143988	\N
262	90	IN	277	2026-06-05 08:00:00+00	İlk stok girişi	40165	\N
263	90	OUT	15	2026-07-27 18:00:00+00	Satış çıkışı	2685	\N
264	90	OUT	16	2026-07-18 08:00:00+00	Satış çıkışı	2864	\N
265	90	OUT	4	2026-07-31 14:00:00+00	Satış çıkışı	716	\N
266	91	IN	266	2026-06-03 17:00:00+00	İlk stok girişi	92834	\N
267	91	OUT	19	2026-06-11 10:00:00+00	Satış çıkışı	8151	\N
268	92	IN	295	2026-06-05 12:00:00+00	İlk stok girişi	38055	\N
269	92	OUT	4	2026-07-09 17:00:00+00	Satış çıkışı	636	\N
270	92	IN	59	2026-07-31 18:00:00+00	Tedarikçiden ek stok girişi	7611	\N
271	93	IN	297	2026-06-02 14:00:00+00	İlk stok girişi	26433	\N
272	93	OUT	4	2026-07-29 15:00:00+00	Satış çıkışı	436	\N
273	93	OUT	9	2026-06-27 14:00:00+00	Satış çıkışı	981	\N
274	94	IN	206	2026-06-01 09:00:00+00	İlk stok girişi	20394	\N
275	94	IN	45	2026-06-13 13:00:00+00	Tedarikçiden ek stok girişi	4455	\N
276	94	IN	45	2026-06-10 17:00:00+00	Tedarikçiden ek stok girişi	4455	\N
277	95	IN	183	2026-06-06 14:00:00+00	İlk stok girişi	24705	\N
278	95	IN	32	2026-06-10 12:00:00+00	Tedarikçiden ek stok girişi	4320	\N
279	95	OUT	5	2026-06-13 17:00:00+00	Satış çıkışı	825	\N
280	95	OUT	4	2026-07-19 15:00:00+00	Satış çıkışı	660	\N
281	96	IN	194	2026-06-05 11:00:00+00	İlk stok girişi	12610	\N
282	96	IN	49	2026-07-31 16:00:00+00	Tedarikçiden ek stok girişi	3185	\N
283	96	IN	11	2026-07-16 18:00:00+00	Tedarikçiden ek stok girişi	715	\N
284	97	IN	151	2026-06-03 13:00:00+00	İlk stok girişi	6795	\N
285	97	IN	46	2026-06-07 10:00:00+00	Tedarikçiden ek stok girişi	2070	\N
286	97	OUT	1	2026-07-19 14:00:00+00	Satış çıkışı	65	\N
287	98	IN	61	2026-06-03 10:00:00+00	İlk stok girişi	17629	\N
288	98	IN	46	2026-06-26 13:00:00+00	Tedarikçiden ek stok girişi	13294	\N
289	98	IN	19	2026-07-15 09:00:00+00	Tedarikçiden ek stok girişi	5491	\N
290	99	IN	95	2026-06-06 14:00:00+00	İlk stok girişi	18905	\N
291	99	OUT	7	2026-07-15 15:00:00+00	Satış çıkışı	1743	\N
292	99	OUT	14	2026-07-25 16:00:00+00	Satış çıkışı	3486	\N
293	1	IN	12	2026-08-02 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20001	63.00	9
295	3	OUT	34	2026-07-30 21:00:57.34311+00	Satış çıkışı - Sipariş #10003	169.00	9
296	4	IN	45	2026-07-29 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20004	222.00	1
297	5	IN	56	2026-07-27 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20005	275.00	9
298	6	OUT	67	2026-07-26 06:00:57.34311+00	Satış çıkışı - Sipariş #10006	328.00	1
299	7	IN	78	2026-07-24 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20007	381.00	9
300	8	IN	89	2026-07-23 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20008	434.00	1
301	9	OUT	100	2026-07-21 15:00:57.34311+00	Satış çıkışı - Sipariş #10009	487.00	9
302	10	IN	111	2026-07-20 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20010	540.00	1
304	12	OUT	133	2026-07-17 00:00:57.34311+00	Satış çıkışı - Sipariş #10012	646.00	1
305	13	IN	144	2026-07-15 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20013	699.00	9
306	14	IN	155	2026-07-13 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20014	752.00	1
307	15	OUT	166	2026-07-12 09:00:57.34311+00	Satış çıkışı - Sipariş #10015	805.00	9
308	16	IN	177	2026-07-10 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20016	858.00	1
309	17	IN	188	2026-07-09 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20017	911.00	9
310	18	OUT	199	2026-07-07 18:00:57.34311+00	Satış çıkışı - Sipariş #10018	964.00	1
311	19	IN	10	2026-07-06 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20019	1017.00	9
312	20	IN	21	2026-07-04 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20020	1070.00	1
313	21	OUT	32	2026-07-03 03:00:57.34311+00	Satış çıkışı - Sipariş #10021	1123.00	9
314	22	IN	43	2026-07-01 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20022	1176.00	1
315	23	IN	54	2026-06-30 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20023	1229.00	9
316	24	OUT	65	2026-06-28 12:00:57.34311+00	Satış çıkışı - Sipariş #10024	1282.00	1
317	25	IN	76	2026-06-26 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20025	1335.00	9
318	26	IN	87	2026-06-25 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20026	1388.00	1
319	27	OUT	98	2026-06-23 21:00:57.34311+00	Satış çıkışı - Sipariş #10027	1441.00	9
320	28	IN	109	2026-06-22 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20028	1494.00	1
321	29	IN	120	2026-06-20 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20029	1547.00	9
322	30	OUT	131	2026-06-19 06:00:57.34311+00	Satış çıkışı - Sipariş #10030	1600.00	1
323	31	IN	142	2026-06-17 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20031	1653.00	9
324	32	IN	153	2026-06-16 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20032	1706.00	1
325	33	OUT	164	2026-06-14 15:00:57.34311+00	Satış çıkışı - Sipariş #10033	1759.00	9
326	34	IN	175	2026-06-13 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20034	1812.00	1
327	35	IN	186	2026-06-11 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20035	1865.00	9
328	36	OUT	197	2026-06-10 00:00:57.34311+00	Satış çıkışı - Sipariş #10036	1918.00	1
329	37	IN	8	2026-06-08 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20037	1971.00	9
330	38	IN	19	2026-06-06 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20038	2024.00	1
331	39	OUT	30	2026-06-05 09:00:57.34311+00	Satış çıkışı - Sipariş #10039	2077.00	9
332	40	IN	41	2026-06-03 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20040	2130.00	1
333	41	IN	52	2026-06-02 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20041	2183.00	9
334	42	OUT	63	2026-05-31 18:00:57.34311+00	Satış çıkışı - Sipariş #10042	2236.00	1
335	43	IN	74	2026-05-30 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20043	2289.00	9
336	44	IN	85	2026-05-28 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20044	2342.00	1
337	45	OUT	96	2026-05-27 03:00:57.34311+00	Satış çıkışı - Sipariş #10045	2395.00	9
338	46	IN	107	2026-05-25 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20046	2448.00	1
339	47	IN	118	2026-05-24 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20047	2501.00	9
340	48	OUT	129	2026-05-22 12:00:57.34311+00	Satış çıkışı - Sipariş #10048	2554.00	1
341	49	IN	140	2026-05-20 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20049	2607.00	9
342	50	IN	151	2026-05-19 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20050	2660.00	1
343	51	OUT	162	2026-05-17 21:00:57.34311+00	Satış çıkışı - Sipariş #10051	2713.00	9
344	52	IN	173	2026-05-16 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20052	2766.00	1
345	53	IN	184	2026-05-14 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20053	2819.00	9
346	54	OUT	195	2026-05-13 06:00:57.34311+00	Satış çıkışı - Sipariş #10054	2872.00	1
347	55	IN	6	2026-05-11 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20055	2925.00	9
348	56	IN	17	2026-05-10 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20056	2978.00	1
349	57	OUT	28	2026-05-08 15:00:57.34311+00	Satış çıkışı - Sipariş #10057	3031.00	9
350	58	IN	39	2026-05-07 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20058	3084.00	1
351	59	IN	50	2026-05-05 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20059	3137.00	9
352	60	OUT	61	2026-05-04 00:00:57.34311+00	Satış çıkışı - Sipariş #10060	3190.00	1
353	61	IN	72	2026-05-02 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20061	3243.00	9
354	62	IN	83	2026-04-30 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20062	3296.00	1
355	63	OUT	94	2026-04-29 09:00:57.34311+00	Satış çıkışı - Sipariş #10063	3349.00	9
356	64	IN	105	2026-04-27 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20064	3402.00	1
357	65	IN	116	2026-04-26 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20065	3455.00	9
358	66	OUT	127	2026-04-24 18:00:57.34311+00	Satış çıkışı - Sipariş #10066	3508.00	1
359	67	IN	138	2026-04-23 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20067	3561.00	9
360	68	IN	149	2026-04-21 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20068	3614.00	1
361	69	OUT	160	2026-04-20 03:00:57.34311+00	Satış çıkışı - Sipariş #10069	3667.00	9
362	70	IN	171	2026-04-18 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20070	3720.00	1
363	71	IN	182	2026-04-17 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20071	3773.00	9
364	72	OUT	193	2026-04-15 12:00:57.34311+00	Satış çıkışı - Sipariş #10072	3826.00	1
365	73	IN	4	2026-04-13 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20073	3879.00	9
366	74	IN	15	2026-04-12 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20074	3932.00	1
367	75	OUT	26	2026-04-10 21:00:57.34311+00	Satış çıkışı - Sipariş #10075	3985.00	9
368	76	IN	37	2026-04-09 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20076	38.00	1
369	77	IN	48	2026-04-07 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20077	91.00	9
370	78	OUT	59	2026-04-06 06:00:57.34311+00	Satış çıkışı - Sipariş #10078	144.00	1
371	79	IN	70	2026-04-04 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20079	197.00	9
372	80	IN	81	2026-04-03 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20080	250.00	1
373	81	OUT	92	2026-04-01 15:00:57.34311+00	Satış çıkışı - Sipariş #10081	303.00	9
374	82	IN	103	2026-03-31 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20082	356.00	1
375	83	IN	114	2026-03-29 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20083	409.00	9
376	84	OUT	125	2026-03-28 00:00:57.34311+00	Satış çıkışı - Sipariş #10084	462.00	1
377	85	IN	136	2026-03-26 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20085	515.00	9
378	86	IN	147	2026-03-24 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20086	568.00	1
379	87	OUT	158	2026-03-23 09:00:57.34311+00	Satış çıkışı - Sipariş #10087	621.00	9
380	88	IN	169	2026-03-21 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20088	674.00	1
381	89	IN	180	2026-03-20 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20089	727.00	9
382	90	OUT	191	2026-03-18 18:00:57.34311+00	Satış çıkışı - Sipariş #10090	780.00	1
383	91	IN	2	2026-03-17 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20091	833.00	9
384	92	IN	13	2026-03-15 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20092	886.00	1
385	93	OUT	24	2026-03-14 03:00:57.34311+00	Satış çıkışı - Sipariş #10093	939.00	9
386	94	IN	35	2026-03-12 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20094	992.00	1
387	95	IN	46	2026-03-11 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20095	1045.00	9
388	96	OUT	57	2026-03-09 12:00:57.34311+00	Satış çıkışı - Sipariş #10096	1098.00	1
389	97	IN	68	2026-03-07 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20097	1151.00	9
390	98	IN	79	2026-03-06 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20098	1204.00	1
391	99	OUT	90	2026-03-04 21:00:57.34311+00	Satış çıkışı - Sipariş #10099	1257.00	9
392	100	IN	101	2026-03-03 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20100	1310.00	1
393	101	IN	112	2026-03-01 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20101	1363.00	9
394	102	OUT	123	2026-02-28 06:00:57.34311+00	Satış çıkışı - Sipariş #10102	1416.00	1
395	103	IN	134	2026-02-26 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20103	1469.00	9
396	104	IN	145	2026-02-25 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20104	1522.00	1
397	105	OUT	156	2026-02-23 15:00:57.34311+00	Satış çıkışı - Sipariş #10105	1575.00	9
398	106	IN	167	2026-02-22 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20106	1628.00	1
399	107	IN	178	2026-02-20 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20107	1681.00	9
400	108	OUT	189	2026-02-19 00:00:57.34311+00	Satış çıkışı - Sipariş #10108	1734.00	1
401	109	IN	200	2026-02-17 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20109	1787.00	9
402	110	IN	11	2026-02-15 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20110	1840.00	1
403	111	OUT	22	2026-02-14 09:00:57.34311+00	Satış çıkışı - Sipariş #10111	1893.00	9
404	112	IN	33	2026-02-12 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20112	1946.00	1
405	113	IN	44	2026-02-11 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20113	1999.00	9
406	114	OUT	55	2026-02-09 18:00:57.34311+00	Satış çıkışı - Sipariş #10114	2052.00	1
407	115	IN	66	2026-02-08 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20115	2105.00	9
408	116	IN	77	2026-02-06 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20116	2158.00	1
409	117	OUT	88	2026-02-05 03:00:57.34311+00	Satış çıkışı - Sipariş #10117	2211.00	9
410	118	IN	99	2026-02-03 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20118	2264.00	1
411	119	IN	110	2026-02-02 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20119	2317.00	9
412	120	OUT	121	2026-01-31 12:00:57.34311+00	Satış çıkışı - Sipariş #10120	2370.00	1
413	121	IN	132	2026-01-29 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20121	2423.00	9
414	122	IN	143	2026-01-28 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20122	2476.00	1
415	123	OUT	154	2026-01-26 21:00:57.34311+00	Satış çıkışı - Sipariş #10123	2529.00	9
416	124	IN	165	2026-01-25 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20124	2582.00	1
417	125	IN	176	2026-01-23 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20125	2635.00	9
418	126	OUT	187	2026-01-22 06:00:57.34311+00	Satış çıkışı - Sipariş #10126	2688.00	1
419	127	IN	198	2026-01-20 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20127	2741.00	9
420	128	IN	9	2026-01-19 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20128	2794.00	1
421	129	OUT	20	2026-01-17 15:00:57.34311+00	Satış çıkışı - Sipariş #10129	2847.00	9
422	130	IN	31	2026-01-16 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20130	2900.00	1
423	131	IN	42	2026-01-14 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20131	2953.00	9
424	132	OUT	53	2026-01-13 00:00:57.34311+00	Satış çıkışı - Sipariş #10132	3006.00	1
425	133	IN	64	2026-01-11 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20133	3059.00	9
426	134	IN	75	2026-01-09 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20134	3112.00	1
427	135	OUT	86	2026-01-08 09:00:57.34311+00	Satış çıkışı - Sipariş #10135	3165.00	9
428	136	IN	97	2026-01-06 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20136	3218.00	1
429	137	IN	108	2026-01-05 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20137	3271.00	9
430	138	OUT	119	2026-01-03 18:00:57.34311+00	Satış çıkışı - Sipariş #10138	3324.00	1
431	139	IN	130	2026-01-02 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20139	3377.00	9
432	140	IN	141	2025-12-31 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20140	3430.00	1
433	141	OUT	152	2025-12-30 03:00:57.34311+00	Satış çıkışı - Sipariş #10141	3483.00	9
434	142	IN	163	2025-12-28 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20142	3536.00	1
435	143	IN	174	2025-12-27 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20143	3589.00	9
436	144	OUT	185	2025-12-25 12:00:57.34311+00	Satış çıkışı - Sipariş #10144	3642.00	1
437	145	IN	196	2025-12-23 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20145	3695.00	9
438	146	IN	7	2025-12-22 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20146	3748.00	1
439	147	OUT	18	2025-12-20 21:00:57.34311+00	Satış çıkışı - Sipariş #10147	3801.00	9
440	148	IN	29	2025-12-19 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20148	3854.00	1
441	149	IN	40	2025-12-17 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20149	3907.00	9
442	150	OUT	51	2025-12-16 06:00:57.34311+00	Satış çıkışı - Sipariş #10150	3960.00	1
443	151	IN	62	2025-12-14 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20151	13.00	9
444	152	IN	73	2025-12-13 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20152	66.00	1
445	153	OUT	84	2025-12-11 15:00:57.34311+00	Satış çıkışı - Sipariş #10153	119.00	9
446	154	IN	95	2025-12-10 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20154	172.00	1
447	155	IN	106	2025-12-08 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20155	225.00	9
448	156	OUT	117	2025-12-07 00:00:57.34311+00	Satış çıkışı - Sipariş #10156	278.00	1
449	157	IN	128	2025-12-05 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20157	331.00	9
450	158	IN	139	2025-12-03 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20158	384.00	1
451	159	OUT	150	2025-12-02 09:00:57.34311+00	Satış çıkışı - Sipariş #10159	437.00	9
452	160	IN	161	2025-11-30 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20160	490.00	1
453	161	IN	172	2025-11-29 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20161	543.00	9
454	162	OUT	183	2025-11-27 18:00:57.34311+00	Satış çıkışı - Sipariş #10162	596.00	1
455	163	IN	194	2025-11-26 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20163	649.00	9
456	164	IN	5	2025-11-24 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20164	702.00	1
457	165	OUT	16	2025-11-23 03:00:57.34311+00	Satış çıkışı - Sipariş #10165	755.00	9
458	166	IN	27	2025-11-21 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20166	808.00	1
459	167	IN	38	2025-11-20 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20167	861.00	9
460	168	OUT	49	2025-11-18 12:00:57.34311+00	Satış çıkışı - Sipariş #10168	914.00	1
461	169	IN	60	2025-11-16 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20169	967.00	9
462	170	IN	71	2025-11-15 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20170	1020.00	1
463	171	OUT	82	2025-11-13 21:00:57.34311+00	Satış çıkışı - Sipariş #10171	1073.00	9
464	172	IN	93	2025-11-12 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20172	1126.00	1
465	173	IN	104	2025-11-10 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20173	1179.00	9
466	174	OUT	115	2025-11-09 06:00:57.34311+00	Satış çıkışı - Sipariş #10174	1232.00	1
467	175	IN	126	2025-11-07 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20175	1285.00	9
468	176	IN	137	2025-11-06 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20176	1338.00	1
469	177	OUT	148	2025-11-04 15:00:57.34311+00	Satış çıkışı - Sipariş #10177	1391.00	9
470	178	IN	159	2025-11-03 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20178	1444.00	1
471	179	IN	170	2025-11-01 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20179	1497.00	9
472	180	OUT	181	2025-10-31 00:00:57.34311+00	Satış çıkışı - Sipariş #10180	1550.00	1
473	181	IN	192	2025-10-29 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20181	1603.00	9
474	182	IN	3	2025-10-27 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20182	1656.00	1
475	183	OUT	14	2025-10-26 09:00:57.34311+00	Satış çıkışı - Sipariş #10183	1709.00	9
476	184	IN	25	2025-10-24 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20184	1762.00	1
477	185	IN	36	2025-10-23 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20185	1815.00	9
478	186	OUT	47	2025-10-21 18:00:57.34311+00	Satış çıkışı - Sipariş #10186	1868.00	1
479	187	IN	58	2025-10-20 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20187	1921.00	9
480	188	IN	69	2025-10-18 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20188	1974.00	1
481	189	OUT	80	2025-10-17 03:00:57.34311+00	Satış çıkışı - Sipariş #10189	2027.00	9
482	190	IN	91	2025-10-15 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20190	2080.00	1
483	191	IN	102	2025-10-14 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20191	2133.00	9
484	192	OUT	113	2025-10-12 12:00:57.34311+00	Satış çıkışı - Sipariş #10192	2186.00	1
485	193	IN	124	2025-10-10 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20193	2239.00	9
486	194	IN	135	2025-10-09 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20194	2292.00	1
487	195	OUT	146	2025-10-07 21:00:57.34311+00	Satış çıkışı - Sipariş #10195	2345.00	9
488	196	IN	157	2025-10-06 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20196	2398.00	1
489	197	IN	168	2025-10-04 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20197	2451.00	9
490	198	OUT	179	2025-10-03 06:00:57.34311+00	Satış çıkışı - Sipariş #10198	2504.00	1
491	199	IN	190	2025-10-01 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20199	2557.00	9
492	200	IN	1	2025-09-30 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20200	2610.00	1
493	201	OUT	12	2025-09-28 15:00:57.34311+00	Satış çıkışı - Sipariş #10201	2663.00	9
494	202	IN	23	2025-09-27 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20202	2716.00	1
495	203	IN	34	2025-09-25 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20203	2769.00	9
496	204	OUT	45	2025-09-24 00:00:57.34311+00	Satış çıkışı - Sipariş #10204	2822.00	1
497	205	IN	56	2025-09-22 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20205	2875.00	9
498	206	IN	67	2025-09-20 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20206	2928.00	1
499	207	OUT	78	2025-09-19 09:00:57.34311+00	Satış çıkışı - Sipariş #10207	2981.00	9
500	208	IN	89	2025-09-17 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20208	3034.00	1
501	209	IN	100	2025-09-16 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20209	3087.00	9
502	210	OUT	111	2025-09-14 18:00:57.34311+00	Satış çıkışı - Sipariş #10210	3140.00	1
503	211	IN	122	2025-09-13 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20211	3193.00	9
504	212	IN	133	2025-09-11 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20212	3246.00	1
505	213	OUT	144	2025-09-10 03:00:57.34311+00	Satış çıkışı - Sipariş #10213	3299.00	9
506	214	IN	155	2025-09-08 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20214	3352.00	1
507	215	IN	166	2025-09-07 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20215	3405.00	9
508	216	OUT	177	2025-09-05 12:00:57.34311+00	Satış çıkışı - Sipariş #10216	3458.00	1
509	217	IN	188	2025-09-03 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20217	3511.00	9
510	218	IN	199	2025-09-02 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20218	3564.00	1
511	219	OUT	10	2025-08-31 21:00:57.34311+00	Satış çıkışı - Sipariş #10219	3617.00	9
512	220	IN	21	2025-08-30 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20220	3670.00	1
513	221	IN	32	2025-08-28 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20221	3723.00	9
514	222	OUT	43	2025-08-27 06:00:57.34311+00	Satış çıkışı - Sipariş #10222	3776.00	1
515	223	IN	54	2025-08-25 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20223	3829.00	9
516	224	IN	65	2025-08-24 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20224	3882.00	1
517	225	OUT	76	2025-08-22 15:00:57.34311+00	Satış çıkışı - Sipariş #10225	3935.00	9
518	226	IN	87	2025-08-21 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20226	3988.00	1
519	227	IN	98	2025-08-19 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20227	41.00	9
520	228	OUT	109	2025-08-18 00:00:57.34311+00	Satış çıkışı - Sipariş #10228	94.00	1
521	229	IN	120	2025-08-16 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20229	147.00	9
522	230	IN	131	2025-08-14 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20230	200.00	1
523	231	OUT	142	2025-08-13 09:00:57.34311+00	Satış çıkışı - Sipariş #10231	253.00	9
524	232	IN	153	2025-08-11 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20232	306.00	1
525	233	IN	164	2025-08-10 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20233	359.00	9
526	234	OUT	175	2025-08-08 18:00:57.34311+00	Satış çıkışı - Sipariş #10234	412.00	1
527	235	IN	186	2025-08-07 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20235	465.00	9
528	236	IN	197	2025-08-05 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20236	518.00	1
529	237	OUT	8	2025-08-04 03:00:57.34311+00	Satış çıkışı - Sipariş #10237	571.00	9
530	238	IN	19	2025-08-02 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20238	624.00	1
531	239	IN	30	2025-08-01 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20239	677.00	9
532	240	OUT	41	2025-07-30 12:00:57.34311+00	Satış çıkışı - Sipariş #10240	730.00	1
533	241	IN	52	2025-07-28 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20241	783.00	9
534	242	IN	63	2025-07-27 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20242	836.00	1
535	243	OUT	74	2025-07-25 21:00:57.34311+00	Satış çıkışı - Sipariş #10243	889.00	9
536	244	IN	85	2025-07-24 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20244	942.00	1
537	245	IN	96	2025-07-22 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20245	995.00	9
538	246	OUT	107	2025-07-21 06:00:57.34311+00	Satış çıkışı - Sipariş #10246	1048.00	1
539	247	IN	118	2025-07-19 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20247	1101.00	9
540	248	IN	129	2025-07-18 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20248	1154.00	1
541	249	OUT	140	2025-07-16 15:00:57.34311+00	Satış çıkışı - Sipariş #10249	1207.00	9
542	250	IN	151	2025-07-15 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20250	1260.00	1
543	251	IN	162	2025-07-13 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20251	1313.00	9
544	252	OUT	173	2025-07-12 00:00:57.34311+00	Satış çıkışı - Sipariş #10252	1366.00	1
545	253	IN	184	2025-07-10 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20253	1419.00	9
546	254	IN	195	2025-07-08 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20254	1472.00	1
547	255	OUT	6	2025-07-07 09:00:57.34311+00	Satış çıkışı - Sipariş #10255	1525.00	9
548	256	IN	17	2025-07-05 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20256	1578.00	1
549	257	IN	28	2025-07-04 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20257	1631.00	9
550	258	OUT	39	2025-07-02 18:00:57.34311+00	Satış çıkışı - Sipariş #10258	1684.00	1
551	259	IN	50	2025-07-01 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20259	1737.00	9
552	260	IN	61	2025-06-29 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20260	1790.00	1
553	261	OUT	72	2025-06-28 03:00:57.34311+00	Satış çıkışı - Sipariş #10261	1843.00	9
554	262	IN	83	2025-06-26 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20262	1896.00	1
555	263	IN	94	2025-06-25 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20263	1949.00	9
556	264	OUT	105	2025-06-23 12:00:57.34311+00	Satış çıkışı - Sipariş #10264	2002.00	1
557	265	IN	116	2025-06-21 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20265	2055.00	9
558	266	IN	127	2025-06-20 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20266	2108.00	1
559	267	OUT	138	2025-06-18 21:00:57.34311+00	Satış çıkışı - Sipariş #10267	2161.00	9
560	268	IN	149	2025-06-17 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20268	2214.00	1
561	269	IN	160	2025-06-15 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20269	2267.00	9
562	270	OUT	171	2025-06-14 06:00:57.34311+00	Satış çıkışı - Sipariş #10270	2320.00	1
563	271	IN	182	2025-06-12 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20271	2373.00	9
564	272	IN	193	2025-06-11 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20272	2426.00	1
565	273	OUT	4	2025-06-09 15:00:57.34311+00	Satış çıkışı - Sipariş #10273	2479.00	9
566	274	IN	15	2025-06-08 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20274	2532.00	1
567	275	IN	26	2025-06-06 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20275	2585.00	9
568	276	OUT	37	2025-06-05 00:00:57.34311+00	Satış çıkışı - Sipariş #10276	2638.00	1
569	277	IN	48	2025-06-03 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20277	2691.00	9
570	278	IN	59	2025-06-01 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20278	2744.00	1
571	279	OUT	70	2025-05-31 09:00:57.34311+00	Satış çıkışı - Sipariş #10279	2797.00	9
572	280	IN	81	2025-05-29 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20280	2850.00	1
573	281	IN	92	2025-05-28 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20281	2903.00	9
574	282	OUT	103	2025-05-26 18:00:57.34311+00	Satış çıkışı - Sipariş #10282	2956.00	1
575	283	IN	114	2025-05-25 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20283	3009.00	9
576	284	IN	125	2025-05-23 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20284	3062.00	1
577	285	OUT	136	2025-05-22 03:00:57.34311+00	Satış çıkışı - Sipariş #10285	3115.00	9
578	286	IN	147	2025-05-20 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20286	3168.00	1
579	287	IN	158	2025-05-19 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20287	3221.00	9
580	288	OUT	169	2025-05-17 12:00:57.34311+00	Satış çıkışı - Sipariş #10288	3274.00	1
581	289	IN	180	2025-05-15 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20289	3327.00	9
582	290	IN	191	2025-05-14 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20290	3380.00	1
583	291	OUT	2	2025-05-12 21:00:57.34311+00	Satış çıkışı - Sipariş #10291	3433.00	9
584	292	IN	13	2025-05-11 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20292	3486.00	1
585	293	IN	24	2025-05-09 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20293	3539.00	9
586	294	OUT	35	2025-05-08 06:00:57.34311+00	Satış çıkışı - Sipariş #10294	3592.00	1
587	295	IN	46	2025-05-06 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20295	3645.00	9
588	296	IN	57	2025-05-05 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20296	3698.00	1
589	297	OUT	68	2025-05-03 15:00:57.34311+00	Satış çıkışı - Sipariş #10297	3751.00	9
590	298	IN	79	2025-05-02 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20298	3804.00	1
591	299	IN	90	2025-04-30 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20299	3857.00	9
592	300	OUT	101	2025-04-29 00:00:57.34311+00	Satış çıkışı - Sipariş #10300	3910.00	1
593	301	IN	112	2025-04-27 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20301	3963.00	9
594	302	IN	123	2025-04-25 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20302	16.00	1
595	303	OUT	134	2025-04-24 09:00:57.34311+00	Satış çıkışı - Sipariş #10303	69.00	9
596	304	IN	145	2025-04-22 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20304	122.00	1
597	305	IN	156	2025-04-21 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20305	175.00	9
598	306	OUT	167	2025-04-19 18:00:57.34311+00	Satış çıkışı - Sipariş #10306	228.00	1
599	307	IN	178	2025-04-18 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20307	281.00	9
600	308	IN	189	2025-04-16 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20308	334.00	1
601	309	OUT	200	2025-04-15 03:00:57.34311+00	Satış çıkışı - Sipariş #10309	387.00	9
602	310	IN	11	2025-04-13 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20310	440.00	1
603	311	IN	22	2025-04-12 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20311	493.00	9
604	312	OUT	33	2025-04-10 12:00:57.34311+00	Satış çıkışı - Sipariş #10312	546.00	1
605	313	IN	44	2025-04-08 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20313	599.00	9
606	314	IN	55	2025-04-07 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20314	652.00	1
607	315	OUT	66	2025-04-05 21:00:57.34311+00	Satış çıkışı - Sipariş #10315	705.00	9
608	316	IN	77	2025-04-04 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20316	758.00	1
609	317	IN	88	2025-04-02 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20317	811.00	9
610	318	OUT	99	2025-04-01 06:00:57.34311+00	Satış çıkışı - Sipariş #10318	864.00	1
611	319	IN	110	2025-03-30 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20319	917.00	9
612	320	IN	121	2025-03-29 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20320	970.00	1
613	321	OUT	132	2025-03-27 15:00:57.34311+00	Satış çıkışı - Sipariş #10321	1023.00	9
614	322	IN	143	2025-03-26 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20322	1076.00	1
615	323	IN	154	2025-03-24 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20323	1129.00	9
616	324	OUT	165	2025-03-23 00:00:57.34311+00	Satış çıkışı - Sipariş #10324	1182.00	1
617	325	IN	176	2025-03-21 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20325	1235.00	9
618	326	IN	187	2025-03-19 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20326	1288.00	1
619	327	OUT	198	2025-03-18 09:00:57.34311+00	Satış çıkışı - Sipariş #10327	1341.00	9
620	328	IN	9	2025-03-16 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20328	1394.00	1
621	329	IN	20	2025-03-15 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20329	1447.00	9
622	330	OUT	31	2025-03-13 18:00:57.34311+00	Satış çıkışı - Sipariş #10330	1500.00	1
623	331	IN	42	2025-03-12 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20331	1553.00	9
624	332	IN	53	2025-03-10 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20332	1606.00	1
625	333	OUT	64	2025-03-09 03:00:57.34311+00	Satış çıkışı - Sipariş #10333	1659.00	9
626	334	IN	75	2025-03-07 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20334	1712.00	1
627	335	IN	86	2025-03-06 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20335	1765.00	9
628	336	OUT	97	2025-03-04 12:00:57.34311+00	Satış çıkışı - Sipariş #10336	1818.00	1
629	337	IN	108	2025-03-02 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20337	1871.00	9
630	338	IN	119	2025-03-01 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20338	1924.00	1
631	339	OUT	130	2025-02-27 21:00:57.34311+00	Satış çıkışı - Sipariş #10339	1977.00	9
632	340	IN	141	2025-02-26 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20340	2030.00	1
633	341	IN	152	2025-02-24 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20341	2083.00	9
634	342	OUT	163	2025-02-23 06:00:57.34311+00	Satış çıkışı - Sipariş #10342	2136.00	1
635	343	IN	174	2025-02-21 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20343	2189.00	9
636	344	IN	185	2025-02-20 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20344	2242.00	1
637	345	OUT	196	2025-02-18 15:00:57.34311+00	Satış çıkışı - Sipariş #10345	2295.00	9
638	346	IN	7	2025-02-17 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20346	2348.00	1
639	347	IN	18	2025-02-15 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20347	2401.00	9
640	348	OUT	29	2025-02-14 00:00:57.34311+00	Satış çıkışı - Sipariş #10348	2454.00	1
641	349	IN	40	2025-02-12 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20349	2507.00	9
642	350	IN	51	2025-02-10 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20350	2560.00	1
643	351	OUT	62	2025-02-09 09:00:57.34311+00	Satış çıkışı - Sipariş #10351	2613.00	9
644	352	IN	73	2025-02-07 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20352	2666.00	1
645	353	IN	84	2025-02-06 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20353	2719.00	9
646	354	OUT	95	2025-02-04 18:00:57.34311+00	Satış çıkışı - Sipariş #10354	2772.00	1
647	355	IN	106	2025-02-03 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20355	2825.00	9
648	356	IN	117	2025-02-01 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20356	2878.00	1
649	357	OUT	128	2025-01-31 03:00:57.34311+00	Satış çıkışı - Sipariş #10357	2931.00	9
650	358	IN	139	2025-01-29 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20358	2984.00	1
651	359	IN	150	2025-01-28 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20359	3037.00	9
652	360	OUT	161	2025-01-26 12:00:57.34311+00	Satış çıkışı - Sipariş #10360	3090.00	1
653	361	IN	172	2025-01-24 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20361	3143.00	9
654	362	IN	183	2025-01-23 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20362	3196.00	1
655	363	OUT	194	2025-01-21 21:00:57.34311+00	Satış çıkışı - Sipariş #10363	3249.00	9
656	364	IN	5	2025-01-20 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20364	3302.00	1
657	365	IN	16	2025-01-18 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20365	3355.00	9
658	366	OUT	27	2025-01-17 06:00:57.34311+00	Satış çıkışı - Sipariş #10366	3408.00	1
659	367	IN	38	2025-01-15 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20367	3461.00	9
660	368	IN	49	2025-01-14 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20368	3514.00	1
661	369	OUT	60	2025-01-12 15:00:57.34311+00	Satış çıkışı - Sipariş #10369	3567.00	9
662	370	IN	71	2025-01-11 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20370	3620.00	1
663	371	IN	82	2025-01-09 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20371	3673.00	9
664	372	OUT	93	2025-01-08 00:00:57.34311+00	Satış çıkışı - Sipariş #10372	3726.00	1
665	373	IN	104	2025-01-06 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20373	3779.00	9
666	374	IN	115	2025-01-04 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20374	3832.00	1
667	375	OUT	126	2025-01-03 09:00:57.34311+00	Satış çıkışı - Sipariş #10375	3885.00	9
668	376	IN	137	2025-01-01 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20376	3938.00	1
669	377	IN	148	2024-12-31 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20377	3991.00	9
670	378	OUT	159	2024-12-29 18:00:57.34311+00	Satış çıkışı - Sipariş #10378	44.00	1
671	379	IN	170	2024-12-28 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20379	97.00	9
672	380	IN	181	2024-12-26 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20380	150.00	1
673	381	OUT	192	2024-12-25 03:00:57.34311+00	Satış çıkışı - Sipariş #10381	203.00	9
674	382	IN	3	2024-12-23 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20382	256.00	1
675	383	IN	14	2024-12-22 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20383	309.00	9
676	384	OUT	25	2024-12-20 12:00:57.34311+00	Satış çıkışı - Sipariş #10384	362.00	1
677	385	IN	36	2024-12-18 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20385	415.00	9
678	386	IN	47	2024-12-17 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20386	468.00	1
679	387	OUT	58	2024-12-15 21:00:57.34311+00	Satış çıkışı - Sipariş #10387	521.00	9
680	388	IN	69	2024-12-14 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20388	574.00	1
681	389	IN	80	2024-12-12 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20389	627.00	9
682	390	OUT	91	2024-12-11 06:00:57.34311+00	Satış çıkışı - Sipariş #10390	680.00	1
683	391	IN	102	2024-12-09 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20391	733.00	9
684	392	IN	113	2024-12-08 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20392	786.00	1
685	393	OUT	124	2024-12-06 15:00:57.34311+00	Satış çıkışı - Sipariş #10393	839.00	9
686	394	IN	135	2024-12-05 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20394	892.00	1
687	395	IN	146	2024-12-03 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20395	945.00	9
688	396	OUT	157	2024-12-02 00:00:57.34311+00	Satış çıkışı - Sipariş #10396	998.00	1
689	397	IN	168	2024-11-30 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20397	1051.00	9
690	398	IN	179	2024-11-28 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20398	1104.00	1
691	399	OUT	190	2024-11-27 09:00:57.34311+00	Satış çıkışı - Sipariş #10399	1157.00	9
692	400	IN	1	2024-11-25 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20400	1210.00	1
693	401	IN	12	2024-11-24 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20401	1263.00	9
694	402	OUT	23	2024-11-22 18:00:57.34311+00	Satış çıkışı - Sipariş #10402	1316.00	1
695	403	IN	34	2024-11-21 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20403	1369.00	9
696	404	IN	45	2024-11-19 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20404	1422.00	1
697	405	OUT	56	2024-11-18 03:00:57.34311+00	Satış çıkışı - Sipariş #10405	1475.00	9
698	406	IN	67	2024-11-16 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20406	1528.00	1
699	407	IN	78	2024-11-15 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20407	1581.00	9
700	408	OUT	89	2024-11-13 12:00:57.34311+00	Satış çıkışı - Sipariş #10408	1634.00	1
701	409	IN	100	2024-11-11 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20409	1687.00	9
702	410	IN	111	2024-11-10 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20410	1740.00	1
703	411	OUT	122	2024-11-08 21:00:57.34311+00	Satış çıkışı - Sipariş #10411	1793.00	9
704	412	IN	133	2024-11-07 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20412	1846.00	1
705	413	IN	144	2024-11-05 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20413	1899.00	9
706	414	OUT	155	2024-11-04 06:00:57.34311+00	Satış çıkışı - Sipariş #10414	1952.00	1
707	415	IN	166	2024-11-02 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20415	2005.00	9
708	416	IN	177	2024-11-01 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20416	2058.00	1
709	417	OUT	188	2024-10-30 15:00:57.34311+00	Satış çıkışı - Sipariş #10417	2111.00	9
710	418	IN	199	2024-10-29 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20418	2164.00	1
711	419	IN	10	2024-10-27 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20419	2217.00	9
712	420	OUT	21	2024-10-26 00:00:57.34311+00	Satış çıkışı - Sipariş #10420	2270.00	1
713	421	IN	32	2024-10-24 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20421	2323.00	9
714	422	IN	43	2024-10-22 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20422	2376.00	1
715	423	OUT	54	2024-10-21 09:00:57.34311+00	Satış çıkışı - Sipariş #10423	2429.00	9
716	424	IN	65	2024-10-19 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20424	2482.00	1
717	425	IN	76	2024-10-18 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20425	2535.00	9
718	426	OUT	87	2024-10-16 18:00:57.34311+00	Satış çıkışı - Sipariş #10426	2588.00	1
719	427	IN	98	2024-10-15 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20427	2641.00	9
720	428	IN	109	2024-10-13 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20428	2694.00	1
721	429	OUT	120	2024-10-12 03:00:57.34311+00	Satış çıkışı - Sipariş #10429	2747.00	9
722	430	IN	131	2024-10-10 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20430	2800.00	1
723	431	IN	142	2024-10-09 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20431	2853.00	9
724	432	OUT	153	2024-10-07 12:00:57.34311+00	Satış çıkışı - Sipariş #10432	2906.00	1
725	433	IN	164	2024-10-05 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20433	2959.00	9
726	434	IN	175	2024-10-04 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20434	3012.00	1
727	435	OUT	186	2024-10-02 21:00:57.34311+00	Satış çıkışı - Sipariş #10435	3065.00	9
728	436	IN	197	2024-10-01 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20436	3118.00	1
729	437	IN	8	2024-09-29 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20437	3171.00	9
730	438	OUT	19	2024-09-28 06:00:57.34311+00	Satış çıkışı - Sipariş #10438	3224.00	1
731	439	IN	30	2024-09-26 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20439	3277.00	9
732	440	IN	41	2024-09-25 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20440	3330.00	1
733	441	OUT	52	2024-09-23 15:00:57.34311+00	Satış çıkışı - Sipariş #10441	3383.00	9
734	442	IN	63	2024-09-22 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20442	3436.00	1
735	443	IN	74	2024-09-20 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20443	3489.00	9
736	444	OUT	85	2024-09-19 00:00:57.34311+00	Satış çıkışı - Sipariş #10444	3542.00	1
737	445	IN	96	2024-09-17 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20445	3595.00	9
738	446	IN	107	2024-09-15 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20446	3648.00	1
739	447	OUT	118	2024-09-14 09:00:57.34311+00	Satış çıkışı - Sipariş #10447	3701.00	9
740	448	IN	129	2024-09-12 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20448	3754.00	1
741	449	IN	140	2024-09-11 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20449	3807.00	9
742	450	OUT	151	2024-09-09 18:00:57.34311+00	Satış çıkışı - Sipariş #10450	3860.00	1
743	451	IN	162	2024-09-08 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20451	3913.00	9
744	452	IN	173	2024-09-06 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20452	3966.00	1
745	453	OUT	184	2024-09-05 03:00:57.34311+00	Satış çıkışı - Sipariş #10453	19.00	9
746	454	IN	195	2024-09-03 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20454	72.00	1
747	455	IN	6	2024-09-02 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20455	125.00	9
748	456	OUT	17	2024-08-31 12:00:57.34311+00	Satış çıkışı - Sipariş #10456	178.00	1
749	457	IN	28	2024-08-29 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20457	231.00	9
750	458	IN	39	2024-08-28 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20458	284.00	1
751	459	OUT	50	2024-08-26 21:00:57.34311+00	Satış çıkışı - Sipariş #10459	337.00	9
752	460	IN	61	2024-08-25 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20460	390.00	1
753	461	IN	72	2024-08-23 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20461	443.00	9
754	462	OUT	83	2024-08-22 06:00:57.34311+00	Satış çıkışı - Sipariş #10462	496.00	1
755	463	IN	94	2024-08-20 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20463	549.00	9
756	464	IN	105	2024-08-19 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20464	602.00	1
757	465	OUT	116	2024-08-17 15:00:57.34311+00	Satış çıkışı - Sipariş #10465	655.00	9
758	466	IN	127	2024-08-16 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20466	708.00	1
759	467	IN	138	2024-08-14 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20467	761.00	9
760	468	OUT	149	2024-08-13 00:00:57.34311+00	Satış çıkışı - Sipariş #10468	814.00	1
761	469	IN	160	2024-08-11 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20469	867.00	9
762	470	IN	171	2024-08-09 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20470	920.00	1
763	471	OUT	182	2024-08-08 09:00:57.34311+00	Satış çıkışı - Sipariş #10471	973.00	9
764	472	IN	193	2024-08-06 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20472	1026.00	1
765	473	IN	4	2024-08-05 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20473	1079.00	9
766	474	OUT	15	2024-08-03 18:00:57.34311+00	Satış çıkışı - Sipariş #10474	1132.00	1
767	475	IN	26	2024-08-02 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20475	1185.00	9
768	476	IN	37	2024-07-31 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20476	1238.00	1
769	477	OUT	48	2024-07-30 03:00:57.34311+00	Satış çıkışı - Sipariş #10477	1291.00	9
770	478	IN	59	2024-07-28 14:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20478	1344.00	1
771	479	IN	70	2024-07-27 01:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20479	1397.00	9
772	480	OUT	81	2024-07-25 12:00:57.34311+00	Satış çıkışı - Sipariş #10480	1450.00	1
773	481	IN	92	2024-07-23 23:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20481	1503.00	9
774	482	IN	103	2024-07-22 10:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20482	1556.00	1
775	483	OUT	114	2024-07-20 21:00:57.34311+00	Satış çıkışı - Sipariş #10483	1609.00	9
776	484	IN	125	2024-07-19 08:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20484	1662.00	1
777	485	IN	136	2024-07-17 19:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20485	1715.00	9
778	486	OUT	147	2024-07-16 06:00:57.34311+00	Satış çıkışı - Sipariş #10486	1768.00	1
779	487	IN	158	2024-07-14 17:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20487	1821.00	9
780	488	IN	169	2024-07-13 04:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20488	1874.00	1
781	489	OUT	180	2024-07-11 15:00:57.34311+00	Satış çıkışı - Sipariş #10489	1927.00	9
782	490	IN	191	2024-07-10 02:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20490	1980.00	1
783	491	IN	2	2024-07-08 13:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20491	2033.00	9
784	492	OUT	13	2024-07-07 00:00:57.34311+00	Satış çıkışı - Sipariş #10492	2086.00	1
785	493	IN	24	2024-07-05 11:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20493	2139.00	9
786	494	IN	35	2024-07-03 22:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20494	2192.00	1
787	495	OUT	46	2024-07-02 09:00:57.34311+00	Satış çıkışı - Sipariş #10495	2245.00	9
788	496	IN	57	2024-06-30 20:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20496	2298.00	1
789	497	IN	68	2024-06-29 07:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20497	2351.00	9
790	498	OUT	79	2024-06-27 18:00:57.34311+00	Satış çıkışı - Sipariş #10498	2404.00	1
791	499	IN	90	2024-06-26 05:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20499	2457.00	9
792	500	IN	101	2024-06-24 16:00:57.34311+00	Tedarikçiden stok girişi - İrsaliye #20500	2510.00	1
794	33	IN	1	2026-08-05 12:23:33.458305+00	aaf	0	9
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
20260723133806_AddUniqueIndexToUserEmail	10.0.9
20260723143227_AddXminConcurrencyTokenToProduct	10.0.9
20260729081426_AddBrandAndModelTables	10.0.9
20260730072727_AuditLog	10.0.9
20260731060940_AddSkuCodeToProduct	10.0.9
20260731070023_AddCategoryToBrand	10.0.9
20260806124428_EquipmentAdd	10.0.9
20260807084822_EquipmentRedesign	10.0.9
\.


--
-- Name: AuditLogs_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AuditLogs_Id_seq"', 178, true);


--
-- Name: Brands_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Brands_Id_seq"', 110, true);


--
-- Name: Categories_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Categories_Id_seq"', 27, true);


--
-- Name: EquipmentTransactions_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EquipmentTransactions_Id_seq"', 1009, false);


--
-- Name: Equipments_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Equipments_Id_seq"', 1006, false);


--
-- Name: Models_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Models_Id_seq"', 326, true);


--
-- Name: Products_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Products_Id_seq"', 599, true);


--
-- Name: RefreshTokens_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."RefreshTokens_Id_seq"', 233, true);


--
-- Name: StockMovements_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."StockMovements_Id_seq"', 795, true);


--
-- Name: Suppliers_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Suppliers_Id_seq"', 55, true);


--
-- Name: Users_UserId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Users_UserId_seq"', 9, true);


--
-- Name: WarehouseLocations_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WarehouseLocations_Id_seq"', 81, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 0O8fAmw3d0ovOsMNV5XWfCFPvi9iKXiKMf5FySQ8vsCNENDz56xRilc18qmDaNZ

