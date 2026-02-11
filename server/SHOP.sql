create table shop_login( -- 로그인 정보
             shop_login_no number(30) primary key, -- 로그인 정보NO
             shop_login_id varchar2(100) not null, -- 아이디
             shop_login_pw varchar2(100) not null -- 비밀번호
             );
             
insert into shop_login(shop_login_no, shop_login_id, shop_login_pw)
values(001, 'admin', 'admin123'); -- 관리자
insert into shop_login(shop_login_no, shop_login_id, shop_login_pw)
values(002, 'user', 'user123'); -- 사용자

select *
from shop_login;


create table shop( -- 상품목록
             shop_no varchar2(30) primary key, -- 상품NO
             shop_name varchar2(100) not null, -- 상품명
             shop_price number(30) not null, -- 상품가격
             shop_description varchar2(300), -- 상품설명
             shop_category varchar2(100) not null -- 상품 카테고리
);

insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('T001', '두쫀쿠티셔츠', 26000, '두쫀쿠 그거 어떻게 멈추는데', 'T-shirt');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('T002', '옥수수티셔츠', 26000, '옥수수 밑으로 조용해', 'T-shirt');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('T003', '감자티셔츠', 26000, '뭐래, 감자가 일등이죠', 'T-shirt');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('MT001', '베이킹마스킹테이프', 3200, '뚝딱뚝딱 베이킹 마스킹테이프', 'masking tape');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('MT002', '두쫀쿠마스킹테이프', 3200, '두쫀쿠 마스킹테이프', 'masking tape');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category)
values('K001', '군고구마햄식이키링', 8000, '군고구마 옴냠냠 햄식이', 'keyring');

select *
from shop;

create table shop_add( -- 상품등록
             shop_add_no varchar2(30) primary key, -- 상품NO
             shop_add_name varchar2(100) not null, -- 상품명
             shop__add_price number(30) not null, -- 상품가격
             shop_add_description varchar2(300), -- 상품설명
             shop_add_category varchar2(100) not null -- 상품 카테고리
 );
 
 ALTER TABLE shop_add RENAME COLUMN shop__add_price to shop_add_price;
 
select *
from shop_add;