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
    Id_Cargo int,
    Matricula INT,
    Codigo_Escuelas int,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Id_Cargo) REFERENCES cargo (Id_Cargo)
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
    Codigo_Escuelas int,
    FOREIGN KEY (id_Tipo) REFERENCES tipo_sala(id),
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas)
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
    Fecha DATE,
    Estatus VARCHAR(200),
    Codigo_Escuelas INT,
    Matricula INT,
    Id_Curso INT,
    FOREIGN KEY (Codigo_Escuelas) REFERENCES escuelas(Codigo_Escuelas),
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula),
    FOREIGN KEY (Id_Curso) REFERENCES curso(ID_Curso)
)

create table solicitud_Add_User(
    Id_Soli_Add INT PRIMARY KEY AUTO_INCREMENT,
    Id_Solicitud INT,
    Matricula INT,
    FOREIGN KEY (Matricula) REFERENCES usuario(Matricula),
    FOREIGN KEY (Id_Solicitud) REFERENCES solicitud(Id_Solicitud)
)

create table eventos(
    Id_Eventos int AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR (300),
    Fecha_Ini VARCHAR (40),
    Fecha_Fin VARCHAR (40),
    Descripcion VARCHAR (1000),
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

--Niveles
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Estudiante', '107');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Profesores', '106');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Secretaria', '105');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Orientadores', '104');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Coordinador Modalidad General', '103');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Coordinador Tecnico', '102');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Coordinador General', '101');
INSERT INTO `cargo` (`Id_Cargo`, `Cargo`, `Nivel`) VALUES (NULL, 'Director', '100');

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

--Tipo_Sala--
INSERT INTO `tipo_sala` (`id`, `Nombre`) VALUES (NULL, 'Admisiones'), (NULL, 'Grupales');

--User--
INSERT INTO `usuario` (`Matricula`, `Foto`, `Pass`, `Nombre`, `Apellido`, `Correo`, `Fecha_Nacimiento`, `Codigo_Escuelas`) VALUES ('20211015', NULL, '$2a$10$BgCEZop1Wmqa/Il7RSIJ2Ousb6nVVf.3xcJ8PqOQgr.QUV8HJ2XDK', 'Bladimir', 'Cleto Diaz', 'cleto662@gmail.com', '2002102', '20051');
INSERT INTO `usuario` (`Matricula`, `Foto`, `Pass`, `Nombre`, `Apellido`, `Correo`, `Fecha_Nacimiento`, `Codigo_Escuelas`) VALUES ('20211016', NULL, '$2a$10$BgCEZop1Wmqa/Il7RSIJ2Ousb6nVVf.3xcJ8PqOQgr.QUV8HJ2XDK', 'Daniel', 'Perez Jerez', 'dpg@gmail.com', '2021-02-01', '20051');

--cargo seleccionar--
INSERT INTO `cargo_seleccionar` (`Id_Cargo_Seleccionar`, `Codigo_Escuelas`, `Id_Cargo`, `Matricula`) VALUES (NULL, '20051', '3', '20211015');
INSERT INTO `cargo_seleccionar` (`Id_Cargo_Seleccionar`, `Codigo_Escuelas`, `Id_Cargo`, `Matricula`) VALUES (NULL, '20051', '1', '20211016');

--sala--
INSERT INTO `sala` (`id_Sala`, `Nombre`, `Fecha`, `id_Tipo`, `Codigo_Escuelas`) VALUES (NULL, 'Admisiones', '2021-08-12', '1', '20051'); 
INSERT INTO `sala` (`id_Sala`, `Nombre`, `Fecha`, `id_Tipo`, `Codigo_Escuelas`) VALUES (NULL, 'Admisiones', '2021-08-12', '1', '20052'); 
INSERT INTO `sala` (`id_Sala`, `Nombre`, `Fecha`, `id_Tipo`, `Codigo_Escuelas`) VALUES (NULL, 'Admisiones', '2021-08-12', '1', '20051'); 


--sala usuario--
INSERT INTO `sala_usuario` (`Id`, `Id_Sala`, `Matricula`) VALUES (NULL, NULL, '20211015'); 
INSERT INTO `sala_usuario` (`Id`, `Id_Sala`, `Matricula`) VALUES (NULL, NULL, '20211016'); 

CREATE TRIGGER upd_check AFTER UPDATE ON solicitud
       FOR EACH ROW
       BEGIN
           IF NEW.Estatus = 'Aprobado' THEN
UPDATE usuario SET Codigo_Escuelas = NEW.Codigo_Escuelas WHERE Matricula = NEW.Matricula;
UPDATE curso_Escu SET Cupo = Cupo-1 WHERE ID_Curso = NEW.Id_Curso AND Codigo_Escuelas = NEW.Codigo_Escuelas;
UPDATE cargo_seleccionar SET Codigo_Escuelas = NEW.Codigo_Escuelas WHERE Matricula = NEW.Matricula;
INSERT INTO sala_usuario (Id_Sala, Matricula) VALUES ((SELECT id_Sala FROM sala WHERE Codigo_Escuelas = NEW.Codigo_Escuelas) , NEW.Matricula);
       END IF;
   END

CREATE TRIGGER insert_check AFTER INSERT ON escuelas
       FOR EACH ROW
       BEGIN

INSERT INTO `sala` (`id_Sala`, `Nombre`, `Fecha`, `id_Tipo`, `Codigo_Escuelas`) VALUES (NULL, 'Admisiones', '2021-08-08', '1', NEW.Codigo_Escuelas);

   END

CREATE TRIGGER insert_Agrega_Quien_Agrego AFTER INSERT ON solicitud_Add_User
       FOR EACH ROW
       BEGIN

    INSERT INTO sala_usuario (Id_Sala, Matricula) SELECT Id_Sala, NEW.Matricula FROM sala_usuario ORDER BY Id_Sala DESC LIMIT 1 ;

   END

DROP TRIGGER upd_check
DROP TRIGGER insert_check
DROP TRIGGER insert_Agrega_Quien_Agrego