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
             shop_category varchar2(100) not null, -- 상품 카테고리
             shop_review varchar2(100) -- 상품 리뷰수
);

insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('T001', '두쫀쿠티셔츠', 26000, '두쫀쿠 그거 어떻게 멈추는데', 'T-shirt', '79');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('T002', '옥수수티셔츠', 26000, '옥수수 밑으로 조용해', 'T-shirt', '77');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('T003', '감자티셔츠', 26000, '뭐래, 감자가 일등이죠', 'T-shirt', '81');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('MT001', '베이킹마스킹테이프', 3200, '뚝딱뚝딱 베이킹 마스킹테이프', 'masking tape', '53');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('MT002', '두쫀쿠마스킹테이프', 3200, '두쫀쿠 마스킹테이프', 'masking tape', '85');
insert into shop(shop_no, shop_name, shop_price, shop_description, shop_category, shop_review)
values('K001', '군고구마햄식이키링', 8000, '군고구마 옴냠냠 햄식이', 'keyring', '21');

update shop set shop_category = '티셔츠' where shop_name = '두쫀쿠티셔츠';
update shop set shop_category = '티셔츠' where shop_name = '옥수수티셔츠';
update shop set shop_category = '티셔츠' where shop_name = '감자티셔츠';
update shop set shop_category = '마스킹테이프' where shop_name = '베이킹마스킹테이프';
update shop set shop_category = '마스킹테이프' where shop_name = '두쫀쿠마스킹테이프';
update shop set shop_category = '키링' where shop_name = '군고구마햄식이키링';

CREATE SEQUENCE shop_seq
START WITH 100
INCREMENT BY 1
NOCACHE;

select *
from shop;


create table shop_category(category_name varchar2(100) primary key);

insert into shop_category values ('티셔츠');
insert into shop_category values ('마스킹테이프');
insert into shop_category values ('키링');


select *
from shop_category;