DELIMITER $$
create trigger trg_quebrar_constraint_deletar_filme_delete
before delete on tbl_filme
for each row
begin
	delete from tbl_filme_genero where filme_id = old.id;
end $$

DELIMITER ;


DELIMITER $$
create trigger trg_atualizar_filme_genero_update
before update on tbl_filme
for each row
begin
	delete from tbl_filme_genero where filme_id = old.id;
end $$

DELIMITER ;




DELIMITER $$

create trigger trg_quebrar_constraint_deletar_ator_delete
before delete on tbl_ator
for each row
begin
    delete from tbl_filme_ator 
    where ator_id = old.ator_id;
end $$

DELIMITER ;

DELIMITER $$

create trigger trg_atualizar_ator_filme_update
before update on tbl_ator
for each row
begin
    delete from tbl_filme_ator 
    where ator_id = old.ator_id;
end $$

DELIMITER ;


DELIMITER $$

create trigger trg_quebrar_constraint_deletar_diretor_delete
before delete on tbl_diretor
for each row
begin
    delete from tbl_filme_diretor
    where diretor_id = old.diretor_id;
end $$

DELIMITER ;


DELIMITER $$

create trigger trg_atualizar_diretor_filme_update
before update on tbl_diretor
for each row
begin
    delete from tbl_filme_diretor
    where diretor_id = old.diretor_id;
end $$

DELIMITER ;

