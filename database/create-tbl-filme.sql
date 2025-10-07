create table tbl_filme(
	id int primary key AUTO_INCREMENT,
    nome varchar(100) not null,
    sinopse text null,
    data_lancamento date null,
    duracao time not null,
    orcamento decimal not null,
    trailer varchar(200),
    capa varchar(200) not null
);

