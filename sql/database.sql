create table usuario (
    Matricula int PRIMARY KEY,
    Foto VARCHAR (200),
    Pass VARCHAR (200),
    Nombre VARCHAR (200),
    Apellido VARCHAR (200),
    Correo VARCHAR (200),
    Fecha_Nacimiento VARCHAR (300),
    Codigo_Escuelas INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas)
)

create table escuelas(
    Codigo_Escuelas INT AUTO_INCREMENT PRIMARY KEY,
    Foto VARCHAR (300),
    Nombre VARCHAR (200),
    Descripcion VARCHAR(1000),
    latitude DECIMAL (19,4),
    longitude DECIMAL (19,4),
    Tanda VARCHAR (200),
    Modalidad VARCHAR (200)
)

create table curso(
    ID_Curso int PRIMARY KEY AUTO_INCREMENT,
    Grado VARCHAR (200)
)

create table curso_Escu (
    ID_Curso_Escu int PRIMARY KEY AUTO_INCREMENT,
    Tanda VARCHAR (200),
    Cupo INT,
    ID_Curso INT,
    Codigo_Escuelas INT,
    Matricula INT,
    FOREIGN KEY (ID_Curso) REFERENCES curso(ID_Curso),
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula)
)

create table cargo(
    Id_Cargo int AUTO_INCREMENT PRIMARY KEY,
    Cargo VARCHAR (200),
    Nivel INT
)


create table cargo_seleccionar(
    Id_Cargo_Seleccionar INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Escuelas int,
    Id_Cargo int,
    Matricula INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Id_Cargo) REFERENCES cargo (Id_Cargo),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula)
)

--Chats--
create table tipo_sala(
    id int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30)
)


create table sala(
    id_Sala int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR (30),
    Fecha DATE,
    id_Tipo int,
    FOREIGN KEY (id_Tipo) REFERENCES tipo_sala(id)
)

create table sala_usuario(
    Id int AUTO_INCREMENT PRIMARY KEY,
    Id_Sala INT,
    Matricula INT,
    FOREIGN KEY (Id_Sala) REFERENCES sala(id_Sala),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula)
)


create table mensaje (
    id int AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR (1638),
    id_Sala INT,
    Matricula INT,
    fecha DATE,
    FOREIGN KEY (Id_Sala) REFERENCES sala(id_Sala),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula)
)

--Secundarias
create table solicitud(
    Id_Solicitud INT PRIMARY KEY AUTO_INCREMENT,
    Fecha VARCHAR(200),
    Estatus VARCHAR(200),
    Codigo_Escuelas INT,
    Matricula INT,
    Id_Curso INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula),
    FOREIGN KEY (Id_Curso) REFERENCES curso(ID_Curso)
)

create table eventos(
    Id_Eventos int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR (300),
    Fecha_Ini DATE,
    Fecha_Fin DATE,
    Codigo_Escuelas INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas)
)

--Documentos
create table documentos(
    Id_documentos INT  AUTO_INCREMENT  PRIMARY KEY,
    Nombre VARCHAR (300),
    UrlDocs VARCHAR (300),
    Estado VARCHAR (30),
    Codigo_Escuelas INT,
    Matricula INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula)
)

drop table escuelas
drop table sala
drop table sala_usuario
drop table tipo_sala
drop table usuario
drop table cargo
drop table curso
DROP table curso_Escu
drop table mensaje
drop table solicitud
DROP table cargo_seleccionar
drop table eventos
drop table documentos

--Escuelas---
insert into escuelas (Codigo_Escuelas, Nombre, Descripcion, latitude, longitude,Tanda ,Modalidad) values ('20051', 'Politecnico Max Henriquez Ureña', 'Desde el año 2000 estamos dando nuestro mejor servicio para ustedes en las modalidades de Logistica, Refrigeracion, Contabilidad, Informatica, Electricidad y Electronica', 123213412.3213214213 , 123123214.213123213, 'Extendida','Tecnica' );
insert into escuelas (Codigo_Escuelas, Nombre, Descripcion, latitude, longitude,Tanda ,Modalidad) values ('20052', 'Liceo Juan Ramon Nuñez Castillo', 'Desde el año 2012 estamos dando nuestro mejor servicio para ustedes en los cursos de 1ro, 2do, 3ro, 4to, 5to, 6to ', 123213412.321 , 123123214.213, 'Extendida','General' );
insert into escuelas (Codigo_Escuelas, Nombre, Descripcion, latitude, longitude,Tanda ,Modalidad) values ('20053', 'Liceo Virgilio Casilla Minaya', 'Desde el año 2015 estamos dando nuestro mejor servicio para ustedes en las modalidades de Logistica Contabilidad, Informatica', 123213412.32131234213 , 123123214.215344323213, 'Extendida','Tecnica' );
insert into escuelas (Codigo_Escuelas, Nombre, Descripcion, latitude, longitude,Tanda ,Modalidad) values ('20054', 'Liceo federico henriquez y carvajal', 'Dirección: Calle Cnel. Rafael Fernández Domínguez, Santo Domingo, Impartimos Informatica, Marketing y Contabilidad', 123213412.3213214213 , 123123214.213123213, 'Extendida','Tecnica' );

--Curso--

insert into curso (Grado) values ('1ro');
insert into curso (Grado) values ('2ro');
insert into curso (Grado) values ('3ro');
insert into curso (Grado) values ('4to');
insert into curso (Grado) values ('5to');
insert into curso (Grado) values ('6to');

--Curso_Escu--
insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 1, 20051, 2021100 );

insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 2, 20051, 2021101 );

insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 3, 20051, 2021102 );

insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 4, 20051, 2021103 );

insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 5, 20051, 2021100 );

insert into curso_Escu (Tanda, Cupo, ID_Curso, Codigo_Escuelas, Matricula) values ('Extendido', 30, 6, 20051, 2021100 );


CREATE TRIGGER upd_check AFTER UPDATE ON solicitud
       FOR EACH ROW
       BEGIN
           IF NEW.Estatus = 'Aprobado' THEN
UPDATE usuario SET Codigo_Escuelas = NEW.Codigo_Escuelas WHERE Matricula = NEW.Matricula;
UPDATE curso_Escu SET Cupo = Cupo-1 WHERE ID_Curso = NEW.Id_Curso AND Codigo_Escuelas = NEW.Codigo_Escuelas;
           END IF;
       END


DROP Trigger before_employee_update
DROP TRIGGER upd_check