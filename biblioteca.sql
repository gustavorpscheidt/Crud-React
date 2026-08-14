create database biblioteca;
use biblioteca;

create table livro(
id_livro int(10) not null primary key auto_increment,
autor varchar(50),
editora varchar(50),
ano smallint,
quantidade int(3) not null

);
create table usuario(
id_usuario int(10) not null primary key auto_increment,
email varchar(50) not null unique,
senha varchar(50) not null
);
create table emprestimo(
id_emprestimo int(10) not null primary key auto_increment,
id_usuario int(10) not null,
id_livro int(10) not null,
data_emprestimo date not null,
data_devolucao date not null,

foreign key (id_usuario) references usuario(id_usuario),
foreign key (id_livro) references livro(id_livro)
);